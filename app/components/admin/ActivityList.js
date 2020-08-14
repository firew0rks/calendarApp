import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Button} from 'react-native';
import AdminActivityCard from '../AdminActivityCard';
import Animated from 'react-native-reanimated';
import {
  PanGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import _ from 'lodash';
import ActivitySchema, {ActivitySchemaKey} from '../../database/ActivitySchema';
import realm from '../../database/realm';

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
});

export default class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    this.longPressNodes = new Map();
    this.panNodes = new Map();

    let activities = realm.objects(ActivitySchemaKey);

    activities.forEach(x => {
      this.longPressNodes.set(x.id, React.createRef());
      this.panNodes.set(x.id, React.createRef());
    });

    this.state = {
      activities: activities,
    };
  }

  _debug() {
    for (const a of this.longPressNodes) {
      console.log(a);
    }
  }

  render() {
    console.log('rendering');
    return (
      <>
        <Button onPress={() => this._debug()} title={'hello'}>
          Debug
        </Button>
        <ScrollView style={styles.scrollView}>
          {this.state.activities.map(x => {
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
                    activeOffsetY={[-100, 100]}
                    activeOffsetX={[-10, 10]}>
                    <Animated.View>
                      <AdminActivityCard
                        title={x.title}
                        duration={x.duration}
                      />
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </LongPressGestureHandler>
            );
          })}
        </ScrollView>
      </>
    );
  }
}

ActivityList.propTypes = {
  onPanGestureEvent: PropTypes.object.isRequired,
  onLongPressGestureEvent: PropTypes.object.isRequired,
};
