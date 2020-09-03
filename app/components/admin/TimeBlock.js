import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {labels} from '../../constants';

function isCardPlaceable(
  placedActivities,
  draggedCard,
  timeBlockIdx,
  guiderSegmentIdx,
  guiderTimeBlockIdx,
) {
  if (guiderTimeBlockIdx === -1 || timeBlockIdx !== guiderTimeBlockIdx) {
    return false;
  }

  // working in timeIdx and segmentIdx and duration
  const daStartHour = labels[guiderTimeBlockIdx].time;
  const daStartMinutes = guiderSegmentIdx ? 30 : 0;
  const daStartTime = daStartHour + daStartMinutes;
  const daEndTime = daStartTime + draggedCard.duration;

  // Compare start/end time to work out whether there's overlap
  const overlap = placedActivities.reduce((acc, cur) => {
    if (acc) return acc;

    const curStartHour = labels[cur.timeBlockIdx].time;
    const curStartMinutes = cur.segmentIdx ? 30 : 0;
    const curStartTime = curStartHour + curStartMinutes;
    const curEndTime = curStartTime + cur.duration;

    if (daStartTime <= curEndTime && curStartTime <= daEndTime) {
      return true;
    } else {
      return false;
    }
  }, false);

  console.log(timeBlockIdx === guiderTimeBlockIdx, overlap);

  return timeBlockIdx === guiderTimeBlockIdx && !overlap;
}

export default function TimeBlock(props) {
  const {
    height,
    time,
    activities,
    draggedCard,
    reportLayout,
    a,
    timeBlockIdx,
    guiderTimeBlockIdx,
    guiderSegmentIdx,
  } = props;

  // Height is calculated by subtracting the margins and dividing by segments in a block.
  const heightPerSegment = (props.height - 2 - 2) / 2;
  const showHighlight = isCardPlaceable(
    activities,
    draggedCard,
    timeBlockIdx,
    guiderSegmentIdx,
    guiderTimeBlockIdx,
  );
  const filteredActivities = activities.filter(
    x => x.timeBlockIdx === timeBlockIdx,
  );

  let highlightedStyle;
  if (showHighlight) {
    // Segment height is the height of the activity block, calculated from duration.
    const segments = draggedCard.duration / 30;
    const segmentHeight = heightPerSegment * segments + 2 * (segments - 1);
    const borderColor = labels[draggedCard.label].color;
    const top = guiderSegmentIdx === 1 ? heightPerSegment + 2 : 0;

    highlightedStyle = {
      ...timeBlockStyles.highlightedStyle,
      height: segmentHeight,
      borderColor,
      top,
    };
  }

  return (
    <View style={[timeBlockStyles.container, {height: height}]}>
      <Text
        style={timeBlockStyles.timeText}
        onLayout={e => reportLayout('timeText', e.nativeEvent.layout)}>
        {`${time} ${a}`}
      </Text>
      <View style={timeBlockStyles.activitiesWrapper}>
        <PlacementGuider show={showHighlight} style={highlightedStyle} />
        {filteredActivities.map((activity, i) => {
          const segments = activity.duration / 30;
          const segmentHeight =
            heightPerSegment * segments + 2 * (segments - 1);

          let activityWrapperStyle = {
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

          return (
            <View
              key={i}
              style={[timeBlockStyles.activityWrapper, activityWrapperStyle]}>
              <Text style={timeBlockStyles.titleText}>{activity.title}</Text>
              <Text style={timeBlockStyles.startTimeText}>{startTime}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function PlacementGuider(props) {
  const {show, style} = props;

  return show ? <View style={style} /> : null;
}

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
    borderRadius: 8,
    padding: 8,
    marginBottom: 2,
    marginLeft: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
  highlightedStyle: {
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderRadius: 6,
  },
});
