import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Activity from './Activity';
import moment from 'moment';
import * as RNFS from 'react-native-fs';
import NavBar from './NavBar';
import {ScrollView} from 'react-native-gesture-handler';
import Clock from './Clock';
import {findCurrentTaskIndex} from '../helper/schedule';
import {getImage} from '../helper/fileLoader';
import isEmpty from 'lodash/isEmpty';

export default function NowActivity(props) {
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('DD MMMM YYYY'));

  const {schedule} = props.screenProps;
  let today = moment().format('D/M/YY');
  const [nowImage, setNowImage] = useState('');
  const [nextImage, setNextImage] = useState('');
  const SCHEDULE_PATH = RNFS.DocumentDirectoryPath;
  const scheduleForToday = schedule[today];

  let nextActivity;
  let nowActivity;
  let endOfSchedule = false;

  if (!isEmpty(scheduleForToday)) {
    try {
      const index = findCurrentTaskIndex(scheduleForToday);
      nowActivity = scheduleForToday[index].activity1;
      if (index + 1 < scheduleForToday.length - 1) {
        nextActivity = scheduleForToday[index + 1].activity1;
      } else {
        const tomorrow = moment()
          .add(1, 'days')
          .format('DD/MM/YY');
        nowActivity = scheduleForToday[
          scheduleForToday.length - 1
        ].activity1.toLowerCase();

        try {
          nextActivity = schedule[tomorrow][0].activity1;
        } catch (error) {
          endOfSchedule = true;
          console.log('End of schedule');
        }
      }
      // Load photos
      getImage(nowActivity.toLowerCase()).then(contents =>
        setNowImage(contents),
      );
      getImage(nextActivity.toLowerCase()).then(contents =>
        setNextImage(contents),
      );
    } catch (error) {
      console.log(
        'There are no more activities, please upload new CSV with new dates and activities',
      );
    }
  }

  return (
    <View style={styles.app}>
      <View>
        <NavBar props={props} goToDayPage={true} />
        <View style={{height: 80, alignItems: 'center'}}>
          <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
        </View>

        <ScrollView>
          {!isEmpty(scheduleForToday) && nowActivity != null ? (
            <Activity
              ActivityStyle={styles.nowActivity}
              ImageStyle={styles.nowImage}
              moments={'NOW'}
              textActivity={nowActivity}
              imagePath={nowImage}
            />
          ) : (
            <Text style={styles.noSheduleText}>
              At the end of schedule, please upload new schedule CSV with the
              new dates
            </Text>
          )}

          {!endOfSchedule && nextActivity != null && (
            <Activity
              ActivityStyle={styles.nextActivity}
              ImageStyle={styles.nextImage}
              moments={'NEXT'}
              textActivity={nextActivity}
              imagePath={nextImage}
            />
          )}
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
  nowActivity: {
    backgroundColor: '#CDF07E',
    width: Dimensions.get('window').width - 100,
    resizeMode: 'contain',
    borderWidth: 0,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 10,
    padding: 10,
  },
  nextActivity: {
    backgroundColor: '#F07E7E',
    width: Dimensions.get('window').width - 300,
    borderWidth: 0,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 10,
    padding: 10,
  },
  nowImage: {
    height: Dimensions.get('window').height / 2,
  },
  nextImage: {
    height: Dimensions.get('window').height / 3,
  },
  noSheduleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'FredokaOne-Regular',
  },
});
