import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {Button} from 'native-base';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  interpolate,
} = Animated;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function runTiming(clock, value, config) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      // set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export default class NewActivityModal extends React.Component {
  constructor(props) {
    super(props);
    this.panY = new Value(Dimensions.get('screen').height);
  }

  componentDidMount() {
    const clock = new Clock();
    const config = {
      duration: 200,
      toValue: 50,
      easing: Easing.inOut(Easing.ease),
    };

    this.panY = runTiming(clock, this.panY, config);
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalVisible !== prevProps.modalVisible) {
      // if (this.props.modalVisible) {
      console.log('Running');
      const clock = new Clock();
      const config = {
        duration: 300,
        toValue: 30,
        easing: Easing.inOut(Easing.ease),
      };

      this.panY = runTiming(clock, this.panY, config);
      // }
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.container, {top: this.panY}]}>
            <Text>Hello World!</Text>
            <Text>Hello World!</Text>
            <Text>Hello World!</Text>
            <Text>Hello World!</Text>
            <Text>Hello World!</Text>
            <Button onPress={() => this.props.setModalVisible(false)}>
              <Text>Dismiss Modal</Text>
            </Button>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

NewActivityModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
