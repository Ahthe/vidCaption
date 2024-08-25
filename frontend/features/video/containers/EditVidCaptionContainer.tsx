import React, { useState } from "react";
import { VidCaptionFeatureCheckbox } from "../components";
import { Button } from "@common/components";
import { useRouter } from "next/navigation";
import customFetch from "@common/utils/customFetch";
import toast from "react-hot-toast";

interface EditVidCaptionContainerProps {
  uploadedVideo: File | null;
  setGeneratedVideo: React.Dispatch<React.SetStateAction<Blob | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  generatedCaptions: string;
  setGeneratedCaptions: React.Dispatch<React.SetStateAction<string>>;
}

export const EditVidCaptionContainer = (props: EditVidCaptionContainerProps) => {
  const {
    uploadedVideo,
    setGeneratedVideo,
    setIsLoading,
    generatedCaptions,
    setGeneratedCaptions,
  } = props;

  const router = useRouter();
  const fetch = customFetch();

  const [isSignToSpeechFeatureSelected, setIsSignToSpeechFeatureSelected] =
    useState(false);
  const [isSignToEmojiFeatureSelected, setIsSignToEmojiFeatureSelected] =
    useState(false);

  const handleOnConfirmVidCaptionGeneration = async () => {
    if (!uploadedVideo) return toast.error("Please upload a video!");

    setIsLoading(true);

    // Call the API to generate the edited video
    const features = {
      sign_to_speech: {
        selected: isSignToSpeechFeatureSelected,
      },
      sign_to_emoji: {
        selected: isSignToEmojiFeatureSelected,
      },
    };
    const formData = new FormData();
    formData.append("file", uploadedVideo);
    formData.append("captions", generatedCaptions);
    formData.append("features", JSON.stringify(features));

    try {
      const generatedVideoBlob = await fetch.generate_video(formData, "form");
      setGeneratedVideo(generatedVideoBlob);

      console.log("Video generated successfully:", generatedVideoBlob);
      toast.success("Video generated!");
    } catch (error) {
      console.error("Error generating video:", error);
      toast.error("Failed to generate video!");

      setGeneratedVideo(null);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {/* Captions */}
      <div className="flex flex-col gap-1">
        
      </div>
      <div className="flex gap-2 mt-6">
        <Button variant="outline" onClick={() => router.push("/")}>
          Discard
        </Button>
        <Button onClick={handleOnConfirmVidCaptionGeneration}>Confirm</Button>
      </div>
    </div>
  );
};
