import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import items from "../items";
import LogsCard from "./LogsCard";
import TopBar from "../navigation/topBar";
import { useEffect } from "react";
import axios from "axios";

import { LinearGradient } from "expo-linear-gradient";

const LogsScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState("time");
  const userId = "6549607e3eade31f6671afdf";
  const [logDetails, setLogDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch user details from the server when the component mounts
    fetchDataFromServer();
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://strack.onrender.com/api/inputs/");
      const data = await response.json();
      console.info(data);
      setCategories(data.Data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDataFromServer = async (buttonName) => {
    try {
      const response = await axios.get(
        `https://strack.onrender.com/api/inputs/spending/${userId}`
      );
      if (response.data.IsSuccess) {
        console.log(response.data.Data);
        const filteredLogs =
          buttonName === "money"
            ? response.data.Data.filter((log) => !log.isTime)
            : response.data.Data.filter((log) => log.isTime);

        setLogDetails(filteredLogs);
      } else {
        setError(`Error: ${response.data.Message}`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLogsData = (logIdToDelete) => {
    // Filter out the deleted log
    const updatedLogs = logDetails.filter((log) => log._id !== logIdToDelete);
    setLogDetails(updatedLogs);
  };

  const handleButtonPress = (buttonName) => {
    setSelectedButton((prevButton) => {
      if (buttonName !== prevButton) {
        // If a different button is pressed, update the state
        fetchDataFromServer(buttonName);
        return buttonName;
      }
      // If the same button is pressed again, keep the state unchanged
      return prevButton;
    });
  };

  const test = () => {
    Alert.alert("selectedButton:", selectedButton);
  };

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.category}>
        {selectedButton == "money" ? (
          <LinearGradient
            colors={["#1378D5", "#68B4E8"]}
            style={styles.touchableButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <TouchableOpacity onPress={() => handleButtonPress("money")}>
              <Text style={styles.signInButtonText}>Money</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={[
              styles.touchableButton,
              selectedButton == "money" && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress("money")}
          >
            <Text>Money</Text>
          </TouchableOpacity>
        )}
        {selectedButton == "time" ? (
          <LinearGradient
            colors={["#68B4E8", "#1378D5"]}
            style={styles.touchableButton}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity onPress={() => handleButtonPress("time")}>
              <Text style={styles.signInButtonText}>Time</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={[
              styles.touchableButton,
              selectedButton == "time" && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress("time")}
          >
            <Text>Time</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.header}>
        <Text style={styles.bigText}>Logs</Text>
        {/* <TouchableOpacity>
            <Text>See all</Text>
          </TouchableOpacity> */}
      </View>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <ScrollView style={styles.scrollview}>
            {logDetails ? (
              logDetails.map((log) => (
                <LogsCard
                  key={log._id}
                  logId={log._id}
                  updateLogsData={updateLogsData}
                  image={log.image}
                  title={log.text}
                  price={log.price}
                  isTime={log.isTime}
                  categoryId={log.categoryId}
                  fromTime={log.fromTime}
                  toTime={log.toTime}
                  fromDate={log.fromDate}
                  toDate={log.toDate}
                  navigation={navigation}
                  LogsCard
                  categories={categories}
                  updateCategories={setCategories}
                />
              ))
            ) : (
              <Text>No logs Available!</Text>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default LogsScreen;

const styles = StyleSheet.create({
  category: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "white",
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
    marginLeft: 10,
  },
  selectedButton: {
    backgroundColor: "#68B4E8",
  },
  scrollview: {
    backgroundColor: "#F1F2F1",
    marginBottom: 300,
    borderRadius: 20,
  },
});
