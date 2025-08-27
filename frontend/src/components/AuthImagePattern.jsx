
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-pink-100/30 to-blue-100/20 p-16 min-h-full w-full">
      <div className="max-w-lg text-center">
        <div className="grid grid-cols-4 gap-3 mb-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 3 === 0
                  ? "bg-primary/20 animate-pulse"
                  : i % 4 === 0
                  ? "bg-pink-400/20 animate-pulse-slow"
                  : "bg-base-200/80"
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary to-pink-400 text-transparent bg-clip-text">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg font-medium max-w-md mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
