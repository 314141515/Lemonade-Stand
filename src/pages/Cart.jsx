import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, addToCart } from "../redux/cartSlice";
import { useState, useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [drinks, setDrinks] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon")
      .then((res) => res.json())
      .then((data) => setDrinks(data.drinks.slice(0, 6)));
  }, []);

  useEffect(() => {
    if (drinks.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % drinks.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [drinks]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center px-6 py-16 font-mono">
        <span className="text-8xl mb-4 fade-up" style={{ animationDelay: "0s" }}>🛒</span>
        <h1 className="font-serif text-5xl font-black text-[#1a1a1a] mb-2 fade-up" style={{ animationDelay: "0.1s" }}>
          Din kurv er tom
        </h1>
        <p className="text-[#888] text-sm tracking-widest uppercase mb-16 fade-up" style={{ animationDelay: "0.2s" }}>
          Tilføj nogle produkter
        </p>

        {/* Slideshow */}
        {drinks.length > 0 && (
          <div className="fade-up w-full max-w-sm" style={{ animationDelay: "0.3s" }}>
            <div className="bg-[#ffc800] border-2 border-[#1a1a1a] rounded-2xl p-6 shadow-[4px_4px_0px_#1a1a1a]">
              <p className="font-serif text-xl font-black mb-6 text-[#1a1a1a]">Måske du vil prøve?</p>
              <div className="bg-white border-2 border-[#1a1a1a] rounded-xl p-4 flex gap-4 items-center shadow-[2px_2px_0px_#1a1a1a] transition-all duration-500">
                <img
                  src={drinks[current].strDrinkThumb}
                  alt={drinks[current].strDrink}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col gap-3 flex-1">
                  <p className="font-bold text-base">{drinks[current].strDrink}</p>
                  <button
                    onClick={() => dispatch(addToCart(drinks[current]))}
                    className="bg-[#ffc800] border-2 border-[#1a1a1a] rounded-xl px-3 py-2 text-sm font-bold hover:bg-[#e8c000] transition-all shadow-[2px_2px_0px_#1a1a1a]"
                  >
                    Tilføj til kurv 🛒
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {drinks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full border border-[#1a1a1a] transition-all ${i === current ? "bg-[#1a1a1a]" : "bg-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <h1 className="font-serif text-5xl font-black text-[#1a1a1a] mb-8 fade-up" style={{ animationDelay: "0s" }}>
        Kurv
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {items.map((item, index) => (
          <div key={item.idDrink} className="fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-4 shadow-[4px_4px_0px_#1a1a1a] flex gap-4 items-center">
              <img src={item.strDrinkThumb} alt={item.strDrink} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex flex-col gap-2 flex-1">
                <p className="font-mono font-bold text-sm">{item.strDrink}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(updateQuantity({ idDrink: item.idDrink, quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1 }))}
                    className="bg-[#f0f0f0] border-2 border-[#1a1a1a] rounded-lg w-7 h-7 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ idDrink: item.idDrink, quantity: item.quantity + 1 }))}
                    className="bg-[#f0f0f0] border-2 border-[#1a1a1a] rounded-lg w-7 h-7 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.idDrink))}
                className="bg-[#cc2200] text-white border-2 border-[#1a1a1a] rounded-xl px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_#1a1a1a]"
              >
                Fjern
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;