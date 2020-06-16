import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    padding: 10,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
  },
  activeButton: {
    backgroundColor: '#33CAFF',
    padding: 20,
    fontWeight: 'bold',
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 35,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
  },
  activeButtonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
  },
  inactiveButtonText: {
    fontWeight: 'bold',
    color: '#C3C3C3',
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
  },
  activePauseButtonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
    transform: [{rotate: '90deg'}],
  },
  inactivePauseButtonText: {
    fontWeight: 'bold',
    color: '#C3C3C3',
    fontSize: 20,
    transform: [{rotate: '90deg'}],
  },
  buttonIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function NavBar(props) {
  const {state, replace} = props;
  const {routeName} = state;

  function navigateFunction() {
    switch (routeName) {
      case 'Now': {
        return replace('Day');
      }
      case 'Day': {
        return replace('Now');
      }
    }
  }

  return (
    <View style={styles.view}>
      <Button
        style={[
          routeName === 'Now' ? styles.activeButton : styles.inactiveButton,
        ]}
        disabled={routeName === 'Now'}
        onPress={navigateFunction}>
        <View style={styles.buttonIconText}>
          <Icon
            name="pause"
            style={
              routeName === 'Now'
                ? styles.activePauseButtonText
                : styles.inactivePauseButtonText
            }
          />
          <Text
            style={
              routeName === 'Now'
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }>
            NOW
          </Text>
        </View>
      </Button>
      <Button
        style={[
          routeName === 'Day' ? styles.activeButton : styles.inactiveButton,
        ]}
        disabled={routeName === 'Day'}
        onPress={navigateFunction}>
        <View style={styles.buttonIconText}>
          <Icon
            name="align-justify"
            style={
              routeName === 'Day'
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          />
          <Text
            style={
              routeName === 'Day'
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }>
            DAY
          </Text>
        </View>
      </Button>
    </View>
  );
}

// Navigation should be passed in from reactnavigation.
NavBar.propTypes = {
  navigation: PropTypes.func.isRequired,
  state: PropTypes.objectOf({
    routeName: PropTypes.string.isRequired,
  }).isRequired,
};
