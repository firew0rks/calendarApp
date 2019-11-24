import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Activity from './Activity';
import moment from 'moment';
import * as RNFS from 'react-native-fs';
import NavBar from './NavBar';
import {ScrollView} from 'react-native-gesture-handler';
import Clock from './Clock';
import {findCurrentTaskIndex} from '../helper/schedule';
import {getImage} from '../helper/fileLoader';

export default function NowActivity(props) {
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('MMMM Do YYYY'));

  const {schedule} = props.screenProps;
  let today = moment().format('DD/MM/YY');
  const [nowImage, setNowImage] = useState('');
  const [nextImage, setNextImage] = useState('');
  const SCHEDULE_PATH = RNFS.DocumentDirectoryPath;
  const scheduleForToday = schedule[today];

  let nextActivity;
  let nowActivity;
  let endOfSchedule = false;

  const index = findCurrentTaskIndex(scheduleForToday);

  try {
    nowActivity = scheduleForToday[index].activity1.toLowerCase();
    if (index + 1 < scheduleForToday.length - 1) {
      nextActivity = scheduleForToday[index + 1].activity1.toLowerCase();
    } else {
      const today = moment()
        .add(1, 'days')
        .format('DD/MM/YY');
      nextActivity = schedule[today][0].activity1;
    }
  } catch {
    nowActivity = scheduleForToday[
      scheduleForToday.length - 1
    ].activity1.toLowerCase();
    endOfSchedule = true;
  }

  // Load photos
  getImage(nowActivity).then(contents => setNowImage(contents));
  getImage(nextActivity).then(contents => setNextImage(contents));

  return (
    <View style={styles.app}>
      <NavBar props={props} goToDayPage={true} />
      <View style={{height: 80}}>
        <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
      </View>

      <ScrollView>
        <Activity
          ActivityStyle={styles.nowActivity}
          ImageStyle={styles.nowImage}
          moments={'NOW'}
          textActivity={nowActivity}
          imagePath={nowImage}
        />
        {!endOfSchedule && (
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
  },
  nextActivity: {
    backgroundColor: '#F07E7E',
    width: Dimensions.get('window').width - 300,
  },
  nowImage: {
    height: Dimensions.get('window').height / 4,
  },
  nextImage: {
    height: Dimensions.get('window').height / 5,
  },
});
