import os
import time
import math
import ffmpeg
import torch
import numpy
from faster_whisper import WhisperModel
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip, ImageClip, VideoClip
from moviepy.video.tools.subtitles import SubtitlesClip
from moviepy.video.VideoClip import TextClip
from PIL import Image, ImageDraw, ImageFont
import http.server
import socketserver
import cgi
import os



from moviepy.config import change_settings
change_settings({"IMAGEMAGICK_BINARY": r"ImageMagick-7.1.1-Q16-HDRI\magick.exe"})


os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

def extract_audio(input_video, input_video_name):
    extracted_audio = f"audio-{input_video_name}.wav"
    try:
        stream = ffmpeg.input(input_video)
        stream = ffmpeg.output(stream, extracted_audio)
        ffmpeg.run(stream, overwrite_output=True)
        return extracted_audio
    except ffmpeg.Error as e:
        print(f"An error occurred during audio extraction: {str(e)}")
        return None

def transcribe(audio):
    try:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = WhisperModel("small", device=device)
        segments, info = model.transcribe(audio)
        language = info.language
        print(f"Transcription language: {language}")
        print(f"Using device: {device}")
        segments = list(segments)
        for segment in segments:
            print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
        return language, segments
    except Exception as e:
        print(f"An error occurred during transcription: {str(e)}")
        return None, None

def format_time(seconds):
    hours = math.floor(seconds / 3600)
    seconds %= 3600
    minutes = math.floor(seconds / 60)
    seconds %= 60
    milliseconds = round((seconds - math.floor(seconds)) * 1000)
    seconds = math.floor(seconds)
    formatted_time = f"{hours:02d}:{minutes:02d}:{seconds:01d},{milliseconds:03d}"
    return formatted_time

def generate_subtitle_file(language, segments):
    subtitle_file = f"sub-{input_video_name}.{language}.srt"
    text = ""
    for index, segment in enumerate(segments):
        segment_start = format_time(segment.start)
        segment_end = format_time(segment.end)
        text += f"{str(index+1)}\n"
        text += f"{segment_start} --> {segment_end}\n"
        text += f"{segment.text}\n"
        text += "\n"
    
    with open(subtitle_file, "w") as f:
        f.write(text)
    return subtitle_file

def create_text_clip(text, size, fontsize=24, color="white", bg_color="black"):
    font = ImageFont.truetype("arial.ttf", fontsize)
    img = Image.new("RGB", size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Use textbbox instead of textsize
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    text_width = right - left
    text_height = bottom - top
    
    text_position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)
    draw.text(text_position, text, font=font, fill=color)
    return ImageClip(numpy.array(img))

from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
import srt

def create_animated_subtitles(input_video_name,video_path, subtitle_file):
    video = VideoFileClip(video_path)
    
    # Read the subtitle file
    with open(subtitle_file, 'r', encoding='utf-8') as f:
        subtitle_generator = srt.parse(f)
        subtitles = list(subtitle_generator)
    
    # Create text clips for each subtitle
    text_clips = []
    for subtitle in subtitles:
        start_time = subtitle.start.total_seconds()
        end_time = subtitle.end.total_seconds()
        duration = end_time - start_time
        
        text_clip = (TextClip(subtitle.content, fontsize=24, font='Arial', color='white', bg_color='black',
                              size=(video.w, None), method='caption')
                     .set_position(('center', 'bottom'))
                     .set_start(start_time)
                     .set_duration(duration))
        
        text_clips.append(text_clip)
    
    # Combine the video with the subtitle clips
    final_video = CompositeVideoClip([video] + text_clips)
    
    # Write the output video
    output_path = f"output-{input_video_name}-animated.mp4"
    final_video.write_videofile(output_path, fps=video.fps, codec='libx264')
    
    return output_path

def modify_file(input_video):
    input_video = "input.mp4"
    input_video_name = input_video.replace(".mp4", "")

    extracted_audio = extract_audio(input_video, input_video_name)
    if extracted_audio:
        language, segments = transcribe(audio=extracted_audio)
        if language and segments:
            subtitle_file = generate_subtitle_file(
                language=language,
                segments=segments
            )
            animated_video = create_animated_subtitles(input_video_name,input_video, subtitle_file)
            print(f"Animated video created: {animated_video}")
            return subtitle_file, True
        else:
            print("Transcription failed.")
            return "", False
    else:
        print("Audio extraction failed. Cannot proceed.")
        return "", False


# Configuration for directories
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Parse the form data posted
        form = cgi.FieldStorage(fp=self.rfile, headers=self.headers,
                                environ={'REQUEST_METHOD': 'POST'})
        
        # Check if file is uploaded
        if 'file' not in form:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"No file part in the request")
            return
        
        # Retrieve the uploaded file
        file_item = form['file']
        
        if file_item.filename:
            # Secure filename
            filename = os.path.basename(file_item.filename)
            upload_path = os.path.join(UPLOAD_FOLDER, filename)
            
            # Save the file
            with open(upload_path, 'wb') as f:
                f.write(file_item.file.read())
            
            # Modify the file
            modified_path = modify_file(upload_path)  # Assuming this modifies the file in place
            
            # Return the modified file
            self.send_response(200)
            self.send_header('Content-type', 'application/octet-stream')
            self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
            self.end_headers()
            
            with open(modified_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"No file selected for uploading")

def run(server_class=http.server.HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting httpd on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    run()