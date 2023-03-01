import React from "react";
import { Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return (
    <ExpenseItem
      // we can write this way as the props and object property name is same.
      // under the hood it will assign the needed props value to the same naming property
      {...itemData.item}

      // description={itemData.item.description}
      // amount={itemData.item.amount}
      // date={itemData.item.data}
    />
  );
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
