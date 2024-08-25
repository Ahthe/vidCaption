import { Button } from "@common/components";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

export const NavbarLinks = () => {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button
        title="Upload"
        variant="outline"
        className="!px-[18px]"
        onClick={() => router.push("/upload")}
      >
        <FaPlus />
        Upload
      </Button>
      <Button title="Discover VidCaption" onClick={() => router.push("/")}>
        VidCaption
      </Button>
    </div>
  );
};
