"use client";

import { Button } from "@common/components";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useDownloader from "react-use-downloader";

interface GeneratedVideoContainerProps {
  originalVideo: File;
  generatedVideo: Blob;
}

export const GeneratedVideoContainer = (
  props: GeneratedVideoContainerProps
) => {
  const { originalVideo, generatedVideo } = props;

  const [originalVideoSource, setOriginalVideoSource] = useState("");
  const [generatedVideoSource, setGeneratedVideoSource] = useState("");
  const [generatedVideoObjectUrl, setGeneratedVideoObjectUrl] = useState("");

  useEffect(() => {
    const originalVideoObjectUrl = URL.createObjectURL(originalVideo);
    setOriginalVideoSource(originalVideoObjectUrl);

    const generatedVideoObjectUrl = URL.createObjectURL(generatedVideo);
    setGeneratedVideoSource(generatedVideoObjectUrl);
    setGeneratedVideoObjectUrl(generatedVideoObjectUrl);

    return () => {
      URL.revokeObjectURL(generatedVideoObjectUrl);
      URL.revokeObjectURL(generatedVideoObjectUrl);
    };
  }, [originalVideo, generatedVideo]);

  const { download, error } = useDownloader();
  const handleDownloadGeneratedVideo = () => {
    const fileExtension = originalVideo.type.split("/")[1];
    const fileName = `${originalVideo.name.split(".")[0]}-VidCaption.${fileExtension}`;
    download(generatedVideoObjectUrl, fileName);
  };

  useEffect(() => {
    if (error) toast.error("Failed to download video");
  }, [error]);

  return (
    <div className="flex flex-col gap-12">
      {/* Edited Video */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-[24px]">- Generated Video -</div>
        {generatedVideoSource && (
          <video
            className="VideoInput_video"
            width="100%"
            height={350}
            controls
            src={generatedVideoSource}
          />
        )}

        {/* Download Edited Video */}
        <Button variant="primary" onClick={handleDownloadGeneratedVideo}>
          Download Generated Video
        </Button>
      </div>

      {/* Original Video */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-[24px]">- Original Video -</div>
        {originalVideoSource && (
          <video
            className="VideoInput_video"
            width="100%"
            height={350}
            controls
            src={originalVideoSource}
          />
        )}
      </div>
    </div>
  );
};
