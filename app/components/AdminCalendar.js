import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import TimeBlock from './admin/TimeBlock';
import DayButton from './admin/DayButton';
import {timeBlocks, dayMapping} from '../constants';

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

  const today = new Date();
  const dayOfTheWeek = today.getDay();
  const dateOfTheWeek = today.getDate();

  const [selectedDate, setSelectedDate] = useState(dateOfTheWeek);
  const [selectedDay, setSelectedDay] = useState(dayOfTheWeek);

  const handleDayChange = useCallback(dayString => {
    const idx = dayMapping.findIndex(x => x === dayString);
    setSelectedDay(idx);
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={e => reportLayout('calendar', e.nativeEvent.layout)}>
      <View
        style={styles.daysWrapper}
        onLayout={e => reportLayout('dayButtons', e.nativeEvent.layout)}>
        <DayButton
          dayOfTheWeek="Sun"
          date={dateOfTheWeek - dayOfTheWeek}
          selected={selectedDay === 0}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Mon"
          date={dateOfTheWeek - dayOfTheWeek + 1}
          selected={selectedDay === 1}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Tue"
          date={dateOfTheWeek - dayOfTheWeek + 2}
          selected={selectedDay === 2}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Wed"
          date={dateOfTheWeek - dayOfTheWeek + 3}
          selected={selectedDay === 3}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Thu"
          date={dateOfTheWeek - dayOfTheWeek + 4}
          selected={selectedDay === 4}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Fri"
          date={dateOfTheWeek - dayOfTheWeek + 5}
          selected={selectedDay === 5}
          handleDayChange={handleDayChange}
        />
        <DayButton
          dayOfTheWeek="Sat"
          date={dateOfTheWeek - dayOfTheWeek + 6}
          selected={selectedDay === 6}
          handleDayChange={handleDayChange}
        />
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
