export const Card = ({ children, className = "" }) => {
    return (
      <div className={`rounded-lg p-4 border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = "" }) => {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
  };
  
  export const CardTitle = ({ children, className = "" }) => {
    return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
  };
  
  export const CardDescription = ({ children, className = "" }) => {
    return <p className={`text-sm text-muted-gray-400 ${className}`}>{children}</p>;
  };
  
  export const CardContent = ({ children, className = "" }) => {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
  };
  
  export const CardFooter = ({ children, className = "" }) => {
    return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
  };
  
//   export const Card = { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };  