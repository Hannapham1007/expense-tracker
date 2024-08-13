import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

const loadStateFromLocalStorage = (key) => {
    const state = localStorage.getItem(key);
    return state ? JSON.parse(state) : [];
}

const saveStateToLocalStorage = (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (e) {
        console.error("Error saving to local storage", e);
    }
}

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses: loadStateFromLocalStorage("expense")
    },
    reducers: {
        addExpense: (state, action) => {
            const { amount, description, category, date } = action.payload;
            const newExpense = {
                id: uuidv4(), 
                amount,
                description,
                category,
                date: date || new Date().toISOString().split("T")[0] 
            }; 

            state.expenses = [newExpense, ...state.expenses];
            saveStateToLocalStorage("expense", state.expenses); 
        }
    }
});

export const { addExpense } = expenseSlice.actions;

// Selector to get expenses from the store
export const selectExpenses = (state) => state.expense.expenses;

export default expenseSlice.reducer;
