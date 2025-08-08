import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Platform, ScrollView,FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from "expo-linear-gradient";
import { Header } from 'react-native-elements';
import TopBar from '../navigation/topBar';

const categories = ['Today','This Week','Last Week','This Month','Previous Month','Last 3 months','Last 6 months','This Year','Other'];
const pickerStyle = Platform.select({
  ios: {
    fontFamily: 'Poppins-Medium',
  },
  android: {
    fontFamily: 'Poppins-Medium',
  },
});
const ReportsMoneyScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [listData, setListData] = useState([]);
  const [isTime, setIsTime] = useState(true);
  const [timeData, setTimeData] = useState([
    { percentage: '30%', task: 'Coding', timeRemaining: '2 days' },
    { percentage: '60%', task: 'Travel to Home', timeRemaining: '5 days' },
    { percentage: '45%', task: 'Coding', timeRemaining: '1 day' },
    { percentage: '80%', task: 'Work', timeRemaining: '3 days' },
    { percentage: '10%', task: 'Cleaning', timeRemaining: '6 days' },
  ]);

  
  
  const [moneyData, setMoneyData] = useState([
    { percentage: '30%', task: 'Grocery', moneySpent: '$286.78' },
    { percentage: '60%', task: 'Rent', moneySpent: '$1200' },
    { percentage: '45%', task: 'Car', moneySpent: '$1088' },
    { percentage: '80%', task: 'JunkFood', moneySpent: '$78.99' },
    { percentage: '10%', task: 'Utilities', moneySpent: '$500' },
  ]);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    if (itemValue === 'Other') {
      setShowCustomCategoryInput(true);
    } else {
      setShowCustomCategoryInput(false);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch('https://strack.onrender.com/api/inputs/spending/:userId');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
useEffect(() => {
  if (selectedButton === 'time') {
    setListData(timeData);
  } else if (selectedButton === 'money') {
    setListData(moneyData);
  }

  const fetchData = async () => {
    try {
      const data = await fetchDataFromApi();
      // You can set the appropriate data based on the selectedButton here
      // For example, if selectedButton is 'time', set the timeData state
      // If selectedButton is 'money', set the moneyData state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [selectedButton, timeData, moneyData]);
 
  


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
      {isTime &&  (
        <View>
      <PieChart style={styles.piechartsettings}
              data={[
                {
                  name: 'Task Completed On time',
                  population: 50,
                  color: 'rgba(131, 167, 234, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Task remaining',
                  population: 30,
                  color: 'rgba(203, 90, 90, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            /> 
            <FlatList
     data={timeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View style={styles.listItem}>
          
             <Text style={styles.percentage}>{item.percentage}</Text>
            <Text style={styles.taskName}>{item.task}</Text>
            <Text style={styles.timeRemaining}>{item.timeRemaining}</Text>
          
        
            
          </View>
        )}
      />
            </View>     )}
            {!isTime && (
              <View>
            
            <PieChart style={styles.piechartsettings}
              data={[
                {
                  name: 'Grocery',
                  population: 50,
                  color: 'rgba(131, 167, 234, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Car',
                  population: 30,
                  color: 'rgba(203, 90, 90, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Movies',
                  population: 20,
                  color: 'rgba(72, 73, 77, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={350}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />     
            <FlatList
     data={moneyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View style={styles.listItem}>
          
            <Text style={styles.percentage}>{item.percentage}</Text>
            <Text style={styles.taskName}>{item.task}</Text>
            <Text style={styles.timeRemaining}>{item.moneySpent}</Text>
          
            
          </View>
         
        )}
      />
       </View> )}
      
     
      </View>
      
   
   
  );
};

const styles = StyleSheet.create({
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchableButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F1F2F1",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  signInButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#1378D5", 
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtons: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectedButton: {
    backgroundColor: "#1378D5",
  },
  customCategoryInput: {
    paddingTop: 10,
  },
  customCategoryInputBox: {
    height: 42,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    color: '#1A1B23',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingTop: 4,
  },
listItem:{
  paddingTop:20,

  flexDirection:'row',
  alignItems:'flex-start',
  justifyContent:'space-between',
  marginHorizontal:10,
},
percentage:{
  fontFamily:'Poppins-Light',
  paddingLeft:20,
},
taskName:{
  fontFamily:'Poppins-Light',
  paddingLeft:10,
  paddingRight:10,
},
timeRemaining:{
  fontFamily:'Poppins-Light',
  paddingRight:20,
},
piechartsettings:{
  width:'100%',
  height:200,
},

});
export default ReportsMoneyScreen;