import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
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
    this.props.setDate(moment().format('ddd, MMMM Do YYYY '));
  }

  render() {
    return (
      <View style={styles.clock}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            size={30}
            name="clockcircleo"
            color="red"
            type="antdesign"
            onPress={() => {
              Tts.speak(`The time is ${this.props.time}`);
            }}
          />
          <Text style={styles.time}>{this.props.time}</Text>
        </View>

        <Text style={styles.date}>{this.props.date}</Text>
        <StatusBar>backgroundColor="blue"</StatusBar>
      </View>
    );
  }
}

export default Clock;

const styles = StyleSheet.create({
  clock: {
    flex: 1,
  },
  time: {
    flex: 1,
    fontSize: 25,
    color: '#F04A64',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: '#F04A64',
  },
});
