import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-02-27"),
  },
  {
    id: "e2",
    description: "A pair of trouser",
    amount: 39.99,
    date: new Date("2021-12-22"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 9.99,
    date: new Date("2021-12-23"),
  },
  {
    id: "e4",
    description: "Shirts",
    amount: 29.99,
    date: new Date("2021-12-25"),
  },
  {
    id: "e5",
    description: "Kettle",
    amount: 19.99,
    date: new Date("2021-12-29"),
  },
];

export const ExpensesContext = createContext({
  expense: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { descroption, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // Generating unique id
      const id = new Date().toString() + Math.random().toString();
      return [...state, { ...action.payload, id: id }];
    case "UPDATE":
      const updateAbleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateAbleExpense = state[updateAbleExpenseIndex];
      const updatedExpense = { ...updateAbleExpense, ...action.payload.data };
      const updatedExpenses = [...state]
      updatedExpenses[updateAbleExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expense: expenseState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
