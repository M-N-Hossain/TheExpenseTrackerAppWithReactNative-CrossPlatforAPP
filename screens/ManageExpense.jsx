import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

export default function ManageExpense({ route, navigation }) {
  const expenseContext = useContext(ExpensesContext);
  // through route props we can use passed data that send via navigation.navigate()
  const editedExpenseId = route.params?.expenseId;
  // (!!editedExpenseId) this way can make the value into boolean Value. true or false depend on the value
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    // goBack() comes with navigation
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenseContext.updateExpense(editedExpenseId, {
        description: "test!!!",
        amount: 19.99,
        date: new Date("2023-02-25"),
      });
    } else {
      expenseContext.addExpense({
        description: "test",
        amount: 19.99,
        date: new Date("2023-03-01"),
      });
    }
    // goBack() comes with navigation
    navigation.goBack();
  }
  function deleteExpenseHandler() {
    expenseContext.deleteExpense(editedExpenseId);
    // goBack() comes with navigation
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
