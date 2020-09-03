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
  TouchableOpacity,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {Button, Icon, Switch, Input} from 'native-base';
// import Realm from 'realm';
import ActivitySchema, {ActivitySchemaKey} from '../../database/ActivitySchema';
import realm from '../../database/realm';
import {v4 as uuidv4} from 'uuid';
import ImagePicker from 'react-native-image-picker';
import {labels} from '../../constants';
import {randomString} from '../../helper/random';

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

const DURATIONS = [
  {duration: 30, buttonLabel: '30 mins'},
  {duration: 60, buttonLabel: '1 hr'},
  {duration: 120, buttonLabel: '2 hrs'},
  {duration: 180, buttonLabel: '3 hrs'},
  {duration: -1, buttonLabel: 'Custom'},
  {duration: 720, buttonLabel: 'All Day'},
];

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
    // marginBottom: 16,
  },
  formSpacing: {paddingVertical: 16},
  durationButtonUnselected: {
    flex: 1,
    backgroundColor: 'rgb(231, 241, 255)',
    marginRight: 4,
  },
  durationButtonTextUnselected: {
    textAlign: 'center',
    flex: 1,
    color: 'rgb(0, 99, 255)',
    fontWeight: 'bold',
    fontSize: 17,
  },
  durationButtonSelected: {
    flex: 1,
    backgroundColor: 'rgb(0, 99, 255)',
    marginRight: 4,
  },
  durationButtonTextSelected: {
    textAlign: 'center',
    flex: 1,
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 17,
  },
  labelCircles: {
    flexDirection: 'row',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelOuterCircle: {
    borderRadius: 32,
    width: 32,
    height: 32,
    marginLeft: 16,
  },
  subActivityText: {
    color: 'rgb(0, 99, 255)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteSubactivityIcon: {
    color: 'rgb(241, 49, 83)',
  },
  focusReminder: {
    fontSize: 17,
    borderColor: 'rgb(0, 99, 255)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    height: 96,
    paddingTop: 12,
  },
  blurReminder: {
    fontSize: 17,
    borderRadius: 8,
    padding: 13,
    textAlignVertical: 'top',
    height: 96,
    paddingTop: 13,
    backgroundColor: 'rgb(241, 241, 241)',
  },
  focusSubactivities: {
    fontSize: 21,
    borderRadius: 8,
    borderColor: 'rgb(0, 99, 255)',
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    height: '100%',
    padding: 8,
    paddingLeft: 12,
    marginRight: 4,
  },
  blurSubactivites: {
    fontSize: 21,
    borderRadius: 8,
    flex: 1,
    height: '100%',
    padding: 9,
    paddingLeft: 13,
    marginRight: 4,
    backgroundColor: 'rgb(241, 241, 241)',
  },
});

const defaultState = {
  title: '',
  label: 0,
  picturePath: '',
  durationSelected: 30,
  majorEvent: false,
  reminders: '',
  showReminders: false,
  subactivities: [],
  focusIndex: -3, // -3 means nothing is focused.
  errorMessage: '',
};

function Divider() {
  return <View style={styles.divider} />;
}

