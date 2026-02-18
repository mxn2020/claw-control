import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

const variantStyles = {
  default: "bg-cyan-600 text-white hover:bg-cyan-500",
  outline: "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-700",
  ghost: "bg-transparent text-slate-200 hover:bg-slate-700",
  destructive: "bg-red-600 text-white hover:bg-red-500",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  default: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
