import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

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

  render() {
    const day = moment(new Date()).format('dddd');
    return (
      <View style={styles.tile}>
        <Text style={styles.time}>{this.props.time}</Text>
        <View>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
        </View>
      </View>
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
    justifyContent: 'center',
    backgroundColor: '#33CAFF',
    // borderRadius: 8,
    width: 600,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // marginLeft: 120,
  },
  time: {
    flex: 1,
    fontSize: 47,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: 70,
    fontFamily: 'Comfortaa-Bold',
  },
  date: {
    fontSize: 18,
    color: 'white',
    marginRight: 70,
    fontFamily: 'Comfortaa-Regular',
  },
  day: {
    fontSize: 28,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
    marginRight: 70,
    fontFamily: 'FredokaOne-Regular',
  },
});
