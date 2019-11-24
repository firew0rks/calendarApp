import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import moment from 'moment';
import Tts from 'react-native-tts';

class Clock extends Component {
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.props.setTime(moment().format('h:mm a'));
    this.props.setDate(moment().format('DD MMMM YYYY'));
  }

  speak = () => {
    Tts.speak(`The time is ${this.props.time}`);
  };

  render() {
    const day = moment(new Date()).format('dddd');
    return (
      <TouchableWithoutFeedback onPress={this.speak}>
        <View style={styles.tile}>
          <Text style={styles.time}>{this.props.time}</Text>
          <View>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.date}>{this.props.date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Clock;

const styles = StyleSheet.create({
  tile: {
    padding: 3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#33CAFF',
    width: 600,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    // marginBottom: 20,
  },
  time: {
    flex: 1,
    fontSize: 47,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: 50,
    fontFamily: 'Comfortaa-Bold',
  },
  date: {
    fontSize: 18,
    color: 'white',
    marginRight: 50,
    fontFamily: 'Comfortaa-Regular',
  },
  day: {
    fontSize: 28,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
    marginRight: 50,
    fontFamily: 'FredokaOne-Regular',
  },
});
