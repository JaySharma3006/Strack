import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import deleteButton from "../assets/icons/delete.png";
import camera from "../assets/icons/camera.png";
import EditLogScreen from "./EditLogScreen";
import axios from "axios";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const LogsCard = ({ navigation, updateLogsData, categories, ...props }) => {
  //console.log(navigation);
  const [imageSource, setImageSource] = React.useState(camera);

  const handleImageError = () => {
    setImageSource(camera); // Set the source to the default image when an error occurs
  };

  const calculateTotalTime = () => {
    const fromDateParts = props.fromDate.split("/");
    const fromTimeParts = props.fromTime.split(":");

    const startTime = new Date(
      parseInt(fromDateParts[2], 10), // Year
      parseInt(fromDateParts[1], 10) - 1, // Month (months are zero-based)
      parseInt(fromDateParts[0], 10), // Day
      parseInt(fromTimeParts[0], 10), // Hours
      parseInt(fromTimeParts[1], 10) // Minutes
    );

    const toDateParts = props.toDate.split("/");
    const toTimeParts = props.toTime.split(":");

    const endTime = new Date(
      parseInt(toDateParts[2], 10), // Year
      parseInt(toDateParts[1], 10) - 1, // Month (months are zero-based)
      parseInt(toDateParts[0], 10), // Day
      parseInt(toTimeParts[0], 10), // Hours
      parseInt(toTimeParts[1], 10) // Minutes
    );

    const timeDifference = endTime - startTime;

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const findCategoryName = (cat_id) => {
    const tempCat = categories.find((cat) => cat._id === cat_id);
    return tempCat && tempCat.expenseName ? tempCat.expenseName : "";
  };

  const handleDeleteLog = async () => {
    try {
      // Make a DELETE request to your API endpoint
      const response = await axios.delete(
        `https://strack.onrender.com/api/inputs/spending/${props.logId}`
      );

      if (response.data?.IsSuccess) {
        // Show a success message to the user
        Alert.alert("Success", "Log deleted successfully!");
        updateLogsData(props.logId);

        // You can also navigate the user back to the previous screen or perform any other action
      } else {
        // Handle the case where the deletion was not successful
        Alert.alert("Error", "Failed to delete log. Please try again.");
      }
    } catch (error) {
      console.error("Delete failed:", error);

      // Handle the error as needed
      Alert.alert("Error", "Failed to delete log. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("EditLogScreen", {
          logId: props.logId,
          title: props.title,
          image: props.image,
          category: findCategoryName(props.categoryId),
          price: props.price,
          isTime: props.isTime,
          categoryId: props.categoryId,
          fromTime: props.fromTime,
          toTime: props.toTime,
          fromDate: props.fromDate,
          toDate: props.toDate,
          categories: categories,
        })
      }
    >
      <Image
        source={
          props.image
            ? { uri: `data:image/jpg;base64,${props.image}` }
            : imageSource
        }
        style={styles.cardImage}
        onError={handleImageError}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <View style={styles.cardCategories}>
          <Text style={styles.cardCategory}>
            {findCategoryName(props.categoryId)}
          </Text>
        </View>
      </View>
      <View style={styles.cardPriceContainer}>
        {props.isTime ? (
          // Display total time taken for time-related entries
          <Text style={styles.cardPrice}>{calculateTotalTime()}</Text>
        ) : (
          // Display money-related information
          <Text style={styles.cardPrice}>${props.price}</Text>
        )}
        <TouchableOpacity onPress={handleDeleteLog}>
          <Image source={deleteButton} style={styles.deleteButton} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",

    margin: 7,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardCategories: {
    flexDirection: "row",
    margin: 10,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: 50,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardCategory: {
    flexDirection: "row",
    fontSize: 12,
    color: "#777777",
    backgroundColor: "#F1F2F1",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  cardPriceContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPrice: {
    margin: 10,
    fontSize: 16,
    color: "green",
  },
  deleteButton: {
    width: 24,
    height: 24,
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default LogsCard;
