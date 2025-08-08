import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import CategoryTab from "./navigation/categoryTab";
import LandingPage from './screens/LandingPage';
import * as Font from "expo-font";
import LoginPage from './screens/LoginPage'
import { createStackNavigator } from '@react-navigation/stack';
import SignUpPage from "./screens/SignUpPage";
import HomeScreen from "./screens/HomeScreen";
import AddLogScreen from "./screens/AddLogScreen";
import TabTester from "./screens/TabTester";
import { useState } from "react";
import { useEffect } from "react";
import ReportsScreen from "./screens/ReportsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LogsScreen from "./screens/LogsScreen";
import LogsCard from "./screens/LogsCard";
import PreferencesScreen from "./screens/PreferencesScreen";
import EditLogScreen from "./screens/EditLogScreen";
import AddLogMoneyScreen from "./screens/AddLogMoneyScreen";
import AccountDetails from "./screens/AccountDetails";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";





const Stack = createStackNavigator();



export default function App() {

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'), 
        'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'), 
        'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'), 
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'), 
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'), 
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'), 
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'), 
        'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'), 
      });
      setIsFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontLoaded) {
  
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown:false}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown:false}}/>
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AddLogScreen" component={AddLogScreen} options={{headerShown:false}}/>
        <Stack.Screen name="CategoryTab" component={CategoryTab} options={{headerShown:false}}/>
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown:false}}/>
        <Stack.Screen name="ReportsScreen" component={ReportsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LogsScreen" component={LogsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LogsCard" component={LogsCard} options={{headerShown:false}}/>
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} options={{headerShown:false}}/>
        <Stack.Screen name="EditLogScreen" component={EditLogScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AddLogMoneyScreen" component={AddLogMoneyScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AccountDetails" component={AccountDetails} options={{headerShown:false}}/>
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
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
