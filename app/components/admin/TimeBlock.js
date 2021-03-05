import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {View, StyleSheet, Text} from 'react-native';
import {labels, timeBlocks} from '../../constants';
import {isCardPlaceable} from '../../helper/isCardPlaceable';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import CardTooltip from '../CardTooltip';
import DatabaseHelper from '../sqlite';

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
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'space-between',
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

function PlacementGuider(props) {
  const {show, style} = props;

  return show ? <View style={style} /> : null;
}

function TimeBlock(props) {
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
    showHighlight,
  } = props;

  const [showTooltip, setShowTooltip] = useState([]);
  const longPressRef = useRef();
  const panRef = useRef();

  useEffect(() => {
    if (activities !== undefined) {
      const result = activities.reduce((acc, curr) => {
        acc[curr.id] = false;
        return acc;
      }, {});

      setShowTooltip(result);
    }
  }, [activities]);

  // Height is calculated by subtracting the margins and dividing by segments in a block.
  const heightPerSegment = (props.height - 2 - 2) / 2;

  let highlightedStyle;
  if (showHighlight) {
    // console.log('inShowHighlight', showHighlight, draggedCard);
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

  const toggleTooltip = (ev, act) => {
    if (ev.nativeEvent.oldState === 4 && ev.nativeEvent.state === 5) {
      setShowTooltip(t => {
        return {...t, [act.id]: !t[act.id]};
      });
    }
  };

  const handleLongPress = () => {
    console.log('long press handled!');
  };

  const handlePanGesture = event => {
    // All I care about is the translationY property - positive = down, negative = up
    console.log('handling pan gesture', event.nativeEvent);
    // Need to change activity's durations for it to be persistant
    // Change state + events in the database.

    // Maybe it's better to pass state down rather than functions up.
    // e.g. activities down and handleDeletes functions here
    // Because then functions can be called here, any change in state can
    // also happen here.

    // As im dragging, once it approaches a threshold, then change activity card
    // duration to increase or decrease - check if card is still placeable.

    const heightPerSegment = (props.height - 2 - 2) / 2;

    if (event.nativeEvent.translationY > heightPerSegment) {
      console.log(
        'next section',
        heightPerSegment,
        event.nativeEvent.translationY,
      );
    }
  };

  return (
    <View
      style={[timeBlockStyles.container, {height: height, zIndex: 0 - time}]}
      pointerEvents="box-none">
      <Text
        style={timeBlockStyles.timeText}
        onLayout={e => reportLayout('timeText', e.nativeEvent.layout)}>
        {`${time} ${a}`}
      </Text>
      <View style={timeBlockStyles.activitiesWrapper} pointerEvents="box-none">
        <PlacementGuider show={showHighlight} style={highlightedStyle} />
        {activities &&
          activities.map((activity, i) => {
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
              <TapGestureHandler
                onHandlerStateChange={ev => toggleTooltip(ev, activity)}
                key={startTime}>
                <View
                  key={i}
                  style={[
                    timeBlockStyles.activityWrapper,
                    activityWrapperStyle,
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={timeBlockStyles.titleText}>
                      {activity.title}
                    </Text>
                    <Text style={timeBlockStyles.startTimeText}>
                      {startTime}
                    </Text>
                    {showTooltip && showTooltip[activity.id] && (
                      <CardTooltip
                        // handlePressEdit={() =>
                        //   props.handlePressEdit(activity.id)
                        // }
                        handlePressDelete={() =>
                          props.handlePressDelete(activity.id)
                        }
                      />
                    )}
                  </View>
                  <LongPressGestureHandler
                    ref={longPressRef}
                    onGestureEvent={handleLongPress}
                    simultaneousHandlers={panRef}>
                    <PanGestureHandler
                      ref={panRef}
                      onHandlerStateChange={handlePanGesture}
                      onGestureEvent={handlePanGesture}
                      simultaneousHandlers={longPressRef}>
                      <View style={{display: 'flex', alignItems: 'center'}}>
                        <View
                          style={{
                            height: 6,
                            width: 70,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: 4,
                          }}
                        />
                      </View>
                    </PanGestureHandler>
                  </LongPressGestureHandler>
                </View>
              </TapGestureHandler>
            );
          })}
      </View>
    </View>
  );
}

// Return true if you don't want it to run.
function areEqual(prevProps, nextProps) {
  // Rerender if showHighlight is changed or activities list has changed
  if (prevProps.showHighlight !== nextProps.showHighlight) {
    return false;
  }

  if (prevProps.showHighlight && nextProps.showHighlight) {
    if (prevProps.guiderSegmentIdx !== nextProps.guiderSegmentIdx) {
      return false;
    }
  }

  if (
    prevProps.activities === undefined &&
    nextProps.activities !== undefined
  ) {
    return false;
  }

  if (
    nextProps.activities === undefined &&
    prevProps.activities !== undefined
  ) {
    return false;
  }

  if (
    prevProps.activities &&
    nextProps.activities &&
    prevProps.activities.length !== nextProps.activities.length
  ) {
    return false;
  }

  return true;
}

export default React.memo(TimeBlock, areEqual);
