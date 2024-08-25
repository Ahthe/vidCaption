import React from "react";
import { NavbarLinks, NavbarLogo } from "../components";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex flex-row items-center justify-between px-4 py-4 sm:px-6 sm:py-4 border-b border-b-tiktok-light-gray bg-white shadow-sm">
      <NavbarLogo />
      <NavbarLinks />
    </nav>
  );
};
