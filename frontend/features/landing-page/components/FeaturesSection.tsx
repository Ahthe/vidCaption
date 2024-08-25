import { Button } from "@common/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FeaturesSection = () => {
  const features: SingleFeatureProps[] = [
    {
      img: {
        src: "/assets/speech-to-text-card.png",
        alt: "photo",
        left: true,
      },
      title: "Speech-to-Text 📑",
      descriptions: [
        "Speech-to-Text converts speech to text captions as Speech appears in the video.",
      ],
    },
    
  ];

  return (
    <div className="px-6 md:px-24 flex flex-col items-center mb-12">
      <FeaturesSectionHeader />

      <div className="flex flex-col gap-16">
        {features.map((feature) => (
          <SingleFeature
            key={feature.title}
            img={{
              src: feature.img.src,
              alt: feature.img.alt,
              left: feature.img.left,
            }}
            title={feature.title}
            descriptions={feature.descriptions}
          />
        ))}
      </div>
      <div className="max-w-[750px] mb-24 flex flex-col gap-2">
      </div>

      
    </div>
  );
};

const FeaturesSectionHeader = () => {
  return (
    <>
      <div className="font-bold text-[24px] text-vidcaption-red mb-2">
        VidCaption Accessibility Features
      </div>
      <div className="max-w-[750px] mb-24 flex flex-col gap-2">
      </div>
    </>
  );
};

interface SingleFeatureProps {
  img: {
    src: string;
    alt: string;
    left: boolean;
  };
  title: string;
  descriptions: string[];
}

const SingleFeature = (props: SingleFeatureProps) => {
  const { img, title, descriptions } = props;

  const FeatureImage = () => {
    return (
      <div className="relative h-[350px] w-full lg:w-1/2">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="rounded-2xl object-cover"
        />
      </div>
    );
  };

  const FeatureText = () => {
    return (
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="font-bold text-[32px]">{title}</div>
        <div className="flex flex-col gap-2">
          {descriptions.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* larger Screen */}
      <div className="hidden lg:flex flex-row items-center gap-12 w-full">
        {/* Left Image */}
        {img.left && <FeatureImage />}

        {/* Text */}
        <FeatureText />

        {/* Right Image */}
        {!img.left && <FeatureImage />}
      </div>

      {/* Smaller Screen */}
      <div className="lg:hidden flex flex-col items-center gap-6 w-full">
        {/* Image */}
        <FeatureImage />

        {/* Text */}
        <FeatureText />
      </div>
    </>
  );
};
