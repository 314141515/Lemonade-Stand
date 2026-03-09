const Footer = () => {
  return (
    <footer className="w-full bg-[#ffc800] border-t-2 border-[#1a1a1a] px-6 py-8 font-mono mt-auto">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍋</span>
          <p className="font-serif font-black text-xl text-[#1a1a1a]">Lemonade Stand</p>
        </div>
        <p className="text-xs text-[#1a1a1a] tracking-widest uppercase">
          © 2026 All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;