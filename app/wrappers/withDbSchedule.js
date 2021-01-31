import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import dbService from '../components/sqlite';
import useInterval from '../helper/useInterval';
import {timeBlocks} from '../constants';
import {findCurrentTaskIndex} from '../helper/schedule';
import isEmpty from 'lodash/isEmpty';

const DATE_FORMAT = 'YYYY-MM-DD';

// TODO: Move out to separate helper function.
const findCurrentActivity = todaysActivities => {
  const currentTime = moment().format('HHmm');

  const currentActivity = todaysActivities.find(activity => {
    // console.log('findCurrentActivity', activity, moment(activity.startDateTime).format('HHmm'), moment(activity.endDateTime).format('HHmm'), currentTime);
    // console.log(moment(activity.startDateTime).format('HHmm'), moment(activity.endDateTime).format('HHmm'), currentTime, Number(moment(activity.startDateTime).format('HHmm')) < Number(currentTime), Number(moment(activity.endDateTime).format('HHmm')) > Number(currentTime));
    return (
      Number(moment(activity.startDateTime).format('HHmm')) < Number(currentTime) &&
      Number(moment(activity.endDateTime).format('HHmm')) > Number(currentTime)
    );
  });

  return currentActivity;
};

const findNowAndNextActivity = todaysActivities => {
  const currentTime = moment().format('HHmm');
}

export default function withDbSchedule(WrappedComponent) {
  return props => {
    const [todaysActivities, setTodaysActivites] = useState([]);
    const [tomorrowsActivities, setTomorrowsActivities] = useState([]);
    const [currentActivity, setCurrentActivity] = useState({});
    const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
    const [nowActivity, setNowActivity] = useState(undefined);
    const [nextActivity, setNextActivity] = useState(undefined);

    const getCalendarActivities = useCallback(async () => {
      const today = moment().format(DATE_FORMAT);
      const activities = await dbService.getCalendarActivities(today);

      // Convert blocks and durations to hours and minutes.
      // const convertedActivities = activities.map(activity => {
      //   console.log('activity', activity);
      //   const startHour = timeBlocks[activity.timeBlockIdx].time;
      //   const startMinute = activity.segmentIdx > 0 ? 30 : 0;

      //   const startDateTime = moment(today)
      //     .hour(startHour)
      //     .minute(startMinute);

      //   const endDateTime = startDateTime.clone().add(activity.duration, 'm');

      //   activity.startDateTime = startDateTime;
      //   activity.endDateTime = endDateTime;

      //   return activity;
      // });

      let formattedActivities = [];
      activities.forEach(activity => {
        const startHour = timeBlocks[activity.timeBlockIdx].time;
        const startMinute = activity.segmentIdx > 0 ? 30 : 0;

        const startDateTime = moment(today)
          .hour(startHour)
          .minute(startMinute);

        const endDateTime = startDateTime.clone().add(activity.duration, 'm');

        formattedActivities.push({
          startTime: startDateTime.format('HHmm'),
          endTime: endDateTime.format('HHmm'),
          activity1: activity,
          activity2: '',
        });
      });

      // Convert to start and end time

      // Check if those times exist in the data structure

      // Create if it doesn't, otherwise add to it i.e. (activity 2)

      // Sort data structure from start to end time
      formattedActivities.sort((a, b) => {
        return Number(a.startTime) - Number(b.startTime);
      });

      console.log('formattedActivities', formattedActivities);

      // Use findCurrentTaskIndex to determine now and next tasks

      setTodaysActivites(formattedActivities);
    }, []);

    useEffect(() => {
      getCalendarActivities();
    }, [getCalendarActivities]);

    // useInterval(() => {
    //   const curr = findCurrentActivity(todaysActivities);

    //   if (curr !== undefined) {
    //     setCurrentActivity(curr);
    //   }
    // }, 10000);

    useInterval(() => {
      const index = findCurrentTaskIndex(todaysActivities);

      // Update current task index when next task arrives.
      if (currentTaskIndex !== index) {
        setCurrentTaskIndex(index);
      }
    }, 1000);

    useEffect(() => {
      if (!isEmpty(todaysActivities)) {
        try {
          setNowActivity(todaysActivities[currentTaskIndex].activity1);

          if (currentTaskIndex + 1 < todaysActivities.length) {
            setNextActivity(todaysActivities[currentTaskIndex + 1].activity1);
          } else {
            // TODO: Get tomorrow's activities
          }
        } catch (err) {
          console.log('error', err);
        }
      }
    }, [currentTaskIndex, todaysActivities]);

    const passedProps = {
      todaysActivities,
      currentTaskIndex,
      nowActivity,
      nextActivity,
    };

    return <WrappedComponent {...props} schedule={passedProps} />;
  };
}
