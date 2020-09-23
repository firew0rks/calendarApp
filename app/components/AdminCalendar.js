import React, {useState, useCallback, useEffect} from 'react';
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

function AdminCalendar(props) {
  const {
    calendarHeight,
    heightPerDivision,
    draggedCard,
    timeBlockIdx,
    segmentIdx,
    reportLayout,
    activities,
    dateViewing,
    handleDateChange,
  } = props;

  const dayOfTheWeek = moment(dateViewing).day();
  const date = moment(dateViewing);

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
                  guiderTimeBlockIdx={timeBlockIdx}
                  guiderSegmentIdx={segmentIdx}
                  time={x.timeLabel}
                  a={x.a}
                  activities={activities}
                  height={heightPerDivision}
                  reportLayout={reportLayout}
                />
              );
            })}
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
}

export default AdminCalendar;
