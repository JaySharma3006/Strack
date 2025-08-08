import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const categories = [
  "Rent",
  "Utilities",
  "Groceries",
  "Car",
  "Sports",
  "Gym",
  "Shopping",
  "JunkFood",
  "Other",
];
const pickerStyle = Platform.select({
  ios: {
    fontFamily: "Poppins-Medium",
  },
  android: {
    fontFamily: "Poppins-Medium",
  },
});
const AddLogMoneyScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [taskName, setTaskName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());
  const [selectedButton, setSelectedButton] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setDatePickerVisibility] = useState(false);

  const [amount, setAmount] = useState("");

  const handleLogEntry = async () => {
    console.log("Date:", date);
    console.log("Location:", location);
    console.log("Task Name:", taskName);
    console.log("Category:", selectedCategory);
    console.log("From Time:", selectedFromTime);
    console.log("To Time:", selectedToTime);
    console.log("Custom Category:", customCategory);
    console.log("Amount:", amount);

    try {
      const apiUrl = "https://strack.onrender.com/api/inputs/spending";

      const requestBody = {
        location: location,
        taskName: taskName,
        category: {
          categoryId: selectedCategoryId,
          categoryName: selectedCategory,
        },
        date: selectedDate.toISOString(),
        amount: amount,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Log money entry added successfully!");
      } else {
        console.error(
          "Failed to add log money entry. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error adding log money entry:", error.message);
    }
  };

  const handleButtonPress = (buttonName) => {
    if (buttonName === "time") {
      navigation.navigate("AddLogScreen");
    } else {
      navigation.navigate("AddLogMoneyScreen");
    }
  };
  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    if (itemValue === "Other") {
      setShowCustomCategoryInput(true);
    } else {
      setShowCustomCategoryInput(false);
    }
  };
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      setSelectedDate(selectedDate);
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(false);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[
              styles.touchableButton,
              selectedButton === "time" && styles.selectedButton,
            ]}
            onPress={() => {
              handleButtonPress("time");
              setSelectedButton("time");
            }}
          >
            <Text>Time</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={["#1378D5", "#68B4E8"]}
            style={styles.touchableButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              style={[
                styles.touchableButton,
                selectedButton === "money" && styles.selectedButton,
              ]}
              onPress={() => {
                handleButtonPress("money");
                setSelectedButton("money");
              }}
            >
              <Text style={styles.touchableButtonText}>Money</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.locationInputBox}>
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.locationInputText}
          />
        </View>
        <View style={styles.taskNameInputBox}>
          <TextInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
            style={styles.taskNameInputtext}
          />
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            itemStyle={pickerStyle}
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <View style={styles.customCategoryInput}>
          {showCustomCategoryInput && (
            <View style={styles.customCategoryInputBox}>
              <TextInput
                placeholder="Custom Category"
                value={customCategory}
                onChangeText={(text) => setCustomCategory(text)}
                style={styles.customCategoryInputText}
              />
            </View>
          )}
        </View>
        <View style={styles.datePicker}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
            Date:
          </Text>

          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.label}>
              {" "}
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.moneyInputBox}>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            style={styles.amountInputText}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: 16,
          }}
        >
          <LinearGradient
            colors={["#1378D5", "#68B4E8"]}
            style={styles.enterLogButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={handleLogEntry}>
              <Text style={styles.enterLogButtonText}>Enter Log</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity onPress={handleLogEntry}>
            <View
              style={{
                padding: 10,
                paddingLeft: 40,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="microphone" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  pickerText: {
    fontFamily: "Poppins-Medium",
  },
  headerButtons: {
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timeButton: {
    height: 37,
    padding: 5,
    width: 158,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  locationInputBox: {
    marginTop: 40,
  },
  customCategoryInput: {
    paddingTop: 10,
  },
  customCategoryInputBox: {
    height: 42,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#1A1B23",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingTop: 4,
  },

  taskNameInputBox: {
    marginTop: 30,
  },
  moneyInputBox: {
    marginTop: 30,
  },
  picker: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  fromTimePicker: {
    marginVertical: 20,
  },

  touchableButton: {
    justifyContent: "center",
    height: 42,
    padding: 5,
    width: 80,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  touchableButtonText: {
    paddingTop: 10,
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  selectedButton: {
    backgroundColor: "#1378D5",
  },
  moneyButton: {
    height: 37,
    padding: 5,
    width: 158,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  timeNavButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  moneyNavButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  locationInputText: {
    width: "100%",
    height: 42,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#1A1B23",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  taskNameInputtext: {
    width: "100%",
    height: 42,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#1A1B23",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  amountInputText: {
    width: "100%",
    height: 42,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#1A1B23",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  enterLogButton: {
    justifyContent: "center",
    height: 42,
    padding: 5,
    width: 80,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  enterLogButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
});
export default AddLogMoneyScreen;
