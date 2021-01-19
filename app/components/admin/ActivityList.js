import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Button,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AdminActivityCard from '../AdminActivityCard';
import Animated from 'react-native-reanimated';
import {
  PanGestureHandler,
  LongPressGestureHandler,
  TapGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import _ from 'lodash';
import ActivitySchema, {ActivitySchemaKey} from '../../database/ActivitySchema';
// import realm from '../../database/realm';
import DatabaseHelper from '../sqlite';

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
});

export default class ActivityList extends React.Component {
  state = {
    showTooltip: [],
  };

  constructor(props) {
    super(props);
    this.longPressNodes = new Map();
    this.panNodes = new Map();
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Quick check to see whether they're the same.
    if (
      JSON.stringify(this.props.activityListItems) !==
      JSON.stringify(nextProps.activityListItems)
    ) {
      // Figure out which entries are new.
      const itemIds = this.props.activityListItems.map(x => x.id);
      const newItems = nextProps.activityListItems.filter(
        x => !itemIds.includes(x.id),
      );

      if (newItems.length > 0) {
        this.refreshActivityList(newItems);
      }
    }

    return true;
  }

  refreshActivityList(newItems) {
    newItems.forEach(item => {
      this.longPressNodes.set(item.id, React.createRef());
      this.panNodes.set(item.id, React.createRef());
    });

    console.log('refreshed', this.longPressNodes, this.panNodes);
  }

  toggleTooltip(index) {
    const a = this.state.showTooltip.slice(0);

    if (a[index] === undefined || a[index] === false) {
      a[index] = true;
    } else if (a[index] === true) {
      a[index] = false;
    }

    this.setState({
      showTooltip: a,
    });
  }

  hideTooltip(ev) {
    console.log('heree', ev.nativeEvent, this.state.showTooltip.length);
    if (ev.nativeEvent.oldState === 4 && ev.nativeEvent.state === 5) {
      this.setState({
        showTooltip: [],
      });
    }
  }

  render() {
    return (
      <View style={{height: 700}}>
        <TapGestureHandler
          onHandlerStateChange={this.hideTooltip}
          enabled={this.state.showTooltip.length > 0}>
          <ScrollView
            scrollEventThrottle={16}
            style={styles.scrollView}
            onScroll={this.props.handleScroll}
            onLayout={e =>
              this.props.reportLayout('scrollView', e.nativeEvent.layout)
            }>
            {this.props.activityListItems.map((x, i) => {
              return (
                <LongPressGestureHandler
                  key={x.id}
                  ref={this.longPressNodes.get(x.id)}
                  simultaneousHandlers={this.panNodes.get(x.id)}
                  onGestureEvent={this.props.onLongPressGestureEvent}
                  onHandlerStateChange={this.props.onLongPressGestureEvent}>
                  <Animated.View>
                    <PanGestureHandler
                      ref={this.panNodes.get(x.id)}
                      simultaneousHandlers={this.longPressNodes.get(x.id)}
                      onGestureEvent={this.props.onPanGestureEvent}
                      onHandlerStateChange={this.props.onPanGestureEvent}
                      activeOffsetY={[-50, 50]}
                      activeOffsetX={[-5, 5]}>
                      <Animated.View>
                        <AdminActivityCard
                          title={x.title}
                          duration={x.duration}
                          picturePath={x.picturePath}
                          label={x.label}
                          showTooltip={this.state.showTooltip[i]}
                          toggleTooltip={() => this.toggleTooltip(i)}
                          handlePressEdit={this.props.handlePressEdit}
                          handlePressDelete={() => {
                            this.props.handlePressDelete(x.id);
                          }}
                        />
                      </Animated.View>
                    </PanGestureHandler>
                  </Animated.View>
                </LongPressGestureHandler>
              );
            })}
          </ScrollView>
        </TapGestureHandler>
      </View>
    );
  }
}

ActivityList.propTypes = {
  onPanGestureEvent: PropTypes.object.isRequired,
  onLongPressGestureEvent: PropTypes.object.isRequired,
  handleScroll: PropTypes.func.isRequired,
  reportLayout: PropTypes.func.isRequired,
  activityListItems: PropTypes.array.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressEdit: PropTypes.func.isRequired,
};
