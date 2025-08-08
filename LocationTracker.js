import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
// import { check, PERMISSIONS, request } from "react-native-permissions";

const LocationTracker = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Strack App Location Permission",
            message: "Strack App needs access to your location ",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
          //   startTrackingLocation();
        } else {
          console.warn("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const checkPermission = async () => {
      try {
        const status = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission already granted");
          startTrackingLocation();
        } else {
          await requestPermission();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    checkPermission();

    return () => {
      // Cleanup or stop tracking if needed
    };
  }, []);

  const startTrackingLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        // Handle location updates here
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error("Location tracking error:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1, // minimum distance between updates in meters
        interval: 5000, // time between updates in milliseconds
        fastestInterval: 2000, // maximum time between updates in milliseconds
        showLocationDialog: true, // show a dialog if location services are disabled
        forceRequestLocation: true, // force the app to request location permission (if not granted)
      }
    );
  };

  return (
    // Your component JSX here
    <></>
  );
};

export default LocationTracker;
