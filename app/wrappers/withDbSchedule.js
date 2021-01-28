import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import dbService from '../components/sqlite';
import useInterval from '../helper/useInterval';
import {timeBlocks} from '../constants';

const DATE_FORMAT = 'YYYY-MM-DD';

// TODO: Move out to separate helper function.
const findCurrentActivity = todaysActivities => {
  const currentTime = moment().format('HHmm');

  const currentActivity = todaysActivities.find(activity => {
    moment(activity.startDateTime).format('HHmm') > currentTime &&
      moment(activity.endDateTime).format('HHmm') < currentTime;
  });

  return currentActivity;
};

export default function withDbSchedule(WrappedComponent) {
  return props => {
    const [todaysActivities, setTodaysActivites] = useState([]);
    const [tomorrowsActivities, setTomorrowsActivities] = useState([]);
    const [currentActivity, setCurrentActivity] = useState({});

    const getCalendarActivities = useCallback(async () => {
      const today = moment().format(DATE_FORMAT);
      const activities = await dbService.getCalendarActivities(today);
      console.log(activities);

      // Convert blocks and durations to hours and minutes.
      const convertedActivities = activities.map(activity => {
        const startHour = timeBlocks[activity.timeBlockIdx];
        const startMinute = activity.segmentIdx > 0 ? 30 : 0;

        const startDateTime = today
          .clone()
          .hour(startHour)
          .minute(startMinute);

        const endDateTime = startDateTime.clone().add(activity.duration, 'm');

        console.log(startDateTime, endDateTime);

        activity.startDateTime = startDateTime;
        activity.endDateTime = endDateTime;

        return activity;
      });

      setTodaysActivites(convertedActivities);
    }, []);

    useEffect(() => {
      getCalendarActivities();
    }, [getCalendarActivities]);

    useInterval(() => {
      const curr = findCurrentActivity(todaysActivities);

      if (curr !== undefined) {
        setCurrentActivity(curr);
      }
    }, 1000);

    const passedProps = {
      todaysActivities,
      currentActivity,
    };

    return <WrappedComponent {...props} schedule={passedProps} />;
  };
}
