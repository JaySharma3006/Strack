import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Platform, ScrollView,FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from "expo-linear-gradient";
import { Header } from 'react-native-elements';

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
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const handleButtonPress = (buttonName) => {
    if (buttonName === 'time') {
      navigation.navigate('ReportsScreen');
    } else {
      navigation.navigate('ReportsMoneyScreen');
    }
  };
  const onDateRangeSelect = (range) => {
    // Handle the selected date range
    setDateRange(range);
    // Close the date range picker
    setShowDateRangePicker(false);
  };

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
    const fetchData = async () => {
      try {
        const data = await fetchDataFromApi();
        //setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const pieChartData = combinedData.map(item => ({
    name: item.categoryname,
  }));
  const listData = [
    { percentage: '30%', task: 'Task 1', timeRemaining: '2 days' },
    { percentage: '60%', task: 'Task 2', timeRemaining: '5 days' },
    { percentage: '45%', task: 'Task 3', timeRemaining: '1 day' },
    { percentage: '80%', task: 'Task 4', timeRemaining: '3 days' },
    { percentage: '10%', task: 'Task 5', timeRemaining: '6 days' },
  ];

  return (
    <View style={styles.container}>
      <Header style={backgroundColor='white'}>
      <LinearGradient
        colors={["#1378D5", "#68B4E8"]}
        style={styles.backButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={navigation.navigate('Tabs')}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
        </Header>
      <View style={styles.headerButtons}>
      
      <TouchableOpacity
          style={[
            styles.touchableButton,
            selectedButton === "time" && styles.selectedButton,
          ]}
           onPress={() => handleButtonPress("time")}
        >
          <Text>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchableButton,
            selectedButton === "money" && styles.selectedButton,
          ]}
         
          onPress={() => handleButtonPress("money")}
        >
          <Text>Money</Text>
        </TouchableOpacity>
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
      <PieChart style={styles.piechartsettings}
              data={[
                {
                  name: item.categoryname,
                  population: 50,
                  color: 'rgba(131, 167, 234, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Category B',
                  population: 30,
                  color: 'rgba(203, 90, 90, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Category C',
                  population: 20,
                  color: 'rgba(72, 73, 77, 1)',
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
              data={listData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.percentage}>{item.percentage}</Text>
                  <Text style={styles.taskName}>{item.task}</Text>
                  <Text style={styles.timeRemaining}>{item.timeRemaining}</Text>
                </View>
              )}
            />
      </View>
      
   
   
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#1378D5", // Background color for the circular button
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtons: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touchableButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F1F2F1",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    margin: 10,
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
  flex:1,
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
},

});
export default ReportsMoneyScreen;