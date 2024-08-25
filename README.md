# vidCaption

[Click to watch Demo (Skip to 3:05 to see the animated captions on a generated video)](https://www.youtube.com/watch?v=1Ssr9EpWPkI)

## Pictures

![1](/frontend/public/assets/1.jpg)
![2](/frontend/public/assets/2.jpg)
![3](/frontend/public/assets/3.jpg)
![4](/frontend/public/assets/4.jpg)

## Architecture
![Architecture](/frontend/public/assets/Architecture.png)


## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## About

vidCaption is a powerful tool designed to automatically generate and embed subtitles into videos. It's perfect for content creators, educators, and anyone looking to make their videos more accessible and engaging.

### Features

- Automatically generates subtitles from spoken dialogue in videos
- Embeds subtitles directly into the video—no separate files needed!
- Supports mp4 video format
- Perfect for accessibility, language comprehension, or viewer engagement
- Quick and easy process: simply drop in your video and let the tool do the rest!

## Technologies Used

- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Python, Flask, FFmpeg, Faster Whisper, MoviePy, PyTorch, Pillow (PIL), SRT, NumPy, ImageMagick
- Build Tools: npm/Yarn, ESLint, Prettier

## Installation

For frontend:
```
npm i
npm run dev
```

For backend:
```
python -m venv myenv
.\myenv\Scripts\activate
pip install -r requirements.txt
```

## Usage

1. Install both frontend and backend components
2. Run the frontend development server
3. Upload your mp4 video to the backend server
4. The tool will automatically generate subtitles and embed them into the video
5. Download the processed video with embedded subtitles

## Contributing

We welcome contributions! To contribute, please fork the repository, make your changes, and submit a pull request.
