import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;

  const combinedClassName = `
    peer h-4 w-4 shrink-0 rounded-sm border border-blue-600 
    ring-offset-white 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 
    disabled:cursor-not-allowed disabled:opacity-50 
    data-[state=checked]:bg-blue-600 data-[state=checked]:text-white
    ${className}
  `;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={combinedClassName}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
