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
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import _ from 'lodash';
import ActivityList from './admin/ActivityList';
import ActivityHeader from './admin/ActivityHeader';
import ActivitySchema, {ActivitySchemaKey} from '../database/ActivitySchema';
import realm from '../database/realm';
import {monthMapping} from '../constants';
import Realm from 'realm';
import CalendarSchema, {CalendarSchemaKey} from '../database/CalendarSchema';

const {set, add, block, cond, eq, call, debug} = Animated;

const UNSAFE_AREA_HEIGHT = 24;
const HEADER_HEIGHT = 76;
const DAY_BUTTON_HEIGHT = 74;
const SCREEN_PADDING = 24;
const TIME_ACTIVITY_INNER_PADDING = 16;

const ACTIVITY_CARD_CONTENT = 60;
const ACTIVITY_CARD_PADDING = 8;
const ACTIVITY_CARD_MARGIN_BOTTOM = 4;

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
    this.activatePanActivityCard = this.activatePanActivityCard.bind(this);
    this.handleActivityListScroll = this.handleActivityListScroll.bind(this);
    this.resetPanActivityCard = this.resetPanActivityCard.bind(this);
    this.refreshActivityList = this.refreshActivityList.bind(this);

    this.panGestureState = new Animated.Value(-1);
    this.translationX = new Animated.Value(0);
    this.translationY = new Animated.Value(0);
    this.absoluteX = new Animated.Value(0);
    this.absoluteY = new Animated.Value(0);
    this.x = new Animated.Value(0);
    this.y = new Animated.Value(0);

    // TODO: Edit paramater names
    this.onPanGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translationX,
          translationY: this.translationY,
          // absoluteX: this.absoluteX,
          // absoluteY: this.absoluteY,
          // x: this.x,
          // y: this.y,
          state: this.panGestureState,
        },
      },
    ]);

    this.longPressGestureState = new Animated.Value(-1);

    this.onLongPressGestureEvent = Animated.event([
      {
        nativeEvent: {
          state: this.longPressGestureState,
          absoluteY: this.absoluteY,
          absoluteX: this.absoluteX,
          x: this.x,
          y: this.y,
        },
      },
    ]);

    // FIXME: Load activities twice (again in ActivityAdminCard.js). Should be passed down.
    let activityListItems = realm.objects(ActivitySchemaKey);
    activityListItems.addListener(this.refreshActivityList);

    // Load today's date
    let today = new Date();
    // this.dayOfTheWeek = today.getDay();
    // this.dateOfTheWeek = today.getDate();
    this.month = today.getMonth();

    // console.log(dayOfTheWeek, dateOfTheWeek, month);

    this.state = {
      layout: {},
      timeBlockIdx: -1,
      timeBlockSpan: 0,
      segmentIdx: 0,
      activities: [],
      showPanCard: false,
      activityListOffsetY: 0,
      activityListItems: activityListItems,
      draggedCard: {
        title: '',
        duration: '',
        label: -1,
        picturePath: '',
        top: 0,
        left: 0,
      },
    };
  }

  refreshActivityList(collection) {
    console.debug('setState, refreshActivityList');
    this.setState({
      activityListItems: collection,
    });
  }

  calculateTimeBlock([x, y]) {
    if (this.state.showPanCard === false) {
      return;
    }

    const {height} = Dimensions.get('window');

    const timeAreaHeight =
      height - HEADER_HEIGHT - DAY_BUTTON_HEIGHT - 2 * SCREEN_PADDING;

    // Calculating calendar limits
    const yBegin =
      UNSAFE_AREA_HEIGHT +
      HEADER_HEIGHT +
      this.state.layout.dayButtons.height +
      TIME_ACTIVITY_INNER_PADDING;

    const yEnd = yBegin + timeAreaHeight;
    const xBegin =
      SCREEN_PADDING +
      TIME_ACTIVITY_INNER_PADDING +
      this.state.layout.timeText.width;

    const xEnd =
      SCREEN_PADDING +
      this.state.layout.calendar.width -
      TIME_ACTIVITY_INNER_PADDING;

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

      // Don't rerender screen if nothing has changed.
      if (
        timeBlockIdx === this.state.timeBlockIdx &&
        segmentIdx === this.state.segmentIdx
      ) {
        return;
      }

      console.debug('setState, calculateTimeBlock');

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
    // Set activity

    const newState = _.cloneDeep(this.state);

    const newCalendarActivity = {
      title: this.state.draggedCard.title,
      duration: this.state.draggedCard.duration,
      label: this.state.draggedCard.label,
      picturePath: this.state.draggedCard.picturePath,
      timeBlockIdx: this.state.timeBlockIdx,
      segmentIdx: this.state.segmentIdx,
    };

    newState.activities.push(newCalendarActivity);

    newState.timeBlockIdx = -1;
    newState.segmentIdx = -1;
    newState.timeBlockSpan = 0;

    Realm.open({schema: [CalendarSchema]}).then(r => {
      r.write(() => {
        r.create(CalendarSchemaKey, newCalendarActivity);
      });
    });

    console.debug('setState, placeActivity');
    this.setState(newState);
  }

  reportLayout(key, layout) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.layout[key] = layout;
    console.debug('setState, reportLayout');
    this.setState(newState);
  }

  activatePanActivityCard([absX, absY, x, y]) {
    // Don't need to run this function if the card is already active.
    if (this.state.showPanCard) {
      return;
    }

    // Y position of the click needs to be measured from the scroll View's (0, 0)
    const absOffsetY = absY - HEADER_HEIGHT - UNSAFE_AREA_HEIGHT;

    // Calculate abs position of click relative to scrollY
    const scrollViewX = absX;
    const scrollViewY = this.state.activityListOffsetY + absOffsetY;

    // Convert ScrollViewY to card indexes
    const cardClickedIdx = Math.floor(
      scrollViewY / (ACTIVITY_CARD_CONTENT + ACTIVITY_CARD_MARGIN_BOTTOM),
    );

    // Top of the card needs to be at the index's top of the actual screen
    const topPosition = absY - y;
    const leftPosition = absX - x;

    if (!this.state.showPanCard) {
      console.debug('setState, activatePanActivityCard');
      this.setState({
        ...this.state,
        showPanCard: true,
        draggedCard: {
          title: this.state.activityListItems[cardClickedIdx].title,
          duration: this.state.activityListItems[cardClickedIdx].duration,
          picturePath: this.state.activityListItems[cardClickedIdx].picturePath,
          label: this.state.activityListItems[cardClickedIdx].label,
          top: topPosition,
          left: leftPosition,
        },
      });
    }
  }

  resetPanActivityCard() {
    console.debug('setState, resetPanActivityCard');
    this.setState({
      showPanCard: false,
      draggedCard: {
        title: '',
        duration: 0,
        label: -1,
        picturePath: '',
        top: 0,
        left: 0,
      },
    });
  }

  handleActivityListScroll(e) {
    console.debug('setState, handleActivityListScroll');
    this.setState({activityListOffsetY: e.nativeEvent.contentOffset.y});
  }

  render() {
    const {height} = Dimensions.get('window');

    const calendarDisplayHeight =
      height - HEADER_HEIGHT - DAY_BUTTON_HEIGHT - 2 * SCREEN_PADDING;

    const divisions = 13;
    const timePadding = 8;
    const heightPerDivision =
      (calendarDisplayHeight - timePadding * 2) / divisions;

    console.debug('render, AdminPanel');

    return (
      <SafeAreaView style={styles.container}>
        <Animated.Code>
          {() => [
            cond(
              eq(this.panGestureState, State.ACTIVE),
              call([this.absoluteX, this.absoluteY], this.calculateTimeBlock),
            ),
            cond(eq(this.panGestureState, State.END), [
              set(this.panGestureState, -1),
              set(this.translationX, 0),
              set(this.translationY, 0),
              call([], this.placeActivity),
              call([], this.resetPanActivityCard),
            ]),
            cond(eq(this.longPressGestureState, State.ACTIVE), [
              call(
                [this.absoluteX, this.absoluteY, this.x, this.y],
                this.activatePanActivityCard,
              ),
            ]),
            // Hide card if someone just clicks and not drags
            cond(
              eq(this.longPressGestureState, State.END),
              call([], this.resetPanActivityCard),
            ),
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
                  <Text style={styles.monthTitleText}>
                    {monthMapping[this.month]}
                  </Text>
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
                  draggedCard={this.state.draggedCard}
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
                <ActivityList
                  onPanGestureEvent={this.onPanGestureEvent}
                  onLongPressGestureEvent={this.onLongPressGestureEvent}
                  handleScroll={this.handleActivityListScroll}
                  activityListItems={this.state.activityListItems}
                  reportLayout={this.reportLayout}
                />
              </View>
            </View>
          </View>
        </View>
        {this.state.showPanCard && (
          <Animated.View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              position: 'absolute',
              width: this.state.layout.scrollView.width,
              top: this.state.draggedCard.top,
              left: this.state.draggedCard.left,
              transform: [
                {translateX: this.translationX},
                {translateY: this.translationY},
              ],
            }}>
            <AdminActivityCard
              title={this.state.draggedCard.title}
              duration={this.state.draggedCard.duration}
              label={this.state.draggedCard.label}
              picturePath={this.state.draggedCard.picturePath}
            />
          </Animated.View>
        )}
      </SafeAreaView>
    );
  }
}

export default AdminPanel;
