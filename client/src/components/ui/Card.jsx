export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-2xl p-4 border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-400 ${className}`} {...props}>{children}</p>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
};

export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>
  );
};

//   export const Card = { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
