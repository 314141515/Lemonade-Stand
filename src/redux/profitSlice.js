import { createSlice } from "@reduxjs/toolkit";

const profitSlice = createSlice({
  name: "profit",
  initialState: { value: 0, transactions: [] },
  reducers: {
    sellLemonade: (state) => {
      state.value += 5;
      state.transactions.unshift({ id: Date.now(), type: "sell", text: "Solgte lemonade", amount: 5 });
      if (state.transactions.length > 5) state.transactions.pop();
    },
    buyLemons: (state) => {
      state.value -= 2;
      state.transactions.unshift({ id: Date.now(), type: "buy", text: "Købte citroner", amount: -2 });
      if (state.transactions.length > 5) state.transactions.pop();
    },
    resetProfit: (state) => {
      state.value = 0;
      state.transactions = [];
    },
  },
});

export const { sellLemonade, buyLemons, resetProfit } = profitSlice.actions;
export default profitSlice.reducer;