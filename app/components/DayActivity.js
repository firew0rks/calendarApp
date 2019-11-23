import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Activity from './Activity';
import moment from 'moment';
import DayCard from './DayCard';

export default function DayActivity(props) {
  const {schedule, date, time} = props;

  const formattedDate = moment().format('D/M/YY');
  console.log(formattedDate);

  // Get the current day's object array.
  const currentDay = schedule[formattedDate];

  console.log('current', currentDay);

  return (
    <>
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
    </>
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
