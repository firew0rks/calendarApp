import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import Clock from './Clock';
import NavBar from './NavBar';
import moment from 'moment';
import DayCard from './DayCard';
import {findCurrentTaskIndex} from '../helper/schedule';

export default function DayActivity(props) {
  const {schedule} = props.screenProps;
  const multi = useRef(null);

  const formattedDate = moment().format('D/M/YY');

  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('MMMM Do YYYY '));
  // Get the current day's object array.
  const scheduleForToday = schedule[formattedDate];

  const index = findCurrentTaskIndex(scheduleForToday);

  return (
    <View style={styles.app}>
      <SafeAreaView style={styles.container}>
        <NavBar style={{flex: 1}} props={props} goToDayPage={false} />
        <View style={{height: 80}}>
          <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
        </View>
        <ScrollView>
          {scheduleForToday &&
            scheduleForToday.map((e, i) => {
              const formattedTime = moment(e.startTime, 'hmm').format('h:mm a');
              const status =
                index === i ? 'now' : index + 1 === i ? 'next' : 'inactive';

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
                  <View style={styles.padding2} />
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    height: '100%',
    width: '100%',
  },
  dayActivityContainer: {
    flexDirection: 'row',
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
  },
  cardContainer: {
    flex: 12,
  },
});
