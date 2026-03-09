import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../redux/cartSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data.drinks);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center pt-20 font-mono">Henter drinks...</p>;

return (
    <div className="flex flex-col items-center px-6 py-10">
      <h1 className="font-serif text-5xl font-black text-[#1a1a1a] mb-8">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {drinks.map((drink, index) => (
          <div key={drink.idDrink} className="fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="shop-card bg-white border-2 border-[#1a1a1a] rounded-2xl p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4 items-center">
              <img src={drink.strDrinkThumb} alt={drink.strDrink} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <p className="font-mono font-bold text-base">{drink.strDrink}</p>
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
    </div>
  );
};

export default Shop;