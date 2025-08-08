import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import TopBar from "../navigation/topBar";

const ChangePasswordScreen = ({ navigation }) => {
  const userId = "6549607e3eade31f6671afdf";
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      // Validate input fields
      if (!oldPassword || !newPassword) {
        Alert.alert("Error", "Please fill in all the fields.");
        return;
      }

      // Create a request object with old and new passwords
      const req = {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      // Make a POST request to change the password
      const response = await axios.put(
        "https://strack.onrender.com/api/user/resetPassword",
        req
      );

      console.log("Change password response:", response.data);

      if (response.data?.IsSuccess) {
        // Show a success message to the user
        Alert.alert("Success", "Password changed successfully!", [
          { text: "OK", onPress: goBackToProfile },
        ]);
      } else {
        // Handle the case where changing the password was not successful
        Alert.alert("Error", "Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Change password failed:", error);
      // Handle the error as needed
      Alert.alert("Error", "Failed to change password. Please try again.");
    }
  };

  const goBackToProfile = () => {
    // Navigate back to the ProfileScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <LinearGradient
        colors={["#1378D5", "#68B4E8"]}
        style={styles.backButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={goBackToProfile}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.header}>Change Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={(value) => setOldPassword(value)}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
          secureTextEntry={true}
        />
      </View>

      {/* <Button title="Change Password" onPress={handleChangePassword} /> */}
      <LinearGradient
        colors={["#1378D5", "#68B4E8"]}
        style={styles.signInButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.signInButtonText}>Change Password</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  signInButton: {
    height: 42,
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  signInButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#1378D5", // Background color for the circular button
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "Poppins-Light",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
  },
});

export default ChangePasswordScreen;
