"use client";

import React, { useState } from "react";
import { VideoInput, VideoUploadSpinner } from "../components";
import { EditVidCaptionContainer } from "./EditVidCaptionContainer";

interface UploadVideoContainerProps {
  uploadedVideo: File | null;
  setUploadedVideo: React.Dispatch<React.SetStateAction<File | null>>;
  setGeneratedVideo: React.Dispatch<React.SetStateAction<Blob | null>>;
}

export const UploadVideoContainer = (props: UploadVideoContainerProps) => {
  const { uploadedVideo, setUploadedVideo, setGeneratedVideo } = props;

  const [generatedCaptions, setGeneratedCaptions] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start gap-8">
        <VideoInput
          setIsLoading={setIsLoading}
          uploadedVideo={uploadedVideo}
          setUploadedVideo={setUploadedVideo}
          setGeneratedCaptions={setGeneratedCaptions}
        />
        <EditVidCaptionContainer
          uploadedVideo={uploadedVideo}
          setGeneratedVideo={setGeneratedVideo}
          setIsLoading={setIsLoading}
          generatedCaptions={generatedCaptions}
          setGeneratedCaptions={setGeneratedCaptions}
        />
      </div>
      {isLoading && <VideoUploadSpinner />}
    </>
  );
};
