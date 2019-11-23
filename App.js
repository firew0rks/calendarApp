import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';
import DayActivity from './app/components/DayActivity';
import {loadScheduleData, transformScheduleData} from './app/helper/fileLoader';

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.app}>
          <ScrollView>
            <Clock
              time={time}
              setTime={setTime}
              date={date}
              setDate={setDate}
            />
            <DayActivity schedule={schedule} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
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
