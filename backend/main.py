import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

import time
import math
import ffmpeg
import torch  # Add this line

from faster_whisper import WhisperModel

input_video = "input.mp4"
input_video_name = input_video.replace(".mp4", "")

def extract_audio():
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
        # Use CUDA (GPU) if available, otherwise fall back to CPU
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = WhisperModel("small", device=device)
        segments, info = model.transcribe(audio)
        language = info.language
        print(f"Transcription language: {language}")
        print(f"Using device: {device}")
        segments = list(segments)
        for segment in segments:
            # print(segment)
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
        text += f"{str(index+1)} \n"
        text += f"{segment_start} --> {segment_end} \n"
        text += f"{segment.text} \n"
        text += "\n"
        
    f = open(subtitle_file, "w")
    f.write(text)
    f.close()

    return subtitle_file

def add_subtitle_to_video(soft_subtitle, subtitle_file,  subtitle_language):

    video_input_stream = ffmpeg.input(input_video)
    subtitle_input_stream = ffmpeg.input(subtitle_file)
    output_video = f"output-{input_video_name}.mp4"
    subtitle_track_title = subtitle_file.replace(".srt", "")

    if soft_subtitle:
        stream = ffmpeg.output(
            video_input_stream, subtitle_input_stream, output_video, **{"c": "copy", "c:s": "mov_text"},
            **{"metadata:s:s:0": f"language={subtitle_language}",
            "metadata:s:s:0": f"title={subtitle_track_title}"}
        )
        ffmpeg.run(stream, overwrite_output=True)

    else:
        stream = ffmpeg.output(video_input_stream, output_video, vf=f"subtitles={subtitle_file}")
        ffmpeg.run(stream, overwrite_output=True)

def run():
    extracted_audio = extract_audio()
    if extracted_audio:
        language, segments = transcribe(audio=extracted_audio)
        if language and segments:
            subtitle_file = generate_subtitle_file(
            language=language,
            segments=segments
            )
            add_subtitle_to_video(
                soft_subtitle=False,
                subtitle_file=subtitle_file,
                subtitle_language=language
            )
        else:
            print("Transcription failed.")
    else:
        print("Audio extraction failed. Cannot proceed.")

if __name__ == "__main__":

    run()