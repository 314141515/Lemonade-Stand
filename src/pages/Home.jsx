import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon")
      .then((res) => res.json())
      .then((data) => setDrinks(data.drinks.slice(0, 4)));
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-16 font-mono">

  {/* Hero */}
  <span className="text-8xl mb-6 fade-up" style={{ animationDelay: "0s" }}>🍋</span>
  <h1 className="font-serif text-6xl font-black text-[#1a1a1a] mb-3 tracking-tight text-center fade-up" style={{ animationDelay: "0.1s" }}>
    Lemonade Stand
  </h1>
  <p className="font-mono text-[#888] text-sm tracking-widest uppercase mb-16 fade-up" style={{ animationDelay: "0.2s" }}>
    Din lille limonade-forretning
  </p>

  {/* Nav knapper */}
<div className="flex gap-4 w-full max-w-4xl mb-20 flex-wrap">
  <Link to="/calculator" style={{ animationDelay: "0.3s" }} className="fade-up flex-1 min-w-[120px] bg-[#ffc800] border-2 border-[#1a1a1a] rounded-2xl px-6 py-5 shadow-[4px_4px_0px_#1a1a1a] font-bold text-center hover:bg-[#e8c000] transition-all card-hover">
    🧮 Calculator
  </Link>
  <Link to="/shop" style={{ animationDelay: "0.4s" }} className="fade-up flex-1 min-w-[120px] bg-white border-2 border-[#1a1a1a] rounded-2xl px-6 py-5 shadow-[4px_4px_0px_#1a1a1a] font-bold text-center hover:bg-[#f5f5f5] transition-all card-hover">
    🛒 Shop
  </Link>
  <Link to="/cart" style={{ animationDelay: "0.5s" }} className="fade-up flex-1 min-w-[120px] bg-[#22965a] text-white border-2 border-[#1a1a1a] rounded-2xl px-6 py-5 shadow-[4px_4px_0px_#1a1a1a] font-bold text-center hover:bg-[#2a8c5a] transition-all card-hover">
    🧺 Kurv
  </Link>
</div>

      {/* Separator */}
      <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#ccc] to-transparent mb-20" />

      {/* Shop Preview */}
      <div className="w-full max-w-4xl bg-[#ffc800] border-2 border-[#1a1a1a] rounded-2xl p-8 shadow-[4px_4px_0px_#1a1a1a]">
        <h2 className="font-serif text-3xl font-black text-[#1a1a1a] mb-8">Shop</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drinks.map((drink, index) => (
  <div key={drink.idDrink} className="fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
    <div className="drink-card bg-white border-2 border-[#1a1a1a] rounded-xl p-5 flex gap-3 items-center shadow-[2px_2px_0px_#1a1a1a]">
              <img src={drink.strDrinkThumb} alt={drink.strDrink} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <p className="font-bold text-base">{drink.strDrink}</p>
                <button
                  onClick={() => dispatch(addToCart(drink))}
                  className="w-full bg-[#ffc800] border-2 border-[#1a1a1a] rounded-lg px-2 py-1 text-sm font-bold hover:bg-[#e8c000] transition-all"
                >
                  Tilføj til kurv 🛒
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Link to="/shop" className="drink-card bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] rounded-xl px-5 py-2 text-sm font-bold hover:bg-[#333] transition-all">
            Mere →
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;