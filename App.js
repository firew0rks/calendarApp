import React, {useState, useEffect} from 'react';
import {
  loadScheduleData,
  transformScheduleData,
  getPath,
} from './app/helper/fileLoader';
import DayActivity from './app/components/DayActivity';
import NowActivity from './app/components/NowActivity';
import AdminPanel from './app/components/AdminPanel';
import isEmpty from 'lodash/isEmpty';

// React Nav
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator(
  {
    Now: NowActivity,
    Day: DayActivity,
    Admin: AdminPanel,
  },
  {
    initialRouteName: 'Admin',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  // Disables the warning messages in the app
  console.disableYellowBox = true;

  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    getPath();
    // When app first launches, load in the file data.
    loadScheduleData().then(data => {
      transformScheduleData(data).then(transformedData => {
        setSchedule(transformedData);
      });
    });
  }, []);

  return (
    <>
      {!isEmpty(schedule) && <AppContainer screenProps={{schedule}} />}
      {/* TODO: Error saying to input schedule file */}
    </>
  );
}
