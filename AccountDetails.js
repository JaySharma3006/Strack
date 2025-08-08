import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Alert } from "react-native";
import TopBar from "../navigation/topBar";

const AccountDetails = ({ route, navigation }) => {
  const { onSave } = route.params || {};
  const userId = "6549607e3eade31f6671afdf";
  const [userDetails, setUserDetails] = useState(null);
  const [editedUserDetails, setEditedUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details from the server when the component mounts
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(
        `https://strack.onrender.com/api/user/?userId=${userId}`
      );
      if (response.data.IsSuccess) {
        console.log(response.data.Data);
        setUserDetails(response.data.Data[0]);
        setEditedUserDetails({
          firstName: response.data.Data[0].firstName,
          lastName: response.data.Data[0].lastName,
          email: response.data.Data[0].email,
          mobileNo: response.data.Data[0].contactNumber.mobileNo,
          countryCode: response.data.Data[0].contactNumber.countryCode,
          // Add other user details as needed
        });
      } else {
        setError(`Error: ${response.data.Message}`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (field, value) => {
    setEditedUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log("handleSave:", editedUserDetails);

    try {
      // Create a request object with updated user details
      const req = {
        userId: userId,
        ...editedUserDetails,
      };

      console.log("req: \n", req);
      // Make a PUT request to update user details
      const response = await axios.put(
        `https://strack.onrender.com/api/user`,
        req
      );

      console.log("Update successful:", response.data);

      if (response.data?.IsSuccess) {
        // Show a success message to the user
        Alert.alert("Success", "User details updated successfully!", [
          { text: "OK", onPress: goBackToProfile },
        ]);
      } else {
        // Handle the case where the update was not successful
        Alert.alert(
          "Error",
          "Failed to update user details. Please try again."
        );
      }
    } catch (error) {
      console.error("Update failed:", error);

      // Handle the error as needed
      // For example, you can show an error message to the user
      Alert.alert("Error", "Failed to update user details. Please try again.");
    }
  };

  const goBackToProfile = () => {
    // Navigate back to the ProfileScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
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
      <Text style={styles.header}>Edit Account Details</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView>
          {/* Render input fields for user details */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={editedUserDetails.firstName || ""}
              onChangeText={(value) => handleValueChange("firstName", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={editedUserDetails.lastName || ""}
              onChangeText={(value) => handleValueChange("lastName", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={editedUserDetails.email || ""}
              onChangeText={(value) => handleValueChange("email", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileNumberContainer}>
              <TextInput
                style={styles.countryCodeInput}
                value={editedUserDetails.countryCode || ""}
                onChangeText={(value) =>
                  handleValueChange("countryCode", value)
                }
              />
              <TextInput
                style={styles.mobileNoInput}
                value={editedUserDetails.mobileNo || ""}
                onChangeText={(value) => handleValueChange("mobileNo", value)}
              />
            </View>
          </View>

          <LinearGradient
            colors={["#1378D5", "#68B4E8"]}
            style={styles.signInButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity style={styles.signInButton} onPress={handleSave}>
              <Text style={styles.signInButtonText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      )}
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
  mobileNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodeInput: {
    width: "auto",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  mobileNoInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
  },
  ScrollView: {
    padding: 16,
    marginBottom: 300,
  },
});

export default AccountDetails;
