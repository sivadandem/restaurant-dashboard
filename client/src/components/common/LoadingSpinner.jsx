const LoadingSpinner = ({ size = "md", text = "Fetching Data" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-8"
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${spinnerSize} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
      />

      <h3 className="text-sm font-medium text-gray-600">{text}</h3>
    </div>
  );
};

export default LoadingSpinner;
