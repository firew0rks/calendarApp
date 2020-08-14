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
  TextInput,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {Button, Icon} from 'native-base';
// import Realm from 'realm';
import ActivitySchema, {ActivitySchemaKey} from '../../database/ActivitySchema';
import realm from '../../database/realm';
import {v4 as uuidv4} from 'uuid';

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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    top: 0,
  },
  container: {
    flex: 1,
    padding: 24,
    top: 60,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 16,
  },
  modalHeader: {alignItems: 'flex-end'},
  cancelText: {
    color: 'rgb(0, 99, 255)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  newActivityTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  photoSelectionButton: {
    backgroundColor: 'rgb(231, 241, 255)',
  },
  photoSelectIcon: {
    color: 'rgb(0, 99, 255)',
  },
  divider: {
    flexDirection: 'row',
    borderTopColor: 'rgb(241, 241, 241)',
    height: 1,
    borderTopWidth: 1,
  },
  durationSelectionContainer: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgb(37, 38, 41)',
  },
  formSpacing: {paddingVertical: 16},
});

function Divider() {
  return <View style={styles.divider} />;
}

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

    this.handleSave = this.handleSave.bind(this);

    this.panY = new Value(Dimensions.get('screen').height);

    this.state = {
      title: '',
      label: 0,
      duration: 30,
      majorEvent: false,
    };
  }

  // componentDidMount() {
  //   const clock = new Clock();
  //   const config = {
  //     duration: 200,
  //     toValue: 50,
  //     easing: Easing.inOut(Easing.ease),
  //   };

  //   this.panY = runTiming(clock, this.panY, config);
  // }

  handleSave() {
    try {
      realm.write(() => {
        realm.create(ActivitySchemaKey, {
          id: uuidv4(),
          label: this.state.label,
          duration: this.state.duration,
          title: this.state.title,
          majorEvent: this.state.majorEvent,
        });
        console.log('Saved');
        this.props.setModalVisible(false);
      });
    } catch (err) {
      console.log(err);
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
          <View style={styles.container}>
            <View style={styles.modalHeader}>
              <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => this.props.setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.newActivityTitleContainer}>
              <TextInput
                onChangeText={text => this.setState({title: text})}
                value={this.state.title}
                autoFocus
                placeholder="Activity Name"
                placeholderTextColor="rgb(128, 128, 128)"
                style={{fontSize: 36}}
              />
              <Button style={styles.photoSelectionButton}>
                <Icon
                  type="Ionicons"
                  name="camera"
                  style={styles.photoSelectIcon}
                />
              </Button>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <Text style={styles.labelText}>Duration</Text>
            </View>
            <View style={styles.durationSelectionContainer}>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  30 mins
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  1 hr
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  2 hrs
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  3 hrs
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 2,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  Custom
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(231, 241, 255)',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 2,
                    color: 'rgb(0, 99, 255)',
                    fontWeight: 'bold',
                  }}>
                  All Day
                </Text>
              </Button>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <Text style={styles.labelText}>Label</Text>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <Text style={styles.labelText}>Major Event</Text>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <Text style={styles.labelText}>Reminders</Text>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <Text style={styles.labelText}>Sub activities</Text>
            </View>
            <Divider />
            <View style={[styles.formSpacing, {alignItems: 'flex-end'}]}>
              <Button
                style={{width: 120, backgroundColor: 'rgb(0, 99, 255)'}}
                onPress={this.handleSave}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  Save
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

NewActivityModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
