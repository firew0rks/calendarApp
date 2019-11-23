import NavBar from './NavBar';
import Activity from './Activity';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Clock from './Clock';
import {Dimensions} from 'react-native';
import moment from 'moment';

export default function NowScreen(props) {
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('ddd, MMMM Do YYYY '));

  console.log('propssss', props);

  return (
    <View style={styles.app}>
      <NavBar props={props} goToDayPage={true} />
      <ScrollView>
        <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
        <Activity
          ActivityStyle={styles.nowActivity}
          ImageStyle={styles.nowImage}
          moments={'NOW'}
        />
        <Activity
          ActivityStyle={styles.nextActivity}
          ImageStyle={styles.nextImage}
          moments={'NEXT'}
        />
      </ScrollView>
    </View>
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
  nowActivity: {
    backgroundColor: '#CDF07E',
    width: Dimensions.get('window').width - 100,
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