export default class NewActivityModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);

    this.panY = new Value(Dimensions.get('screen').height);

    this.state = {...defaultState};
  }

  closeModal() {
    this.setState({...defaultState});
    this.props.setModalVisible(false);
  }

  handleSave() {
    try {
      realm.write(() => {
        realm.create(ActivitySchemaKey, {
          id: randomString(),
          label: this.state.label,
          duration: this.state.durationSelected,
          title: this.state.title,
          majorEvent: this.state.majorEvent,
          picturePath: this.state.picturePath,
          subactivities: this.state.subactivities,
          reminders: this.state.reminders,
        });

        this.closeModal();
      });
    } catch (err) {
      console.warn(err);
      this.setState({
        errorMessage: err,
      });
    }
  }

  handleDurationSelection(durationSelected) {
    this.setState({
      durationSelected,
    });
  }

  showImagePicker() {
    ImagePicker.launchImageLibrary({noData: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          picturePath: response.uri,
        });
      }
    });
  }

  addSubactivity() {
    const subactivitiesClone = this.state.subactivities.slice(0);
    subactivitiesClone.push('');

    this.setState({
      subactivities: subactivitiesClone,
    });
  }

  removeSubactivity(idx) {
    const subactivitiesClone = this.state.subactivities.slice(0);
    subactivitiesClone.splice(idx, 1);

    this.setState({
      subactivities: subactivitiesClone,
    });
  }

  updateSubactivity(idx, value) {
    const subactivitiesClone = this.state.subactivities.slice(0);
    subactivitiesClone[idx] = value;

    this.setState({
      subactivities: subactivitiesClone,
    });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.modalHeader}>
              <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => this.closeModal()}>
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
              <Button
                style={styles.photoSelectionButton}
                onPress={() => this.showImagePicker()}>
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
              <View style={styles.durationSelectionContainer}>
                {DURATIONS.map(x => {
                  const selected = this.state.durationSelected === x.duration;

                  return (
                    <Button
                      key={x.duration}
                      onPress={() => this.handleDurationSelection(x.duration)}
                      style={
                        selected
                          ? styles.durationButtonSelected
                          : styles.durationButtonUnselected
                      }>
                      <Text
                        style={
                          selected
                            ? styles.durationButtonTextSelected
                            : styles.durationButtonTextUnselected
                        }>
                        {x.buttonLabel}
                      </Text>
                    </Button>
                  );
                })}
              </View>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.labelText}>Label</Text>
                <View style={styles.labelCircles}>
                  {labels.map((x, i) => {
                    const circleStyle = {
                      ...styles.labelOuterCircle,
                      backgroundColor: x.color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    };

                    const selectedLabel = this.state.label === i;

                    return (
                      <TouchableOpacity
                        key={i}
                        style={circleStyle}
                        onPress={() => this.setState({label: i})}>
                        {selectedLabel && (
                          <View
                            style={{
                              backgroundColor: 'rgb(255, 255, 255)',
                              borderRadius: 12,
                              height: 12,
                              width: 12,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.labelText}>Major Event</Text>
                <Switch
                  value={this.state.majorEvent}
                  onValueChange={value => this.setState({majorEvent: value})}
                />
              </View>
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.labelText}>Reminders</Text>
                <Switch
                  value={this.state.showReminders}
                  onValueChange={value => this.setState({showReminders: value})}
                />
              </View>
              {this.state.showReminders && (
                <View
                  style={{
                    marginTop: 16,
                  }}>
                  <TextInput
                    onChangeText={text => this.setState({reminders: text})}
                    value={this.state.reminders}
                    autoFocus
                    onFocus={() => this.setState({focusIndex: -2})}
                    multiline={true}
                    numberOfLines={2}
                    style={
                      this.state.focusIndex === -2
                        ? styles.focusReminder
                        : styles.blurReminder
                    }
                    placeholder="Reminders for previous day eg: pack bathers, bring spare shoes…"
                  />
                </View>
              )}
            </View>
            <Divider />
            <View style={styles.formSpacing}>
              <View style={[styles.rowSpaceBetween, {marginBottom: 16}]}>
                <Text style={styles.labelText}>Sub activities</Text>
                <TouchableOpacity onPress={() => this.addSubactivity()}>
                  <Text style={styles.subActivityText}>Sub activity +</Text>
                </TouchableOpacity>
              </View>
              {this.state.subactivities.map((x, i) => {
                const isLast = i === this.state.subactivities.length - 1;

                let subactivityRowStyle = styles.rowSpaceBetween;

                if (!isLast) {
                  subactivityRowStyle = {
                    ...subactivityRowStyle,
                    marginBottom: 4,
                  };
                }

                return (
                  <View style={subactivityRowStyle} key={i}>
                    <TextInput
                      value={x}
                      onChangeText={value => this.updateSubactivity(i, value)}
                      placeholder="Sub activity name"
                      onFocus={() => this.setState({focusIndex: i})}
                      style={
                        this.state.focusIndex === i
                          ? styles.focusSubactivities
                          : styles.blurSubactivites
                      }
                    />
                    <Button
                      style={{backgroundColor: 'rgb(255, 255, 255)'}}
                      onPress={() => this.removeSubactivity(i)}>
                      <Icon
                        type="AntDesign"
                        name="delete"
                        style={styles.deleteSubactivityIcon}
                      />
                    </Button>
                  </View>
                );
              })}
            </View>
            <Divider />
            {this.state.errorMessage !== '' && (
              <Text>{this.state.errorMessage}</Text>
            )}
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
