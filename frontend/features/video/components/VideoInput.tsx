// File: features/video/components/VideoInput.tsx
"use client";

import React, { useRef } from "react";
import customFetch from "@common/utils/customFetch";
import { FileUpload } from "@features/video/components/ui/file-upload";
import toast from "react-hot-toast";

interface VideoInputProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedVideo: File | null;
  setUploadedVideo: React.Dispatch<React.SetStateAction<File | null>>;
  setGeneratedCaptions: React.Dispatch<React.SetStateAction<string>>;
}

export const VideoInput = (props: VideoInputProps) => {
  const {
    setIsLoading,
    setUploadedVideo,
    setGeneratedCaptions,
  } = props;

  const fetch = customFetch();

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const selectedFile = files[0];
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch.post("/upload", formData, "form");
      setGeneratedCaptions(response.captions);
      setUploadedVideo(selectedFile);

      toast.success("Video uploaded successfully!");
    } catch (error: any) {
      toast.error("Failed to upload video!");
      setUploadedVideo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-max rounded-md transition border-2 border-gray-300 border-dashed hover:border-vidcaption-red focus:outline-none appearance-none cursor-pointer my-[10px] px-6 py-8">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};
