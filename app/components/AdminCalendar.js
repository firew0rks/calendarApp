import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import TimeBlock from './admin/TimeBlock';
import DayButton from './admin/DayButton';
import {timeBlocks, dayMapping} from '../constants';
import moment from 'moment';
import {
  FlingGestureHandler,
  State,
  Directions,
} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  daysWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 74,
  },
  timeWrapper: {
    display: 'flex',
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 16,
    padding: 16,
  },
});

/** Converts start/endDatetime to timeBlockIdx, segmentblockIdx and duration
 *
 * activities coming into this reduce function is already filtered
 * to the specific viewed day. This function does not check for same
 * dates but only compares hours.
 *
 * @param {*} activities
 * @return {timeBlockedActivities[]}
 */
// function separateToTimeBlocks(activities) {
//   let acc = new Array(12);
//   // console.log(activities, activities.length);
//   for (var i = 0; i < activities.length; i++) {
//     console.log('heree');
//     const curr = activities[i];
//     console.log(curr);
//     const startDatetime = moment(curr.startDatetime);
//     const endDatetime = moment(curr.endDatetime);
//     const duration = endDatetime.diff(startDatetime, 'minutes', true);

//     const startHour = moment(curr.startDatetime).hour();
//     const startMinute = moment(curr.startDatetime).minutes();

//     // Dividing by 100 to get 24h time
//     const timeBlockIdxObj = timeBlocks.find(x => x.time === startHour);
//     const timeBlockIdx = timeBlockIdxObj.key;
//     const segmentIdx = startMinute === 30 ? 1 : 0;

//     // Extract the necessary fields
//     const act = {};
//     act.title = curr.title;
//     act.label = curr.label;
//     act.timeBlockIdx = timeBlockIdx;
//     act.segmentIdx = segmentIdx;
//     act.duration = duration;

//     if (acc[timeBlockIdx] === undefined) {
//       console.log('creating array for ', timeBlockIdx);
//       acc[timeBlockIdx] = [];
//     }

//     console.log('pushing into', timeBlockIdx, act);
//     acc[timeBlockIdx].push(act);
//   }

//   return acc;
// }

function separateToTimeBlocks(activities) {
  let acc = new Array(12);
  for (var i = 0; i < activities.length; i++) {
    const curr = activities[i];

    if (acc[curr.timeBlockIdx] === undefined) {
      acc[curr.timeBlockIdx] = [];
    }

    acc[curr.timeBlockIdx].push(curr);
  }

  return acc;
}

function AdminCalendar(props) {
  const {
    calendarHeight,
    heightPerDivision,
    draggedCard,
    guiderTimeBlockIdx,
    guiderSegmentIdx,
    reportLayout,
    activities,
    dateViewing,
    handleDateChange,
    isActivityPlaceable,
  } = props;

  const dayOfTheWeek = moment(dateViewing).day();
  const date = moment(dateViewing);

  let separatedActivities = useMemo(() => separateToTimeBlocks(activities), [
    activities,
  ]);

  return (
    <View
      style={styles.container}
      onLayout={e => reportLayout('calendar', e.nativeEvent.layout)}>
      <View
        style={styles.daysWrapper}
        onLayout={e => reportLayout('dayButtons', e.nativeEvent.layout)}>
        <DayButton
          dayOfTheWeek="Sun"
          date={date.clone().startOf('week')}
          selected={dayOfTheWeek === 0}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Mon"
          date={date
            .clone()
            .startOf('week')
            .add(1, 'days')}
          selected={dayOfTheWeek === 1}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Tue"
          date={date
            .clone()
            .startOf('week')
            .add(2, 'days')}
          selected={dayOfTheWeek === 2}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Wed"
          date={date
            .clone()
            .startOf('week')
            .add(3, 'days')}
          selected={dayOfTheWeek === 3}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Thu"
          date={date
            .clone()
            .startOf('week')
            .add(4, 'days')}
          selected={dayOfTheWeek === 4}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Fri"
          date={date
            .clone()
            .startOf('week')
            .add(5, 'days')}
          selected={dayOfTheWeek === 5}
          handleDateChange={handleDateChange}
        />
        <DayButton
          dayOfTheWeek="Sat"
          date={date
            .clone()
            .startOf('week')
            .add(6, 'days')}
          selected={dayOfTheWeek === 6}
          handleDateChange={handleDateChange}
        />
      </View>
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleDateChange(date.clone().add(1, 'week'));
          }
        }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleDateChange(date.clone().subtract(1, 'week'));
            }
          }}>
          <View style={[styles.timeWrapper, {height: calendarHeight}]}>
            {timeBlocks.map(x => {
              return (
                <TimeBlock
                  key={x.key}
                  timeBlockIdx={x.key}
                  draggedCard={draggedCard}
                  guiderTimeBlockIdx={guiderTimeBlockIdx}
                  guiderSegmentIdx={guiderSegmentIdx}
                  time={x.timeLabel}
                  a={x.a}
                  activities={separatedActivities[x.key]}
                  height={heightPerDivision}
                  reportLayout={reportLayout}
                  showHighlight={
                    isActivityPlaceable && guiderTimeBlockIdx === x.key
                  }
                />
              );
            })}
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
}

export default React.memo(AdminCalendar);
