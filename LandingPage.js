import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

export default function LandingPage({ navigation }) {

  return (
   
    <View style={styles.container}>
      
      <Image source={require('../assets/landingpage.png')} style={styles.image} />
      <Text style={styles.label1}>Let's Get </Text>
      <Text style={styles.label1}>Productive</Text>
      <Text style={styles.label2}>Track your Time and Money</Text>

      <LinearGradient
        colors={['#1378D5', '#68B4E8']}
        style={styles.signInButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <TouchableOpacity
      
        style={styles.signInButton}
        onPress={() => navigation.navigate('LoginPage')}
      >
      
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
  },
  image: {
    width: 500,
    height: 500,
   
  },
  label1: {
    fontSize: 40,

    fontFamily:'Poppins-Medium'
  },
  label2: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily:'Poppins-Light'
  },
  signInButton: {
    height:42,
    padding: 5,
    width: 325,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily:'Poppins-Regular'
  },
});
