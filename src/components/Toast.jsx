const Toast = ({ message }) => {
  return (
    <div className="fixed bottom-6 right-6 bg-[#1a1a1a] text-white font-mono font-bold text-sm px-5 py-3 rounded-2xl border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#ffc800] fade-up z-50">
      {message}
    </div>
  );
};

export default Toast;