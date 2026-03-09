import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="w-full bg-[#ffc800] border-b-2 border-[#1a1a1a] px-6 py-4 font-mono font-bold">

      <div className="flex gap-6 items-center">
        <span className="text-xl">🍋</span>
        <div className="hidden md:flex gap-6 items-center flex-1">
          <Link to="/" className="text-[#1a1a1a] hover:underline">Home</Link>
          <Link to="/calculator" className="text-[#1a1a1a] hover:underline">Calculator</Link>
          <Link to="/shop" className="text-[#1a1a1a] hover:underline">Shop</Link>
          <Link to="/cart" className="text-[#1a1a1a] hover:underline">
            Kurv {cartCount > 0 && <span className="bg-[#1a1a1a] text-white rounded-full px-2 py-0.5 text-xs ml-1">{cartCount}</span>}
          </Link>
        </div>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-4 border-t-2 border-[#1a1a1a] mt-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-[#1a1a1a]">Home</Link>
          <Link to="/calculator" onClick={() => setMenuOpen(false)} className="text-[#1a1a1a]">Calculator</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="text-[#1a1a1a]">Shop</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-[#1a1a1a]">
            Kurv {cartCount > 0 && <span className="bg-[#1a1a1a] text-white rounded-full px-2 py-0.5 text-xs ml-1">{cartCount}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;