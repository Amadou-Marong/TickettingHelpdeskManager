import React from "react";

const badgeVariants = {
  default: "border-transparent bg-blue-500 text-white hover:bg-blue-400",
  secondary: "border-transparent bg-gray-500 text-white hover:bg-gray-400",
  destructive: "border-transparent bg-red-500 text-white hover:bg-red-400",
  outline: "border text-gray-700",
  success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
  warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80",
  info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/80"
};

function Badge({ className, variant = 'default', ...props }) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClass} ${className}`} {...props} />
  );
}

export { Badge };
