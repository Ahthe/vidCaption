import React from "react";

export const VidCaptionVideoContainerHeader = () => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="font-bold text-[24px]">
        Upload Video <span className="text-vidcaption-red">(VidCaption)</span>
      </div>
      <div className="text-vidcaption-gray">
        Create subttiles for your videos with VidCaptions&apos;s AI-powered caption generation.
      </div>
    </div>
  );

  // Old
  // return (
  //   <div className="max-w-[500px] text-center flex flex-col gap-2 mb-8">
  //     <div className="font-bold text-vidcaption-red text-[36px] md:text-[48px]">
  //       VidCaption
  //     </div>
  //     <div>
  //       Create subttiles for your videos with
  //       animations easily with&nbsp;
  //       <span className="text-vidcaption-red font-bold">
  //         VidCaption&apos;s AI-powered caption generation.
  //       </span>
  //     </div>
  //     <div>
  //       <div>1. Speech-to-Text 📑</div>
  //     </div>
  //   </div>
  // );
};
