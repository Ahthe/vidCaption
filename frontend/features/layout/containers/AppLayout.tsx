// File: features/layout/containers/AppLayout.tsx
"use client";

import { metrophobic } from "@common/styles/fonts";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  return (
    <body className={"flex flex-col bg-matteBlack text-matteBlackText " + metrophobic.className}>
      <Toaster />

      <Navbar />

      <main>{children}</main>
    </body>
  );
};
