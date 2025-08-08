import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity,StyleSheet  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = ['Work', 'Grocery', 'Cleaning', 'Cooking', 'Other'];



 const TimeScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());


  const handleLogEntry = () => {
    
    console.log('Date:', date);
    console.log('Location:', location);
    console.log('Task Name:', taskName);
    console.log('Category:', selectedCategory);
    console.log('From Time:', selectedFromTime);
    console.log('To Time:', selectedToTime);
  };

  const handleFromTimePickerChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setSelectedFromTime(selectedDate);
      setShowFromTimePicker(false);
    }
  };

  const handleToTimePickerChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setSelectedToTime(selectedDate);
      setShowToTimePicker(false);
    }
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <TextInput
        placeholder="Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <TouchableOpacity onPress={() => setShowFromTimePicker(true)}>
        <Text>From:</Text>
      </TouchableOpacity>

      {showFromTimePicker && (
        <DateTimePicker
          value={selectedFromTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleFromTimePickerChange}
        />
      )}

      <Text>From Time: {selectedFromTime.toLocaleTimeString()}</Text>

      <TouchableOpacity onPress={() => setShowToTimePicker(true)}>
        <Text>To:</Text>
      </TouchableOpacity>

      {showToTimePicker && (
        <DateTimePicker
          value={selectedToTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleToTimePickerChange}
        />
      )}

      <Text>To Time: {selectedToTime.toLocaleTimeString()}</Text>
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={handleLogEntry}>
            <View
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', marginRight: 10 }}>Enter Log</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogEntry}>
            <View
              style={{
                padding: 10,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon name="microphone" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default TimeScreen;
