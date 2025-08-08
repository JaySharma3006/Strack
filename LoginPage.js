import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const Stack = createStackNavigator();
export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const data = {
      email,
      password,
    };
    const apiUrl = "https://strack.onrender.com"; // Replace with your actual API URL

    // Make a POST request to the backend
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle the successful response from the backend
        // You can navigate to the next screen or perform other actions here
        console.log("Login successful");
        navigation.navigate("Tabs"); // Navigate to the next screen
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error("Login error:", error);
        // You can display an error message to the user here
      });
  };
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.helloText}>Hello Again!</Text>

      <Text style={styles.signInText}>Sign in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.errorText}>{emailError}</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.errorText}>{passwordError}</Text>

      <Text style={styles.forgotPasswordText}>Forgot password?</Text>

      <LinearGradient
        colors={["#1378D5", "#68B4E8"]}
        style={styles.signInButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("Tabs")}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>or with</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialButtonContent}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleLogo}
          />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialButtonContent}>
          <Image
            source={require("../assets/twitter.png")}
            style={styles.twitterLogo}
          />
          <Text style={styles.socialButtonText}>Sign in with Twitter</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.createNewButton}>
        <Text style={styles.newAccountText}>Dont Have an account?</Text>

        <TouchableOpacity
          style={styles.createNowButton}
          onPress={() => navigation.navigate("SignUpPage")}
        >
          <Text style={styles.createNewButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  helloText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 32,
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "blue",
    fontFamily: "Poppins-Light",
    marginBottom: 10,
  },
  signInButton: {
    height: 42,
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  signInButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 10,
  },
  googleLogo: {
    height: 32,
    width: 32,
  },
  twitterLogo: {
    height: 32,
    width: 32,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#EEEEEE",
    borderWidth: 1,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#231D25",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontFamily: "Poppins-Light",
  },
  createNewButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newAccountText: {
    fontFamily: "Poppins-Light",
  },
  createNewButtonText: {
    fontFamily: "Poppins-Medium",
    color: "blue",
    fontSize: 16,
  },
});
