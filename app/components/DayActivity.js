import React, {useRef} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import moment from 'moment';
import DayCard from './DayCard';
import MainLayout from '../wrappers/MainLayout';
import withDbSchedule from '../wrappers/withDbSchedule';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  dayActivityContainer: {
    flexDirection: 'row',
  },
  dayActivityContainerNow: {
    backgroundColor: '#efffc9',
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
    fontSize: 30,
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

function DayActivity(props) {
  const {navigation, schedule} = props;
  const {todaysActivities, currentTaskIndex} = schedule;

  const multi = useRef(null);

  return (
    <MainLayout {...navigation}>
      <ScrollView style={styles.container}>
        {todaysActivities &&
          todaysActivities.map((e, i) => {
            const formattedTime = moment(e.startTime, 'hmm').format('h:mm a');
            const status =
              currentTaskIndex === i
                ? 'now'
                : currentTaskIndex + 1 === i
                ? 'next'
                : 'inactive';

            // Don't show if there's no next item.
            const showTrailForA1 = i !== todaysActivities.length - 1;

            return (
              <View style={status === 'now' && styles.dayActivityContainerNow}>
                <View style={styles.dayActivityContainer}>
                  <View style={styles.padding1} />
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                  </View>
                  <View style={styles.padding2} />
                  <View style={styles.padding1} />
                  <View style={styles.cardContainer}>
                    <DayCard
                      cardText={e.activity1.title}
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
              </View>
            );
          })}
      </ScrollView>
    </MainLayout>
  );
}

export default withDbSchedule(DayActivity);
