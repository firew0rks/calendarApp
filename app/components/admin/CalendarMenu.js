import React, {useState, useEffect, useRef} from 'react';
import {Alert, View, StyleSheet, Dimensions} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Button, Text, Icon} from 'native-base';
import moment from 'moment';

const styles = StyleSheet.create({
  settingsButton: {
    backgroundColor: 'rgb(231, 241, 255)',
  },
  settingsButtonIcon: {
    color: 'rgb(0, 99, 255)',
  },
  textColor: {
    color: 'rgb(0, 99, 255)',
    fontWeight: 'bold',
  },
});

const dayButtonStyles = StyleSheet.create({
  currentButton: {
    width: 54,
    height: 44,
    backgroundColor: 'rgb(241, 241, 241)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  text: {
    color: 'rgb(41, 41, 41)',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

function DayButton(props) {
  const {dateMoment, dateViewing, handleDateChange} = props;

  let dayStyle = dayButtonStyles.currentButton;
  let textStyle = dayButtonStyles.text;

  // Styling other month's dates
  if (dateMoment.clone().month() !== moment(dateViewing).month()) {
    dayStyle = {
      ...dayStyle,
      backgroundColor: 'rgb(255, 255, 255)',
    };
    textStyle = {
      ...textStyle,
      color: 'rgb(128, 128, 128)',
    };
  }

  // Styling selected date
  if (
    dateMoment.clone().format('YY MM DD') ===
    moment(dateViewing).format('YY MM DD')
  ) {
    dayStyle = {
      ...dayStyle,
      backgroundColor: 'rgb(0, 99, 255)',
    };

    textStyle = {
      ...textStyle,
      color: 'rgb(240, 240, 240)',
    };
  }

  return (
    <TouchableNativeFeedback onPress={() => handleDateChange(dateMoment)}>
      <View style={dayStyle}>
        <Text style={textStyle}>{dateMoment.clone().date()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function CalendarMenu(props) {
  const {dateViewing, handleDateChange, showCalendar} = props;
  const [dates, setDates] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const startOfCalendarMonth = moment(dateViewing)
      .startOf('month')
      .startOf('week');

    const endOfCalendarMonth = moment(dateViewing)
      .endOf('month')
      .endOf('week');

    const numberOfDays = endOfCalendarMonth
      .clone()
      .diff(startOfCalendarMonth, 'days', true);

    // Number of days comes out as a decimal number.
    const d = [];
    for (let i = 0; i < Math.round(numberOfDays); i++) {
      d.push(startOfCalendarMonth.clone().add(i, 'days'));
    }

    setDates(d);
  }, [dateViewing]);

  if (!showCalendar) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        width: 452,
        left: -140,
        top: 60,
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        borderWidth: 1,
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        paddingVertical: 24,
        paddingHorizontal: 22,
      }}>
      <View
        style={{
          height: 16,
          width: 16,
          position: 'absolute',
          top: -8,
          left: 232,
          transform: [{rotate: '45deg'}],
          backgroundColor: 'white',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderWidth: 1,
          borderStyle: 'solid',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 23,
          height: 15,
          left: 228,
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 2,
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <Text style={{fontSize: 21, fontWeight: 'bold'}}>
          {moment(dateViewing).format('MMMM YYYY')}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button
            style={[styles.settingsButton, {marginRight: 4}]}
            onPress={() => handleDateChange(moment())}>
            <Text style={styles.textColor}>Today</Text>
          </Button>
          <Button
            style={[styles.settingsButton, {marginRight: 4}]}
            onPress={() =>
              handleDateChange(moment(dateViewing).subtract(1, 'months'), true)
            }>
            <Icon
              type="AntDesign"
              name="arrowleft"
              style={styles.settingsButtonIcon}
            />
          </Button>
          <Button
            style={styles.settingsButton}
            onPress={() =>
              handleDateChange(moment(dateViewing).add(1, 'months'), true)
            }>
            <Icon
              type="AntDesign"
              name="arrowright"
              style={styles.settingsButtonIcon}
            />
          </Button>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {dates.map((x, i) => {
          return (
            <DayButton
              key={i}
              dateMoment={x}
              dateViewing={dateViewing}
              handleDateChange={handleDateChange}
            />
          );
        })}
      </View>
    </View>
  );
}

export default CalendarMenu;
