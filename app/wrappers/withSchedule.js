import React, {useState, useEffect} from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import {findCurrentTaskIndex} from '../helper/schedule';
import useInterval from '../helper/useInterval';

const DATE_FORMAT = 'D/M/YY';

export default function withSchedule(WrappedComponent) {
  return props => {
    const {schedule} = props.screenProps;

    const today = moment().format(DATE_FORMAT);
    const tomorrow = moment()
      .add(1, 'days')
      .format(DATE_FORMAT);

    console.log(today);

    const scheduleToday = schedule[today];
    const scheduleTomorrow = schedule[tomorrow];

    const [nowActivity, setNowActivity] = useState(undefined);
    const [nextActivity, setNextActivity] = useState(undefined);
    const [endOfSchedule, setEndOfSchedule] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(
      findCurrentTaskIndex(scheduleToday),
    );

    useEffect(() => {
      if (!isEmpty(scheduleToday)) {
        try {
          setNowActivity(scheduleToday[currentTaskIndex].activity1);
          if (currentTaskIndex + 1 < scheduleToday.length) {
            setNextActivity(scheduleToday[currentTaskIndex + 1].activity1);
          } else {
            //Getting first activity of tomorrow if the schedule has finished today
            try {
              setNextActivity(scheduleTomorrow[0].activity1);
            } catch (error) {
              setEndOfSchedule(true);
              console.log('End of schedule');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, [currentTaskIndex, scheduleToday, scheduleTomorrow]);

    useInterval(() => {
      const index = findCurrentTaskIndex(scheduleToday);

      // Update current task index when next task arrives.
      if (currentTaskIndex !== index) {
        setCurrentTaskIndex(index);
      }
    }, 1000);

    const s = {
      lastTaskIndex: scheduleToday.length,
      scheduleToday,
      scheduleTomorrow,
      nowActivity,
      nextActivity,
      endOfSchedule,
      currentTaskIndex,
    };

    return <WrappedComponent {...props} schedule={s} />;
  };
}
