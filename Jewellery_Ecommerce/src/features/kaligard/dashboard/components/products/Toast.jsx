const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
      {message}
    </div>
  );
};

export default Toast;
