import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import isUndefined from 'lodash/isUndefined';
import Activity from './ActivityCard';
import {ScrollView} from 'react-native-gesture-handler';
import {getImage} from '../helper/fileLoader';
import isEmpty from 'lodash/isEmpty';
import MainLayout from '../wrappers/MainLayout';
import withSchedule from '../wrappers/withSchedule';
import dbService from '../components/sqlite';
import moment from 'moment';
import withDbSchedule from '../wrappers/withDbSchedule';

const styles = StyleSheet.create({
  app: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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

function NowActivity(props) {
  const {navigation, schedule} = props;
  const {todaysActivities, nowActivity, nextActivity} = schedule;

  const [nowImage, setNowImage] = useState('');
  const [nextImage, setNextImage] = useState('');

  // useEffect(() => {
  //   // Load photos
  //   if (!isUndefined(nowActivity)) {
  //     getImage(nowActivity.toLowerCase()).then(contents =>
  //       setNowImage(contents),
  //     );
  //   }

  //   if (!isUndefined(nextActivity)) {
  //     getImage(nextActivity.toLowerCase()).then(contents =>
  //       setNextImage(contents),
  //     );
  //   }
  // }, [nowActivity, nextActivity]);

  useEffect(() => {
    if (!isUndefined(nowActivity)) {
      setNowImage(nowActivity.picturePath);
    }

    if (!isUndefined(nextActivity)) {
      setNextImage(nextActivity.picturePath);
    }
  }, [nowActivity, nextActivity]);

  return (
    <MainLayout {...navigation}>
      <ScrollView>
        {!isEmpty(todaysActivities) && nowActivity !== undefined ? (
          <Activity
            moments={'NOW'}
            textActivity={nowActivity.title}
            imagePath={nowImage}
          />
        ) : (
          <Text style={styles.noSheduleText}>
            At the end of schedule, please upload new schedule CSV with the new
            dates
          </Text>
        )}

        {nextActivity !== undefined && (
          <Activity
            moments={'NEXT'}
            textActivity={nextActivity.title}
            imagePath={nextImage}
          />
        )}
      </ScrollView>
    </MainLayout>
  );
}

export default withDbSchedule(NowActivity);
