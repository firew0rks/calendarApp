import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text
} from 'react-native';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';
import { loadScheduleData, transformScheduleData } from './app/helper/fileLoader';
import PresentationalComponent from './app/components/PresentationalComponent'
import DayActivity from './app/components/DayActivity'
import NowActivity from './app/components/NowActivity'
import NavBar from './app/components/NavBar'

// React Nav
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class NowScreen extends React.Component {

  render() {
    return (
      <View style={styles.app}>
         <NavBar props={this.props} goToDayPage={true}/>
         <ScrollView >
            <Clock />
            <Activity />
         </ScrollView>
      </View>
    );
  }
}

class DayScreen extends React.Component {

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <NavBar style={{ flex: 1 }} props={this.props} goToDayPage={false}/>
        <Text>Day Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Now: NowScreen,
    Day: DayActivity,
  },
  {
    initialRouteName: 'Now',
  }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
   // Disables the warning messages in the app
   console.disableYellowBox = true;

   const [schedule, setSchedule] = useState({});

   useEffect(() => {
      // When app first launches, load in the file data.
      loadScheduleData().then((data) => {
         transformScheduleData(data).then((transformedData) => {
            console.log('---------------------', transformedData['1/12/19'])
            setSchedule(transformedData);
         });
      });
   }, []);

  return (
      <AppContainer />
  );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#F4F4F4',
      height: '100%',
      width: '100%',
   },
   app: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
});
