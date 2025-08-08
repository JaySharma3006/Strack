import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TimeScreen from "../screens/TimeScreen";
import MoneyScreen from "../screens/MoneyScreen";
import HomeScreen from "../screens/HomeScreen";
import LogsScreen from "../screens/LogsScreen";
import AddLogScreen from "../screens/AddLogScreen";
import ReportsScreen from "../screens/ReportsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeIcon from "../assets/icons/home.png";
import HomeIconFocused from "../assets/icons/home_focused.png";
import LogsIcon from "../assets/icons/logs.png";
import LogsIconFocused from "../assets/icons/logs_focused.png";
import AddLogIcon from "../assets/icons/addLog.png";
import AddLogFocused from "../assets/icons/addLog_focused.png";
import ReportsIcon from "../assets/icons/activity.png";
import ReportsIconFocused from "../assets/icons/activity_focused.png";
import ProfileIcon from "../assets/icons/profilecircle.png";
import ProfileIconFocused from "../assets/icons/profile_focused.png";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreens = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#EDEEEE",
          height: 40, // Adjust the height as needed
        },
      }}
    >
      <TopTab.Screen name="Time" component={TimeScreen} />
      <TopTab.Screen name="Money" component={MoneyScreen} />
    </TopTab.Navigator>
  );
};

const BottomTabScreens = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 15,
          bottom: 25,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: "#EDEEEE",
          borderRadius: 15,
          height: 100,
          shadowColor: "#7F5DF0",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? HomeIconFocused : HomeIcon;
          } else if (route.name === "Logs") {
            iconName = focused ? LogsIconFocused : LogsIcon;
          } else if (route.name === "AddLog") {
            iconName = focused ? AddLogFocused : AddLogIcon;
          } else if (route.name === "Reports") {
            iconName = focused ? ReportsIconFocused : ReportsIcon;
          } else if (route.name === "Profile") {
            iconName = focused ? ProfileIconFocused : ProfileIcon;
          }

          return (
            <Image
              source={iconName}
              style={{
                width: 50,
                height: 50,
              }}
            />
          );
        },
      })}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Logs" component={LogsScreen} />
      <BottomTab.Screen name="AddLog" component={AddLogScreen} />
      <BottomTab.Screen name="Reports" component={ReportsScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

const TabTester = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TopTabScreens} // Replace with your main screen component
        options={{
          header: () => (
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="Time" component={TimeScreen} />
      <Stack.Screen name="Money" component={MoneyScreen} />
      <Stack.Screen
        name="Raju" // You can name it something else if you need
        component={BottomTabScreens} // Render the BottomTabNavigator here
      />
    </Stack.Navigator>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "lightblue",
  },
  logo: {
    width: 40,
    height: 40,
  },
};

export default TabTester;
