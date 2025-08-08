import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import TopBar from "../navigation/topBar";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import editButton from "../assets/icons/edit.png";
import deleteButton from "../assets/icons/delete.png";
import camera from "../assets/icons/camera.png";
import * as ImagePicker from "expo-image-picker";

const EditLogScreen = ({ route, navigation }) => {
  const {
    isTime,
    logId,
    title,
    image,
    category,
    price,
    categoryId,
    fromDate,
    fromTime,
    toDate,
    toTime,
  } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const [fromShow, setFromShow] = useState(false);
  const [fromMode, setFromMode] = useState("date");

  const [toShow, setToShow] = useState(false);
  const [toMode, setToMode] = useState("date");
  const [imageChanged, setImageChanged] = useState(false);

  // State to hold edited log details
  const [editedLogDetails, setEditedLogDetails] = useState({
    title: title,
    image: image || camera,
    category: category,
    price: price,
    categoryId: categoryId,
    fromTime: fromTime,
    toTime: toTime,
    fromDate: fromDate,
    toDate: toDate,
  });

  const convertStringToDate = (dateString, timeString) => {
    // Split the string into day, month, and year parts
    if (dateString && timeString) {
      const [day, month, year] = dateString.split("/");

      // Convert hours to 24-hour format if PM
      const [hours, minutes, period] = timeString.split(/:| /);

      // Convert hours to 24-hour format
      const hours24 =
        period === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10);

      // Create a Date object (months are zero-based in JavaScript Date)
      const dateObject = new Date(year, month - 1, day, hours24, minutes);

      return dateObject;
    }
  };

  const [fromDateTime, setFromDateTime] = useState(
    convertStringToDate(fromDate, fromTime)
  );
  const [toDateTime, setToDateTime] = useState(
    convertStringToDate(toDate, toTime)
  );
  const onChangeFromDateTime = (event, selectedDate) => {
    setFromShow(false);

    if (selectedDate !== undefined) {
      if (fromMode === "date") {
        setFromDateTime(selectedDate);
        setFromMode("time");
        setFromShow(true);
      } else {
        setFromDateTime(selectedDate);
        setFromMode("date");
      }
    }
    setFromDateTime(selectedDate);
    console.log("line100:", selectedDate.toLocaleString());
    console.info(
      "from:",
      fromDateTime.toLocaleString(),
      "to",
      toDateTime.toLocaleString()
    );
    const formattedDate = fromDateTime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const formattedTime = fromDateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    console.log("Selected Date:", formattedDate);
    console.log("Selected Time:", formattedTime);
  };

  const onChangeToDateTime = (event, selectedDate) => {
    setToShow(false);

    if (selectedDate !== undefined) {
      if (toMode === "date") {
        setToDateTime(selectedDate);
        setToMode("time");
        setToShow(true);
      } else {
        setToDateTime(selectedDate);
        setToMode("date");
      }
    }

    console.log(selectedDate.toLocaleString());
    console.info(
      "from:",
      fromDateTime.toLocaleString(),
      "to",
      toDateTime.toLocaleString()
    );
    const formattedDate = fromDateTime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const formattedTime = fromDateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    editedLogDetails.fromDate = formattedDate;
    editedLogDetails.fromTime = formattedTime;
  };

  useEffect(() => {
    // Fetch categories from API

    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://strack.onrender.com/api/inputs/");
      const data = await response.json();
      // console.info(data);
      setCategories(data.Data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (id) => {
    fetchCategories();
    const tempCat = categories.find((cat) => cat._id === id);
    setEditedLogDetails((prevDetails) => ({
      ...prevDetails,
      category: tempCat.expenseName || "",
      categoryId: id,
    }));
    console.info(editedLogDetails);
  };

  const handleSave = async () => {
    // Implement logic to save the edited log details
    console.log("Saving edited log details:", editedLogDetails);

    try {
      // Create a request object with updated user details
      let base64Image = null;

      // Check if the image is a URI or a base64 string
      if (editedLogDetails.image.uri) {
        // If it's a URI, encode the image to base64
        const response = await fetch(editedLogDetails.image.uri);
        const blob = await response.blob();
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = () => resolve();
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        base64Image = reader.result.split(",")[1];
      } else {
        // If it's already a base64 string, use it directly
        base64Image = editedLogDetails.image.base64;
      }

      const req = {
        spendingId: logId,
        text: editedLogDetails.title,
        isTime: isTime,
        price: editedLogDetails.price,
        fromDate: editedLogDetails.fromDate,
        toDate: editedLogDetails.toDate,
        fromTime: editedLogDetails.fromTime,
        toTime: editedLogDetails.toTime,
        image: base64Image,
        categoryId: editedLogDetails.categoryId,
      };

      console.log("req: \n", req);
      // Make a PUT request to update user details
      const response = await axios.put(
        `https://strack.onrender.com/api/inputs/spending/`,
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
  const editPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Update the edited log details with the selected image
        setEditedLogDetails((prevDetails) => ({
          ...prevDetails,
          image: { uri: result.assets[0]?.uri },
        }));
        setImageChanged(true);
      }
      console.log(result.assets[0]?.uri);
      console.info(editedLogDetails.image);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  useEffect(() => {
    console.info(editedLogDetails.image);
  }, [editedLogDetails.image]);
  const deletePhoto = () => {
    //delete profile photo
    console.log("delete");
  };
  const goBackToProfile = () => {
    // Navigate back to the ProfileScreen
    navigation.goBack();
  };
  const openImageModal = () => {
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
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
      <Text style={styles.header}>Edit Log</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={editedLogDetails.title}
          onChangeText={(text) =>
            setEditedLogDetails((prevDetails) => ({
              ...prevDetails,
              title: text,
            }))
          }
        />

        {isTime ? (
          // Edit time-related information
          <>
            <Text style={styles.label}>From</Text>
            <TouchableOpacity
              onPress={() => {
                setFromMode("date");
                setFromShow(true);
              }}
            >
              <Text>{fromDateTime.toLocaleString()}</Text>
              {fromShow && (
                <DateTimePicker
                  value={fromDateTime}
                  mode={fromMode}
                  is24Hour={true}
                  onChange={onChangeFromDateTime}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.label}>To</Text>
            <TouchableOpacity
              onPress={() => {
                setToMode("date");
                setToShow(true);
              }}
            >
              <Text>{toDateTime.toLocaleString()}</Text>
              {toShow && (
                <DateTimePicker
                  value={toDateTime}
                  mode={toMode}
                  is24Hour={true}
                  onChange={onChangeToDateTime}
                />
              )}
            </TouchableOpacity>
          </>
        ) : (
          // Edit price-related information
          <>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={
                editedLogDetails.price ? editedLogDetails.price.toString() : ""
              }
              onChangeText={(text) => {
                console.log("Text input value:", text);
                setEditedLogDetails((prevDetails) => ({
                  ...prevDetails,
                  price: text,
                }));
              }}
            />
          </>
        )}

        <Text style={styles.label}>Category</Text>
        <RNPickerSelect
          placeholder={{
            label: editedLogDetails.category,
            value: editedLogDetails.categoryId,
          }}
          items={
            categories
              ? categories.map((cat) => ({
                  label: cat.expenseName,
                  value: cat._id,
                }))
              : []
          }
          onValueChange={(value) => handleCategoryChange(value)}
          style={{
            inputAndroid: {
              ...styles.input,
              color: "black", // Adjust the color as needed
            },
          }}
          value={editedLogDetails.category}
        />

        {/* Display the current image */}
        {
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={openImageModal}>
              {!imageChanged ? (
                <Image
                  source={{
                    uri: `data:image/jpg;base64,${editedLogDetails.image}`,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={editedLogDetails.image}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={editPhoto}>
                <Image source={editButton} style={styles.editButton}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={deletePhoto}>
                <Image source={deleteButton} style={styles.editButton}></Image>
              </TouchableOpacity>
            </View>
          </View>
        }
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={closeImageModal}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeImageModal}
          >
            <Image source={editedLogDetails.image} style={styles.modalImage} />
          </TouchableOpacity>
        </Modal>
      </View>
      {/* Add similar input fields for image, category, and price */}

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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: "#F1F2F1",
    padding: 10,
    borderRadius: 20,
  },
  label: {
    fontFamily: "Poppins-Light",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 16,
    height: 30,
  },
  editButton: {
    flex: 1,
    alignItems: "center",
    width: 30,
    height: "auto",
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
  },
});

export default EditLogScreen;
