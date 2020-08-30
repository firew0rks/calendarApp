import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {labels} from '../constants';

const ACTIVITIES = [
  {
    title: 'Get ready',
    startTime: '8:00 am',
    duration: 30,
    label: 0, // Label === colour of the activity card.
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

// Key increments by 2 because each Timeblock has 2 segments in them.
const TIME_BLOCKS = [
  {key: 0, time: '800', timeLabel: '8', a: 'am'},
  {key: 1, time: '900', timeLabel: '9', a: 'am'},
  {key: 2, time: '1000', timeLabel: '10', a: 'am'},
  {key: 3, time: '1100', timeLabel: '11', a: 'am'},
  {key: 4, time: '1200', timeLabel: '12', a: 'pm'},
  {key: 5, time: '1300', timeLabel: '1', a: 'pm'},
  {key: 6, time: '1400', timeLabel: '2', a: 'pm'},
  {key: 7, time: '1500', timeLabel: '3', a: 'pm'},
  {key: 8, time: '1600', timeLabel: '4', a: 'pm'},
  {key: 9, time: '1700', timeLabel: '5', a: 'pm'},
  {key: 10, time: '1800', timeLabel: '6', a: 'pm'},
  {key: 11, time: '1900', timeLabel: '7', a: 'pm'},
  {key: 12, time: '2000', timeLabel: '8', a: 'pm'},
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
    position: 'relative',
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
  const {
    height,
    time,
    activities,
    highlighted,
    draggedCard,
    reportLayout,
    a,
  } = props;
  // console.log('highlighted', highlighted);

  // Height is calculated by subtracting the margins and dividing by segments in a block.
  const heightPerSegment = (props.height - 2 - 2) / 2;

  // Segment height is the height of the activity block, calculated from duration.
  const segments = draggedCard.duration / 30; // TODO: Change to duration of the dragged card.
  const segmentHeight = heightPerSegment * segments + 2 * (segments - 1);

  let highlightedStyle = {
    height: segmentHeight,
    borderColor: labels[draggedCard.label]
      ? labels[draggedCard.label].color
      : 'white', // TODO: Change here for colour of label
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
    <View style={{...timeBlockStyles.container, height: height}}>
      <Text
        style={timeBlockStyles.timeText}
        onLayout={e => reportLayout('timeText', e.nativeEvent.layout)}>
        {`${time} ${a}`}
      </Text>
      <View style={timeBlockStyles.activitiesWrapper}>
        {highlighted !== null && <View style={highlightedStyle} />}
        {activities.map((activity, i) => {
          // Calculate height for wrapper
          const segments = activity.duration / 30;
          const segmentHeight =
            heightPerSegment * segments + 2 * (segments - 1);

          let activityWrapperStyle = {
            ...timeBlockStyles.activityWrapper,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: segmentHeight,
            backgroundColor: labels[activity.label].opaqueColor,
          };

          let startTime;
          if (activity.segmentIdx === 1) {
            activityWrapperStyle.top = heightPerSegment + 2;
            startTime = `${time}:30 ${a}`;
          } else {
            startTime = `${time} ${a}`;
          }

          // FIXME: This needs to be absolute to be able to place items in 30 mins segments.
          return (
            <View key={i} style={activityWrapperStyle}>
              <Text style={timeBlockStyles.titleText}>{activity.title}</Text>
              <Text style={timeBlockStyles.startTimeText}>{startTime}</Text>
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
    draggedCard,
    timeBlockIdx,
    segmentIdx,
    reportLayout,
    activities,
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
        {TIME_BLOCKS.map(x => {
          return (
            <TimeBlock
              key={x.key}
              draggedCard={draggedCard}
              highlighted={timeBlockIdx === x.key ? segmentIdx : null}
              time={x.timeLabel}
              a={x.a}
              activities={activities.filter(y => y.timeBlockIdx === x.key)}
              height={heightPerDivision}
              reportLayout={reportLayout}
            />
          );
        })}
        {/* <TimeBlock
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
        /> */}
      </View>
    </View>
  );
}

export default AdminCalendar;
