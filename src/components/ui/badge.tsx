import { cn } from "#/lib/utils";

const variantStyles = {
  default: "bg-slate-700 text-slate-200",
  success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
  info: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  outline: "bg-transparent text-slate-300 border-slate-600",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
