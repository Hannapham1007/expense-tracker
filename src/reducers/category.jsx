import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = (key) => {
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : undefined;
};

const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error("Error saving to local storage", e);
  }
};

const CATEGORY_INCOME = "CATEGORY_INCOME";
const CATEGORY_EXPENSE = "CATEGORY_EXPENSE";

export const categorySlice = createSlice({
  name: "category",
  initialState: loadStateFromLocalStorage("category") || {
    categories: [
      { id: 0, name: "💰 Salary", type: CATEGORY_INCOME },
      { id: 1, name: "🥇 Bonus", type: CATEGORY_INCOME },
      { id: 2, name: "🚗 Transport", type: CATEGORY_EXPENSE },
      { id: 3, name: "🏠 Household", type: CATEGORY_EXPENSE },
      { id: 4, name: "🏋️‍♂️ Health", type: CATEGORY_EXPENSE },
      { id: 5, name: "🥗 Food", type: CATEGORY_EXPENSE },
    ],
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      saveStateToLocalStorage("category", state);
    },
    editCategory: (state, action) => {
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
        saveStateToLocalStorage("category", state);
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      saveStateToLocalStorage("category", state);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } =
  categorySlice.actions;

export const selectCategories = (state) => state.category.categories;

export default categorySlice.reducer;
