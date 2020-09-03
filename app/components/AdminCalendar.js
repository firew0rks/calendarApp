import React from 'react';
import {View, StyleSheet} from 'react-native';
import TimeBlock from './admin/TimeBlock';
import DayButton from './admin/DayButton';
import {timeBlocks} from '../constants';

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
  } = props;

  return (
    <View
      style={styles.container}
      onLayout={e => reportLayout('calendar', e.nativeEvent.layout)}>
      <View
        style={styles.daysWrapper}
        onLayout={e => reportLayout('dayButtons', e.nativeEvent.layout)}>
        <DayButton dayOfTheWeek="Sun" day="21" />
        <DayButton dayOfTheWeek="Mon" day="22" />
        <DayButton dayOfTheWeek="Tue" day="23" />
        <DayButton dayOfTheWeek="Wed" day="24" selected />
        <DayButton dayOfTheWeek="Thu" day="25" />
        <DayButton dayOfTheWeek="Fri" day="26" />
        <DayButton dayOfTheWeek="Sat" day="27" />
      </View>
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
    </View>
  );
}

export default AdminCalendar;
