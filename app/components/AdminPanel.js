import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import AdminActivityCard from './AdminActivityCard';
import AdminCalendar from './AdminCalendar';
import Animated, {debug} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import _ from 'lodash';
import ActivityList from './admin/ActivityList';
import ActivityHeader from './admin/ActivityHeader';

const {set, add, block, cond, eq, call} = Animated;

const HEADER_HEIGHT = 76;
const DAY_BUTTON_HEIGHT = 74;
const SCREEN_PADDING = 24;
const TIME_ACTIVITY_INNER_PADDING = 16;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    paddingBottom: 16,
    position: 'relative',
  },
  calendarPanel: {
    flex: 16,
    paddingHorizontal: 24,
  },
  activitesPanel: {
    flex: 9,
    paddingHorizontal: 24,
  },
  header: {
    height: 76,
  },
  calendarHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
  },
  activitiesHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthTitleText: {
    fontSize: 28,
    color: 'rgb(0, 99, 255)',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  monthTitleIcon: {
    fontSize: 14,
    color: 'rgb(0, 99, 255)',
    paddingLeft: 8,
  },
  settingsButton: {
    backgroundColor: 'rgb(231, 241, 255)',
  },
  settingsButtonIcon: {
    color: 'rgb(0, 99, 255)',
  },
  backButton: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  backButtonIcon: {
    marginRight: 8,
    color: 'rgb(0, 99, 255)',
  },
  backButtonText: {
    fontSize: 17,
    lineHeight: 24,
    paddingLeft: 0,
    color: 'rgb(0, 99, 255)',
  },
  activitiesTitle: {
    fontSize: 28,
    color: 'rgb(37, 38, 41)',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  newActivityButton: {
    backgroundColor: 'rgb(0, 99, 255)',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  calendarBody: {
    height: '100%',
    flex: 16,
  },
  activitiesBody: {
    flex: 9,
    height: '100%',
  },
});

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.calculateTimeBlock = this.calculateTimeBlock.bind(this);
    this.reportLayout = this.reportLayout.bind(this);
    this.placeActivity = this.placeActivity.bind(this);

    this.gestureState = new Animated.Value(-1);
    this.translationX = new Animated.Value(0);
    this.translationY = new Animated.Value(0);
    this.isDragging = new Animated.Value(0);
    this.x = new Animated.Value(0);
    this.y = new Animated.Value(0);

    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translationX,
          translationY: this.translationY,
          absoluteX: this.x,
          absoluteY: this.y,
          state: this.gestureState,
        },
      },
    ]);

    this.state = {
      layout: {},
      timeBlockIdx: -1,
      timeBlockSpan: 0,
      segmentIdx: 0,
      activities: [],
    };
  }

  debugXY([x, y]) {
    console.log('x', x, 'y', y);
  }

  calculateTimeBlock([x, y]) {
    const {height} = Dimensions.get('window');

    const timeAreaHeight =
      height - HEADER_HEIGHT - DAY_BUTTON_HEIGHT - 2 * SCREEN_PADDING;

    // Calculating calendar limits
    const yBegin =
      HEADER_HEIGHT +
      this.state.layout.dayButtons.height +
      TIME_ACTIVITY_INNER_PADDING;

    const yEnd = yBegin + timeAreaHeight;
    const xBegin =
      SCREEN_PADDING +
      TIME_ACTIVITY_INNER_PADDING +
      this.state.layout.timeText.width;

    const xEnd = xBegin + this.state.layout.calendar.width;

    // console.debug(yBegin, yEnd, xBegin, xEnd, x, y);

    const divisions = 13;

    // TODO: Recalculate calculations
    const segmentHeight =
      (timeAreaHeight - TIME_ACTIVITY_INNER_PADDING * 2) / (divisions * 2);

    if (x > xBegin && y > yBegin && x < xEnd && y < yEnd) {
      // Inside the calendar view
      const yOffset = y - yBegin;

      const segment = Math.floor(yOffset / segmentHeight);
      const timeBlockIdx = Math.floor(segment / 2);
      const segmentIdx = Math.floor(segment % 2);

      console.debug(segment, timeBlockIdx, segmentIdx);

      this.setState({
        ...this.state,
        timeBlockIdx,
        segmentIdx,
      });
    } else {
      this.setState({
        ...this.state,
        timeBlockIdx: -1,
        segmentIdx: -1,
      });
    }
  }

  placeActivity([x, y]) {
    console.log(
      'Drag activity finished',
      x,
      y,
      this.state.timeBlockIdx,
      this.state.segmentIdx,
    );
    // Set activity

    const newState = _.cloneDeep(this.state);

    newState.activities.push({
      title: 'Morning Routine',
      duration: 30,
      timeBlockIdx: this.state.timeBlockIdx,
      segmentIdx: this.state.segmentIdx,
    });

    newState.timeBlockIdx = -1;
    newState.segmentIdx = -1;
    newState.timeBlockSpan = 0;

    this.setState(newState);
  }

  reportLayout(key, layout) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.layout[key] = layout;
    this.setState(newState);
  }

  render() {
    const {height} = Dimensions.get('window');

    const calendarDisplayHeight =
      height - HEADER_HEIGHT - DAY_BUTTON_HEIGHT - 2 * SCREEN_PADDING;

    const divisions = 13;
    const timePadding = 8;
    const heightPerDivision =
      (calendarDisplayHeight - timePadding * 2) / divisions;

    return (
      <SafeAreaView style={styles.container}>
        <Animated.Code>
          {() => [
            cond(eq(this.gestureState, State.BEGAN), set(this.isDragging, 1)),
            cond(
              eq(this.gestureState, State.ACTIVE),
              call([this.x, this.y], this.calculateTimeBlock),
            ),
            cond(eq(this.gestureState, State.END), [
              set(this.isDragging, 0),
              call([this.x, this.y], this.placeActivity),
            ]),
          ]}
        </Animated.Code>
        <View style={styles.wrapper}>
          {/* Calendar */}
          <View style={styles.calendarPanel}>
            <View style={styles.header}>
              <View style={styles.calendarHeader}>
                <Button style={styles.backButton}>
                  <Icon
                    type="AntDesign"
                    name="arrowleft"
                    style={styles.backButtonIcon}
                  />
                  <Text style={styles.backButtonText}>Back</Text>
                </Button>
                <View style={styles.monthTitle}>
                  <Text style={styles.monthTitleText}>August</Text>
                  <Icon
                    type="AntDesign"
                    name="caretdown"
                    style={styles.monthTitleIcon}
                  />
                </View>
                <Button style={styles.settingsButton}>
                  <Icon
                    type="FontAwesome"
                    name="gear"
                    style={styles.settingsButtonIcon}
                  />
                </Button>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.calendarBody}>
                <AdminCalendar
                  calendarHeight={calendarDisplayHeight}
                  heightPerDivision={heightPerDivision}
                  timeBlockIdx={this.state.timeBlockIdx}
                  segmentIdx={this.state.segmentIdx}
                  reportLayout={this.reportLayout}
                  activities={this.state.activities}
                />
              </View>
            </View>
          </View>
          {/* Activites */}
          <View style={styles.activitesPanel}>
            <View style={styles.header}>
              <View style={styles.activitiesHeader}>
                <ActivityHeader />
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.activitiesBody}>
                <ActivityList />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AdminPanel;
