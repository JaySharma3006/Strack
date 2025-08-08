import React from 'react';
import { View, Text ,TextInput,StyleSheet} from 'react-native';
import { Rating, Airbnbrating } from 'react-native-ratings';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const rating = 7.5;

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
       <Text>Lorem Ipsum</Text>
       

        
       <View style={{ marginTop: 20 }}>
          <Text>Rating: {rating}</Text>
          <LinearGradient
            colors={['#FF5722', 'white']} 
            style={{ borderRadius: 20, overflow: 'hidden' }}
          >
            <ProgressBar
              progress={rating / 10}
              width={350}
              height={20}
              borderColor={'transparent'}
            />
          </LinearGradient>
        </View>

        
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Productivity Tracker</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={320}
            height={200}
            yAxisLabel="P"
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        </View>

       
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Budget Tracker</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [1200, 900, 1100, 800, 1000, 750],
                },
              ],
            }}
            width={320}
            height={200}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
  },
});

export default HomeScreen;
