import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text
} from 'react-native';
import moment from 'moment';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';
import { loadScheduleData, transformScheduleData } from './app/helper/fileLoader';
import PresentationalComponent from './app/components/PresentationalComponent'
import DayActivity from './app/components/DayActivity'
import NowActivity from './app/components/NowActivity'
import NavBar from './app/components/NavBar'
import isEmpty from 'lodash/isEmpty';

// React Nav
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const RootStack = createStackNavigator(
  {
    Now: NowActivity,
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
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('ddd, MMMM Do YYYY '));

  useEffect(() => {
    // When app first launches, load in the file data.
    loadScheduleData().then(data => {
      transformScheduleData(data).then(transformedData => {
        setSchedule(transformedData);
      });
    });
  }, []);

  return (
    <>
      {!isEmpty(schedule) && <AppContainer screenProps={{ schedule }} />}
    </>
  );
}
