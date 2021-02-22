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
  // console.disableYellowBox = true;

  useEffect(() => {
    // Debugging purposes to get location of database.
    getPath();
  }, []);

  return (
    <>
      <AppContainer />
      {/* {!isEmpty(schedule) && <AppContainer screenProps={{schedule}} />} */}
      {/* TODO: Error saying to input schedule file */}
    </>
  );
}
