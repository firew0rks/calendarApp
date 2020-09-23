import React from 'react';
import moment from 'moment';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

export default function DayButton(props) {
  const d = moment(props.date);

  return (
    <TouchableNativeFeedback onPress={() => props.handleDateChange(d)}>
      <View
        style={
          props.selected
            ? dayButtonStyles.dayButtonWrapperSelected
            : dayButtonStyles.dayButtonWrapper
        }>
        <Text
          style={
            props.selected
              ? dayButtonStyles.dayOfTheWeekTextSelected
              : dayButtonStyles.dayOfTheWeekText
          }>
          {props.dayOfTheWeek}
        </Text>
        <Text style={dayButtonStyles.dayText}>{d.date()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const dayButtonStyles = StyleSheet.create({
  dayButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dayButtonWrapperSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgb(241, 241, 241)',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  dayOfTheWeekText: {
    fontSize: 17,
    lineHeight: 24,
    color: 'rgb(0, 99, 255)',
    fontWeight: 'bold',
  },
  dayOfTheWeekTextSelected: {
    fontSize: 17,
    lineHeight: 24,
    color: 'rgb(37, 38, 41)',
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgb(128, 128, 128)',
  },
});
