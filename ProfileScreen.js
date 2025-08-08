import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import profiePhoto from "../assets/icons/profilecircle.png";
import editButton from "../assets/icons/edit.png";
import deleteButton from "../assets/icons/delete.png";
// import LocationTracker from "./LocationTracker";
import TopBar from "../navigation/topBar";
import PreferencesScreen from "./PreferencesScreen";
import AccountDetails from "./AccountDetails";
import ChangePasswordScreen from "./ChangePasswordScreen";
import LoginPage from "./LoginPage";

const ProfileScreen = ({ navigation }) => {
  const [imageSource, setImageSource] = React.useState(profiePhoto);

  const editProfilePhoto = () => {
    //Edit profile photo
  };

  const navigateToDeleteProfile = () => {
    // Delete profile photo
  };

  const navigateToAccountDetails = () => {
    // Navigate to the AccountDetailsScreen
    navigation.navigate(AccountDetails);
  };

  const navigateToPreferences = () => {
    // Navigate to the PreferencesScreen
    navigation.navigate(PreferencesScreen);
  };

  const navigateToSubscription = () => {
    // Navigate to the SubscriptionScreen
    navigation.navigate("Subscription");
  };

  const navigateToLocationSettings = () => {
    // Navigate to the SubscriptionScreen
    navigation.navigate("LocationSettings");
  };

  const navigateToChangePassword = () => {
    // Navigate to the ChangePasswordScreen
    navigation.navigate(ChangePasswordScreen);
  };

  const navigateToContactUs = () => {
    // Navigate to the ContactUsScreen
    navigation.navigate("ContactUs");
  };

  const navigateToLogout = () => {
    // Implement the logout logic or navigate to a logout confirmation screen
    // For now, let's navigate to a LogoutScreen
    navigation.navigate(LoginPage);
  };

  return (
    <ScrollView>
      <TopBar></TopBar>
      <View style={styles.container}>
        <Image source={profiePhoto} style={styles.profileImage} />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={editProfilePhoto}>
            <Image source={editButton} style={styles.editButton}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToDeleteProfile}>
            <Image source={deleteButton} style={styles.deleteButton}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Jay Sharma</Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToAccountDetails}
          >
            <Text style={styles.optionText}>Account Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToPreferences}
          >
            <Text style={styles.optionText}>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToChangePassword}
          >
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToLocationSettings}
          >
            <Text style={styles.optionText}>Location Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToSubscription}
          >
            <Text style={styles.optionText}>Manage Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToContactUs}
          >
            <Text style={styles.optionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToLogout}
          >
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <LocationTracker></LocationTracker> */}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    paddingTop: 40,
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
  deleteButton: {
    flex: 1,
    alignItems: "center",
    width: 30,
    height: "auto",
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  options: {
    width: "100%",
    backgroundColor: "#F1F2F1", // Placeholder background color
    borderRadius: 20,
  },
  optionButton: {
    fontSize: 10,
    margin: 5,
    padding: 5,
  },
  optionText: {
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 5,
  },
});
