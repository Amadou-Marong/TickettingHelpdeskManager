import React from 'react';

// Define the base styles and variant-specific styles
const baseStyles = 'flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2';
const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 text-gray-700 bg-transparent shadow-md hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100',
};

// Button component
const Button = ({ children, type = 'button', variant = 'primary', className = '', ...props }) => {
  const variantClass = variantStyles[variant] || variantStyles.primary;
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
