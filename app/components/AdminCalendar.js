import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

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
  // Height is calculated by subtracting the margins and dividing by segments in a block.
  const heightPerSegment = (props.height - 2 - 2) / 2;

  return (
    <View style={{...timeBlockStyles.container, height: props.height}}>
      <Text style={timeBlockStyles.timeText}>{props.time}</Text>
      <View style={timeBlockStyles.activitiesWrapper}>
        {props.activities.map((activity, i) => {
          // Calculate height for wrapper

          const segments = activity.duration / 30;
          const segmentHeight =
            heightPerSegment * segments + 2 * (segments - 1);

          console.log('### segments', segments);

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

function AdminCalendar() {
  const {height} = Dimensions.get('window');

  const timeDisplayHeight = height - 76 - 74 - 24 - 24;
  const divisions = 13;
  const timePadding = 8;
  const heightPerDivision = (timeDisplayHeight - timePadding * 2) / divisions;

  const timeWrapper = {
    display: 'flex',
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 16,
    padding: 16,
    height: timeDisplayHeight,
  };

  return (
    <View style={styles.container}>
      <View style={styles.daysWrapper}>
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
          time="8 am"
          activities={ACTIVITIES}
          height={heightPerDivision}
        />
        <TimeBlock
          time="9 am"
          activities={ACTIVITIES}
          height={heightPerDivision}
        />
        <TimeBlock
          time="10 am"
          activities={ACTIVITIES2}
          height={heightPerDivision}
        />
      </View>
    </View>
  );
}

export default AdminCalendar;
