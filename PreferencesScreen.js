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
import TopBar from "../navigation/topBar";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CategoryTab from "../navigation/categoryTab";
import axios from "axios";
import { Alert } from "react-native";

const PreferencesScreen = ({ route, navigation }) => {
  const { onSave } = route.params || {};
  const id = "6549607e3eade31f6671afdf";
  const [editedCategories, setEditedCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(
        `https://strack.onrender.com/api/inputs/preference/${id}`
      );
      if (response.data.IsSuccess) {
        setData(response.data.Data); // Assuming there is only one user preference
        console.log(response.data.Data[0]?.preference);
        setEditedCategories(
          response.data.Data[0]?.preference.reduce((acc, item) => {
            acc[item.categoryId.expenseName] = {
              price: item.price,
              categoryId: item.categoryId._id,
            };
            return acc;
          }, {})
        );
        console.log(editedCategories);
      } else {
        setError(`Error: ${response.data.Message}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (category, value) => {
    setEditedCategories((prevCategories) => ({
      ...prevCategories,
      [category]: {
        ...prevCategories[category],
        price: parseInt(value, 10) || 0,
      },
    }));
  };

  const handleSave = async () => {
    console.log("handleSave:", editedCategories);

    // if (onSave) {
    //   onSave(editedCategories);
    // }
    // goBackToProfile();
    try {
      const req = {
        userId: id,
        preference: Object.keys(editedCategories || {}).map((category) => ({
          categoryId: editedCategories[category].categoryId,
          price: editedCategories[category].price,
        })),
      };

      console.log("Request object:", req);

      // Assuming your API endpoint for updating preferences is 'your_update_endpoint'
      const response = await axios.post(
        `https://strack.onrender.com/api/inputs/preference/`,
        req
      );

      console.log("Update successful:", response.data);

      if (response.data?.IsSuccess) {
        // Show a success message to the user
        Alert.alert("Success", "Preferences updated successfully!", [
          { text: "OK", onPress: goBackToProfile },
        ]);
      } else {
        // Handle the case where the update was not successful
        Alert.alert("Error", "Failed to update preferences. Please try again.");
      }
    } catch (error) {
      console.error("Update failed:", error);

      // Handle the error as needed
      // For example, you can show an error message to the user
      Alert.alert("Error", "Failed to update preferences. Please try again.");
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
      <Text style={styles.header}>Edit Preferences</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView>
          {Object.keys(editedCategories || {}).map((category) => (
            <View key={category.categoryId} style={styles.inputContainer}>
              <Text style={styles.label}>{category}</Text>
              <TextInput
                style={styles.input}
                value={(editedCategories[category]?.price || "").toString()} // Access price with a fallback
                keyboardType="numeric"
                onChangeText={(value) => handleValueChange(category, value)}
              />
            </View>
          ))}

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
  ScrollView: {
    padding: 16,
    marginBottom: 300,
  },
});

export default PreferencesScreen;
