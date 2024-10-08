// File: common/components/Button.tsx
import React from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "reset" | "submit";
  className?: string;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    type = "button",
    className,
    children,
    ...htmlButtonProps
  } = props;

  // Variant
  let variantStyle = "";
  switch (variant) {
    case "primary":
      variantStyle =
        "bg-vidcaption-primary text-white font-bold hover:bg-vidcaption-primaryHover";
      break;
    case "outline":
      variantStyle =
        "border border-matteBlackBorder font-bold text-matteBlackText hover:text-white hover:bg-vidcaption-primary hover:border-vidcaption-primary";
      break;
  }

  // Size
  let sizeStyle = "";
  switch (size) {
    case "lg":
      sizeStyle = "px-[32px] py-[6px] text-[18px]";
      break;
    case "md":
      sizeStyle = "px-[28px] py-[6px] text-[16px]";
      break;
    case "sm":
      sizeStyle = "px-[24px] py-[6px] text-[14px]";
      break;
  }

  return (
    <button
      type={type}
      className={`flex flex-row justify-center items-center gap-2 rounded ${variantStyle} ${sizeStyle} ${className}`}
      {...htmlButtonProps}
    >
      {children}
    </button>
  );
};
