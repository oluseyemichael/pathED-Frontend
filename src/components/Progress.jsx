const Progress = ({ value = 0, className = "" }) => {
    return (
      <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };
  
  export default Progress;