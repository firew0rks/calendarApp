import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Clock from './Clock';
import NavBar from './NavBar';
import Activity from './Activity';
import moment from 'moment';
import DayCard from './DayCard';

export default function DayActivity(props) {
  const {schedule, date, time, setTime, setDate} = props;

  const formattedDate = moment().format('D/M/YY');

  // Get the current day's object array.
  const currentDay = schedule[formattedDate];

  return (
    <View style={styles.app}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <NavBar style={{flex: 1}} props={props} goToDayPage={false} />
          <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
          {currentDay &&
            currentDay.map(e => {
              const formattedTime = moment(e.startTime, 'hmm').format('h:mm a');
              console.log(e.startTime);
              console.log(formattedTime);
              return (
                <View style={styles.container}>
                  <View style={styles.padding} />
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                  </View>
                  <View style={styles.cardContainer}>
                    <DayCard cardText={e.activity1} />
                  </View>
                  <View style={styles.cardContainer}>
                    <DayCard cardText={e.activity2} />
                  </View>
                  <View style={styles.padding} />
                </View>
              );
            })}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    flex: 1,
  },
  timeContainer: {
    flex: 2,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 24,
  },
  cardContainer: {
    flex: 4,
  },
});
