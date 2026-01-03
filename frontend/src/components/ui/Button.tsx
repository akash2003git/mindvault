import type { LucideIcon } from "lucide-react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const variantClasses = {
    primary: "bg-black border-black text-white hover:bg-gray-900 hover:border-gray-900",
    secondary: "bg-white border-black text-black hover:bg-gray-100",
  }
  const sizeClasses = {
    sm: "text-sm font-semibold px-2 py-1 border-2",
    md: "text-md font-semibold px-3 py-1 border-2",
    lg: "text-lg font-semibold px-4 py-1 border-2"
  }
  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }
  const stateClasses = {
    default: "cursor-pointer shadow-xl active:shadow-none",
    loading: "cursor-wait opacity-60 shadow-none"
  };

  const StartIcon = props.startIcon;
  const EndIcon = props.endIcon;


  return (
    <button className={
      `flex items-center gap-1 rounded-xl ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${stateClasses[props.loading ? "loading" : "default"]}`
    } onClick={props.loading ? undefined : props.onClick} >
      {StartIcon && <StartIcon className={iconClasses[props.size]} />}
      {props.text}
      {EndIcon && <EndIcon className={iconClasses[props.size]} />}
    </button >
  )
}
