import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../redux/cartSlice";
import Toast from "../components/Toast";

const Shop = () => {
  const dispatch = useDispatch();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data.drinks);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (drink) => {
  dispatch(addToCart(drink));
  setToast(true);
  setTimeout(() => setToast(false), 2000);
};

  const filtered = drinks.filter((drink) =>
    drink.strDrink.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center pt-20 font-mono">Henter drinks...</p>;

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <h1 className="font-serif text-5xl font-black text-[#1a1a1a] mb-8 fade-up" style={{ animationDelay: "0s" }}>Shop</h1>
      

      <div className="w-full max-w-4xl mb-8 fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Søg efter en drink..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-2 border-[#1a1a1a] rounded-2xl pl-10 pr-4 py-4 font-mono font-bold text-sm shadow-[4px_4px_0px_#1a1a1a] outline-none focus:shadow-[6px_6px_0px_#1a1a1a] transition-all"
          />
        </div>
      </div>


      {filtered.length === 0 && (
        <p className="font-mono text-[#888] text-sm mt-8">Ingen drinks fundet 🍋</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {filtered.map((drink, index) => (
          <div key={drink.idDrink} className="fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="shop-card bg-white border-2 border-[#1a1a1a] rounded-2xl p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4 items-center">
              <img src={drink.strDrinkThumb} alt={drink.strDrink} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <p className="font-mono font-bold text-base">{drink.strDrink}</p>
                <button
                  onClick={() => handleAddToCart(drink)}
                  className="w-full bg-[#ffc800] border-2 border-[#1a1a1a] rounded-lg px-2 py-2 text-sm font-bold hover:bg-[#e8c000] transition-all"
                >
                  Tilføj til kurv 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {toast && <Toast message="Tilføjet til kurv! 🛒" />}
    </div>
  );
};

export default Shop;