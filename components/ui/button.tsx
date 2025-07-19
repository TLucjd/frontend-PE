import * as React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "default";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClass = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    }[variant];

    const sizeClass = {
      sm: "px-3 py-1 text-sm",
      default: "px-4 py-2 text-sm",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
          variantClass,
          sizeClass,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
