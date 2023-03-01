import React, { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecenExpenses() {
  const expenseContext = useContext(ExpensesContext);

  const recentExpense = expenseContext.expense.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 7 Days"
      fallbackText={"No expenses registered for the last 7 days"}
    />
  );
}
