"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

interface VidCaptionFeatureCheckboxProps {
  label: string;
  selectedDescription?: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VidCaptionFeatureCheckbox = (props: VidCaptionFeatureCheckboxProps) => {
  const { label, selectedDescription, isSelected, setIsSelected } = props;

  return (
    <div className="flex flex-col">
      {/* Checkbox */}
      <div
        className="flex gap-2 items-center w-max cursor-pointer"
        onClick={() => setIsSelected((prev) => !prev)}
      >
        <div
          className={`flex justify-center items-center w-4 h-4 rounded-sm border border-vidcaption-red ${isSelected && "bg-vidcaption-red"}`}
        >
          {isSelected && <FaCheck className="text-white w-3 h-3" />}
        </div>
        <span>{label}</span>
      </div>

      {/* Description */}
      {selectedDescription && isSelected && (
        <div className="text-vidcaption-red text-[14px]">
          *{selectedDescription}
        </div>
      )}
    </div>
  );
};
