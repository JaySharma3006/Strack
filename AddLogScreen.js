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
import TopBar from "../navigation/topBar";
import axios from "axios";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import editButton from "../assets/icons/edit.png";
import deleteButton from "../assets/icons/delete.png";
import camera from "../assets/icons/camera.png";
import * as ImagePicker from "expo-image-picker";
import LogsScreen from "./LogsScreen";

const AddLogScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTime, setIsTime] = useState(true);
  const userId = "6549607e3eade31f6671afdf";
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [toTime, setToTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [image, setImage] = useState(null);
  const [fromShow, setFromShow] = useState(false);
  const [fromMode, setFromMode] = useState("date");
  const [imageChanged, setImageChanged] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [toMode, setToMode] = useState("date");
  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [taskName, setTaskName] = useState('');

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

    const formattedDate = selectedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const formattedTime = selectedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    setFromDate(formattedDate);
    setFromTime(formattedTime);
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

    const formattedDate = selectedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const formattedTime = selectedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    setToDate(formattedDate);
    setToTime(formattedTime);
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

  const handleCategoryChange = async (id) => {
    await fetchCategories();
    const tempCat = categories.find((cat) => cat._id === id);

    if (tempCat) {
      setCategory(tempCat.expenseName || "");
      setCategoryId(id);
    }
  };

  const handleSave = async () => {
    // Implement logic to save the edited log details

    try {
      // Create a request object with updated user details
      let base64Image = "data:image/jpeg;base64,";

      // Check if the image is a URI or a base64 string
      if (image && image.uri) {
        // If it's a URI, encode the image to base64
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = () => resolve();
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        base64Image = base64Image + reader.result.split(",")[1];
      } else {
        // If it's already a base64 string, use it directly
        base64Image = "";
      }

      const req = {
        userId: userId,
        text: title,
        isTime: isTime,
        price: price,

        fromTime: fromTime,
        toTime: toTime,
        image: base64Image,
        categoryId: categoryId,
      };

      console.log("req: \n", req);
      // Make a PUT request to update user details
      const response = await axios.post(
        `https://strack.onrender.com/api/inputs/spending`,
        req
      );

      console.log("Update successful:", response.data);

      if (response.data?.IsSuccess) {
        // Show a success message to the user
        Alert.alert("Success", "Log added successfully!", [{ text: "OK" }]);

        setTitle("");
        setPrice("");
        setCategory(null);
        setCategoryId(null);
        setFromTime("");
        setToTime("");
        setImage(null);
        setFromDateTime(new Date());
        setToDateTime(new Date());
        setFromDate("");
        setToDate("");
        setImageChanged(false);

        // Fetch categories again to update the category dropdown
        fetchCategories();
      } else {
        // Handle the case where the update was not successful
        Alert.alert("Error", "Failed to Add new log. Please try again.");
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
        setImage({ uri: result.assets[0]?.uri });
        setImageChanged(true);
      }
      console.log(result.assets[0]?.uri);
      console.info(image);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  useEffect(() => {
    console.info(image);
  }, [image]);
  const deletePhoto = () => {
    //delete profile photo
    console.log("delete");
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
      <View style={styles.category}>
        {!isTime ? (
          <LinearGradient
            colors={["#1378D5", "#68B4E8"]}
            style={styles.touchableButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <TouchableOpacity onPress={() => setIsTime(false)}>
              <Text style={styles.signInButtonText}>Money</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={[styles.touchableButton, !isTime && styles.selectedButton]}
            onPress={() => setIsTime(false)}
          >
            <Text>Money</Text>
          </TouchableOpacity>
        )}
        {isTime ? (
          <LinearGradient
            colors={["#68B4E8", "#1378D5"]}
            style={styles.touchableButton}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity onPress={() => setIsTime(true)}>
              <Text style={styles.signInButtonText}>Time</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={[styles.touchableButton, isTime && styles.selectedButton]}
            onPress={() => setIsTime(true)}
          >
            <Text>Time</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.header}>Add Log</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.locationInputBox}>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.locationInputText}
        />
      </View>
      <Text style={styles.label}>Task Name</Text>
      <View style={styles.taskNameInputBox}>
        <TextInput
          placeholder="Task Name"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
          style={styles.taskNameInputtext}
        />
      </View>

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
              placeholder="Enter Price"
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </>
        )}

        <Text style={styles.label}>Category</Text>
          {/* Platform.OS === 'android' ?  */}

        <RNPickerSelect
          placeholder={{
            label: category,
            value: categoryId,
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
          value={category}
        />

        {/* Display the current image */}
        {
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={openImageModal}>
              {imageChanged ? (
                <Image source={image} style={styles.profileImage} />
              ) : (
                <Image source={camera} style={styles.profileImage} />
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
            <Image source={image} style={styles.modalImage} />
          </TouchableOpacity>
        </Modal>
      </View>

      {/* <Button title="Save" onPress={handleSave} /> */}
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
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
    borderRadius: 10,
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
    marginVertical: 10,
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
  touchableButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F1F2F1",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  bigText: {
    fontSize: 27,
    fontFamily: "Poppins-Bold",
  },
  selectedButton: {
    backgroundColor: "#68B4E8",
  },
  scrollview: {
    marginBottom: 300,
  },
  locationInputText: {
    width: '100%',
    height: 42,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    color: '#1A1B23',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  taskNameInputtext: {
    width: '100%',
    height: 42,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    color: '#1A1B23',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
});

export default AddLogScreen;
