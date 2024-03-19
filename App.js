import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import CategoryTab from "./navigation/categoryTab";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
