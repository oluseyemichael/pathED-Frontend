export const Card = ({ children, className = "", ...props }) => {
    return (
      <div 
        className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className = "" }) => {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  };