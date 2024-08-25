import React from "react";
import { Hero, FeaturesSection } from "../components";

export const LandingPageContainer = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1500px]">
        <Hero />
        <FeaturesSection />
      </div>
    </div>
  );
};
