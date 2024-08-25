import React from "react";
import { FaSpinner } from "react-icons/fa6";

export const VideoUploadSpinner = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-tiktok-light-gray opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <span className="text-tiktok-red font-bold animate-pulse">
          Uploading file and generating captions...
        </span>
        <FaSpinner className="text-[32px] text-tiktok-red animate-spin" />
      </div>
    </>
  );
};
