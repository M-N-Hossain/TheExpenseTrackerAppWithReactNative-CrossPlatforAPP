import React, { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
  const expenseContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expense}
      expensesPeriod="Total"
      fallbackText={"No registerd expense found"}
    />
  );
}
