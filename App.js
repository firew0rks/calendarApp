import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';
import {
  loadScheduleData,
  transformScheduleData,
  writeFile,
} from './app/helper/fileLoader';
import DayActivity from './app/components/DayActivity';
import NowActivity from './app/components/NowActivity';

// React Nav
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator(
  {
    Now: NowActivity,
    Day: DayActivity,
  },
  {
    initialRouteName: 'Now',
  },
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  // Disables the warning messages in the app
  console.disableYellowBox = true;

  const [schedule, setSchedule] = useState({});
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('ddd, MMMM Do YYYY '));

  useEffect(() => {
    //  writeFile();
    // When app first launches, load in the file data.
    loadScheduleData().then(data => {
      transformScheduleData(data).then(transformedData => {
        setSchedule(transformedData);
      });
    });
  }, []);

  return (
    <>
      <AppContainer screenProps={{schedule}} />
    </>
  );
}
