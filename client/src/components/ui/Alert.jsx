import * as React from "react";

const alertVariants = (variant) => {
  const baseClass =
    "relative w-full rounded-lg border border-gray-300 shadow-md p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground";
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive:
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  };
  return `${baseClass} ${variantClasses[variant] || variantClasses.default}`;
};

const Alert = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => (
  <div ref={ref} role="alert" className={`${alertVariants(variant)} ${className}`} {...props} />
));

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5 ref={ref} className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props} />
));

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />
));

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
