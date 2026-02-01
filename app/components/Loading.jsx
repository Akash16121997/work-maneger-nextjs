const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm sm:text-base font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
