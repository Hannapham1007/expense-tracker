import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadStateFromLocalStorage = (key) => {
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : [];
};

const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error("Error saving to local storage", e);
  }
};

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: Array.isArray(loadStateFromLocalStorage("income")) ? loadStateFromLocalStorage("income") : [],
  },
  reducers: {
    addIncome: (state, action) => {
      const { amount, description, category, date } = action.payload;
      const newIncome = {
        id: uuidv4(),
        amount,
        description,
        category,
        date: date || new Date().toISOString().split("T")[0],
      };

      state.incomes = [newIncome, ...state.incomes];
      saveStateToLocalStorage("income", state.incomes);
    },

    updateIncome: (state, action) => {
      const index = state.incomes.findIndex(
        (inc) => inc.id === action.payload.id
      );
      if (index !== - 1) {
        state.incomes[index] = action.payload;
        saveStateToLocalStorage("income", state.incomes);
      }
    },

    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter(
        (inc) => inc.id !== action.payload
      );
      saveStateToLocalStorage("income", state);
    },
  },
});

export const { addIncome, deleteIncome, updateIncome } = incomeSlice.actions;

export const selectIncomes = (state) => state.income.incomes;

export default incomeSlice.reducer;
