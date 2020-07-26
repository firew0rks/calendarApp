import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ACTIVITIES = [
  {
    title: 'Get ready',
    startTime: '8:00 am',
    duration: 30,
    label: 0,
  },
  {
    title: 'Get Breakfast',
    startTime: '8:30 am',
    duration: 30,
    label: 1,
  },
];

const ACTIVITIES2 = [
  {
    title: 'Get ready',
    startTime: '10:00 am',
    duration: 180,
    label: 0,
  },
];

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

const dayButtonStyles = StyleSheet.create({
  dayButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dayButtonWrapperSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgb(241, 241, 241)',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  dayOfTheWeekText: {
    fontSize: 17,
    lineHeight: 24,
    color: 'rgb(0, 99, 255)',
    fontWeight: 'bold',
  },
  dayOfTheWeekTextSelected: {
    fontSize: 17,
    lineHeight: 24,
    color: 'rgb(37, 38, 41)',
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgb(128, 128, 128)',
  },
});

const timeBlockStyles = StyleSheet.create({
  container: {
    // borderBottom: '1px solid rgb(220, 220, 220)',
    borderBottomColor: 'rgb(220, 220, 220)',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  timeText: {
    marginTop: 8,
    color: 'rgb(128, 128, 128)',
    flex: 17,
  },
  activitiesWrapper: {
    display: 'flex',
    flex: 94,
  },
  activityWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'rgba(146, 73, 234, 0.25)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 2,
    marginLeft: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 15,
  },
  startTimeText: {
    fontSize: 15,
    lineHeight: 15,
  },
});

function DayButton(props) {
  return (
    <View
      style={
        props.selected
          ? dayButtonStyles.dayButtonWrapperSelected
          : dayButtonStyles.dayButtonWrapper
      }>
      <Text
        style={
          props.selected
            ? dayButtonStyles.dayOfTheWeekTextSelected
            : dayButtonStyles.dayOfTheWeekText
        }>
        {props.dayOfTheWeek}
      </Text>
      <Text style={dayButtonStyles.dayText}>{props.day}</Text>
    </View>
  );
}

function TimeBlock(props) {
  const {height, time, activities, highlighted, reportLayout} = props;

  // Height is calculated by subtracting the margins and dividing by segments in a block.
  const heightPerSegment = (props.height - 2 - 2) / 2;

  const segments = 30 / 30;
  const segmentHeight = heightPerSegment * segments + 2 * (segments - 1);

  let highlightedStyle = {
    height: segmentHeight,
    borderColor: 'hotpink',
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderRadius: 6,
  };

  if (highlighted === 1) {
    highlightedStyle.top = heightPerSegment + 2;
  }

  return (
    <View style={{...timeBlockStyles.container, height: props.height}}>
      <Text
        style={timeBlockStyles.timeText}
        onLayout={e => reportLayout('timeText', e.nativeEvent.layout)}>
        {props.time}
      </Text>
      <View style={timeBlockStyles.activitiesWrapper}>
        {highlighted !== -1 && <View style={highlightedStyle} />}

        {props.activities.map((activity, i) => {
          // Calculate height for wrapper

          const segments = activity.duration / 30;
          const segmentHeight =
            heightPerSegment * segments + 2 * (segments - 1);

          return (
            <View
              key={i}
              style={{
                ...timeBlockStyles.activityWrapper,
                height: segmentHeight,
              }}>
              <Text style={timeBlockStyles.titleText}>{activity.title}</Text>
              <Text style={timeBlockStyles.startTimeText}>
                {activity.startTime}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function AdminCalendar(props) {
  const {
    calendarHeight,
    heightPerDivision,
    setCalendarLayout,
    timeBlockIdx,
    reportLayout,
  } = props;

  const timeWrapper = {
    display: 'flex',
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 16,
    padding: 16,
    height: calendarHeight,
  };

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
      <View style={timeWrapper}>
        <TimeBlock
          highlighted={
            timeBlockIdx === 0 || timeBlockIdx === 1 ? timeBlockIdx % 2 : -1
          }
          time="8 am"
          activities={[]}
          height={heightPerDivision}
          reportLayout={reportLayout}
        />
        <TimeBlock
          highlighted={
            timeBlockIdx === 2 || timeBlockIdx === 3 ? timeBlockIdx % 2 : -1
          }
          time="9 am"
          activities={[]}
          height={heightPerDivision}
          reportLayout={reportLayout}
        />
        <TimeBlock
          highlighted={
            timeBlockIdx === 4 || timeBlockIdx === 5 ? timeBlockIdx % 2 : -1
          }
          time="10 am"
          activities={ACTIVITIES2}
          height={heightPerDivision}
          reportLayout={reportLayout}
        />
      </View>
    </View>
  );
}

export default AdminCalendar;
