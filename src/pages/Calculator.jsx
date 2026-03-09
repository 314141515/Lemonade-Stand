import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sellLemonade, buyLemons, resetProfit } from "../redux/profitSlice";


const Calculator = () => {
  const profit = useSelector((state) => state.profit.value);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.profit.transactions);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    if (isPopping) {
      const timer = setTimeout(() => setIsPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isPopping]);

const handleSell = () => {
  dispatch(sellLemonade());
  setIsPopping(true);
};

const handleBuy = () => {
  dispatch(buyLemons());
  setIsPopping(true);
};

return (
    <div className="w-full flex flex-col items-center px-6 py-10 font-mono">

      
      <div className="text-center mb-8 fade-up" style={{ animationDelay: "0s" }}>
        <span className="text-8xl inline-block animate-float">🍋</span>
        <h1 className="font-serif text-5xl font-black text-[#1a1a1a] my-1 tracking-tight">
          Lemonade Stand
        </h1>
        <p className="text-[#888] text-xs tracking-widest uppercase">
          Din lille limonade-forretning
        </p>
      </div>

      
      <div className="fade-up bg-white border-[2.5px] border-[#1a1a1a] rounded-2xl px-12 py-8 text-center w-full max-w-sm shadow-[6px_6px_0px_#1a1a1a] mb-7" style={{ animationDelay: "0.15s" }}>
        <p className="text-xs tracking-[0.15em] text-[#999] mb-2 uppercase">
          Nuværende Profit
        </p>
        <p className={`font-serif text-7xl font-black leading-none mb-4 transition-colors duration-300 ${profit >= 0 ? "text-[#1a1a1a]" : "text-[#cc2200]"} ${isPopping ? "pop" : ""}`}>
          {profit >= 0 ? "+" : ""}${profit}
        </p>
        <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{
              width: `${Math.min(Math.abs(profit) * 2, 100)}%`,
              background: profit >= 0 ? "#ffc800" : "#cc2200",
              minWidth: "4px",
            }}
          />
        </div>
      </div>

      
      <div className="flex gap-4 w-full max-w-sm mb-6 flex-wrap fade-up" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={handleSell}
          className="btn-sell flex-1 min-w-[150px] flex flex-col items-center gap-1 py-5 px-4 bg-[#ffc800] border-[2.5px] border-[#1a1a1a] rounded-2xl cursor-pointer shadow-[4px_4px_0px_#1a1a1a] transition-all duration-150 font-mono"
        >
          <span className="text-2xl">🥤</span>
          <span className="text-xs font-medium tracking-wide">Sælg Lemonade</span>
          <span className="text-lg font-bold">+$5</span>
        </button>

        <button
          onClick={handleBuy}
          className="btn-buy flex-1 min-w-[150px] flex flex-col items-center gap-1 py-5 px-4 bg-[#22965a] border-[2.5px] border-[#1a1a1a] rounded-2xl cursor-pointer shadow-[4px_4px_0px_#1a1a1a] transition-all duration-150 font-mono text-white"
        >
          <span className="text-2xl">🍋</span>
          <span className="text-xs font-medium tracking-wide">Køb Citroner</span>
          <span className="text-lg font-bold">-$2</span>
        </button>

        <button
            onClick={() => dispatch(resetProfit())}
            className="w-full mt-2 py-3 border-2 border-[#1a1a1a] rounded-2xl font-mono font-bold text-sm tracking-wide hover:bg-[#f0f0f0] transition-all shadow-[4px_4px_0px_#1a1a1a]"
          >
            🔄 Reset Profit
        </button>
      </div>

      

      
      {transactions.length > 0 && (
        <div className="fade-up w-full max-w-sm bg-white border-2 border-[#e8e8e8] rounded-2xl p-5" style={{ animationDelay: "0.45s" }}>
          <p className="text-xs tracking-[0.12em] uppercase text-[#aaa] mb-3">
            Seneste transaktioner
          </p>
          {transactions.map((t) => (
            <div
              key={t.id}
              className="transaction-item flex justify-between items-center py-2 border-b border-[#f5f5f5] text-sm text-[#444]"
            >
              <span>{t.type === "sell" ? "🥤" : "🍋"} {t.text}</span>
              <span className={`font-semibold ${t.amount > 0 ? "text-[#22965a]" : "text-[#cc2200]"}`}>
                {t.amount > 0 ? "+" : ""}${t.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;