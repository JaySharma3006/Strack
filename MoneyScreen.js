import React from "react";
import { View, Text, StyleSheet } from "react-native";

 const MoneyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Money Logs Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default MoneyScreen;
