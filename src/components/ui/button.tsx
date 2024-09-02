import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Updated buttonVariants with darker colors for better visibility
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#829E8C] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#829E8C] text-white shadow hover:bg-[#6B8F76]", // Darker green button with white text
        destructive: "bg-[#D6AFA5] text-white shadow-sm hover:bg-[#BF8F89]", // Darker pink button
        outline: "border border-[#829E8C] text-[#829E8C] bg-white shadow-sm hover:bg-[#A3C7AC] hover:text-[#6B8F76]", // White with green border
        secondary: "bg-[#A3C7AC] text-[#6B8F76] shadow-sm hover:bg-[#829E8C]", // Darker green with contrasting text
        ghost: "text-[#829E8C] hover:bg-[#A3C7AC] hover:text-[#6B8F76]", // Transparent button with hover effects
        link: "text-[#829E8C] underline-offset-4 hover:underline", // Link-style button
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
