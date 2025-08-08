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

const Stack = createStackNavigator();

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSignUp = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");

    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <Text style={styles.signupText}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.errorText}>{nameError}</Text>

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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Text style={styles.errorText}>{confirmPasswordError}</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text style={styles.errorText}>{phoneNumberError}</Text>

        <LinearGradient
          colors={["#1378D5", "#68B4E8"]}
          style={styles.signupButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
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
              source={require("../assets/google.png")} // Replace with the path to your Google logo image
              style={styles.googleLogo}
            />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialButtonContent}>
            <Image
              source={require("../assets/twitter.png")} // Replace with the path to your Google logo image
              style={styles.googleLogo}
            />
            <Text style={styles.socialButtonText}>Sign in with Twitter</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.createNewButton}>
          <Text style={styles.newAccountText}>Have an account already?</Text>

          <TouchableOpacity
            style={styles.createNowButton}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.createNewButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  },
  signupText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Poppins-Bold",
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
  signupButton: {
    height: 42,
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  signupButtonText: {
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
  socialButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#231D25",
  },
  signinText: {
    color: "blue",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  googleLogo: {
    height: 32,
    width: 32,
  },
  twitterLogo: {
    height: 32,
    width: 32,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
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
