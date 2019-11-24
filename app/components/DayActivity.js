import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Clock from './Clock';
import NavBar from './NavBar';
import moment from 'moment';
import DayCard from './DayCard';
import { findCurrentTaskIndex } from '../helper/schedule';
import useInterval from '../helper/useInterval';

export default function DayActivity(props) {
  const { schedule } = props.screenProps;
  const multi = useRef(null);

  const formattedDate = moment().format('D/M/YY');
  const tomorrowsDate = moment()
    .add(1, 'days')
    .format('DD/MM/YY');

  // Get the current day's object array.
  const scheduleForToday = schedule[formattedDate];
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('DD MMMM YYYY'));
  const [scheduleIndex, setScheduleIndex] = useState(
    findCurrentTaskIndex(scheduleForToday),
  );

  useInterval(() => {
    const index = findCurrentTaskIndex(scheduleForToday);

    if (index !== scheduleIndex) {
      setScheduleIndex(index);
    }
  }, 1000);

  return (
    <View style={styles.app}>
      <View>
        <NavBar style={{flex: 1}} props={props} goToDayPage={false} />
        <View style={{height: 80, alignItems: 'center', marginBottom: 20}}>
          <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
        </View>
        <ScrollView>
          {scheduleForToday &&
            scheduleForToday.map((e, i) => {
              const formattedTime = moment(e.startTime, 'hmm').format('h:mm a');
              const status =
                scheduleIndex === i
                  ? 'now'
                  : scheduleIndex + 1 === i
                    ? 'next'
                    : 'inactive';

              // Don't show if there's no next item.
              const showTrailForA1 = i !== scheduleForToday.length - 1;

              return (
                <View
                  style={
                    status === 'now'
                      ? styles.dayActivityContainerNow
                      : styles.dayActivityContainer
                  }>
                  <View style={styles.padding1} />
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                  </View>
                  <View style={styles.padding2} />
                  <View style={styles.padding1} />
                  <View style={styles.cardContainer}>
                    <DayCard
                      cardText={e.activity1}
                      status={status}
                      showTrail={showTrailForA1}
                    />
                  </View>
                  <View style={styles.orContainer}>
                    {e.activity2 !== '' && (
                      <Text style={styles.orText}>OR</Text>
                    )}
                  </View>
                  <View style={styles.cardContainer}>
                    {e.activity2 !== '' && (
                      <DayCard
                        status={status}
                        ref={multi}
                        cardText={e.activity2}
                        showTrail={false}
                      />
                    )}
                  </View>
                  <View style={styles.padding1} />
                </View>
              );
            })}
<<<<<<< HEAD
          {/* {scheduleForTommorrow &&
            scheduleForTommorrow.map((e, i) => {
              const formattedTime = moment(e.startTime, 'hmm').format('h:mm a');
              const status =
                scheduleIndex === i
                  ? 'now'
                  : scheduleIndex + 1 === i
                  ? 'next'
                  : 'inactive';
              // Don't show if there's no next item.
              const showTrailForA1 = i !== scheduleForToday.length - 1;
              return (
                <View style={styles.dayActivityContainer}>
                  <View style={styles.padding1} />
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                  </View>
                  <View style={styles.padding2} />
                  <View style={styles.padding1} />
                  <View style={styles.cardContainer}>
                    <DayCard
                      cardText={e.activity1}
                      status={status}
                      showTrail={showTrailForA1}
                    />
                  </View>
                  <View style={styles.orContainer}>
                    {e.activity2 !== '' && (
                      <Text style={styles.orText}>OR</Text>
                    )}
                  </View>
                  <View style={styles.cardContainer}>
                    {e.activity2 !== '' && (
                      <DayCard
                        status={status}
                        ref={multi}
                        cardText={e.activity2}
                        showTrail={false}
                      />
                    )}
                  </View>
                  <View style={styles.padding1} />
                </View>
              );
            })} */}
=======
>>>>>>> WIP
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dayActivityContainer: {
    flexDirection: 'row',
  },
  dayActivityContainerNow: {
    flexDirection: 'row',
    backgroundColor: '#CDF07E',
  },
  padding1: {
    flex: 1,
  },
  padding2: {
    flex: 2,
  },
  timeContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 24,
    fontFamily: 'Comfortaa-Regular',
  },
  orContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  orText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFCE00',
  },
  cardContainer: {
    flex: 15,
  },
});