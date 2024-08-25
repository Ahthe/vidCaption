import time
import math
import ffmpeg

from faster_whisper import WhisperModel

input_video = "input.mp4"
input_video_name = input_video.replace(".mp4", "")