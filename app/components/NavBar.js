import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var width = Dimensions.get('window').width; //full width

export default class NavBar extends React.Component {
  navigateFunction(props, goToDayPage) {
    if (goToDayPage === true) {
      props.navigation.replace('Day');
    } else if (goToDayPage === false) {
      props.navigation.replace('Now');
    }
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          width: width,
          padding: 10,
          backgroundColor: '#f1f1f1',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
        }}>
        <Button
          style={[this.props.goToDayPage ? styles.nowButton : styles.dayButton]}
          disabled={this.props.goToDayPage}
          onPress={() =>
            this.navigateFunction(this.props.props, this.props.goToDayPage)
          }>
          <View style={styles.buttonIconText}>
            <Icon
              name="pause"
              style={
                this.props.goToDayPage
                  ? styles.activePauseButtonText
                  : styles.inactivePauseButtonText
              }
            />
            <Text
              style={
                this.props.goToDayPage
                  ? styles.activeButtonText
                  : styles.inactiveButtonText
              }>
              NOW
            </Text>
          </View>
        </Button>
        <Button
          style={[this.props.goToDayPage ? styles.dayButton : styles.nowButton]}
          disabled={!this.props.goToDayPage}
          onPress={() =>
            this.navigateFunction(this.props.props, this.props.goToDayPage)
          }>
          <View style={styles.buttonIconText}>
            <Icon
              name="align-justify"
              style={
                this.props.goToDayPage
                  ? styles.inactiveButtonText
                  : styles.activeButtonText
              }
            />
            <Text
              style={
                this.props.goToDayPage
                  ? styles.inactiveButtonText
                  : styles.activeButtonText
              }>
              DAY
            </Text>
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nowButton: {
    backgroundColor: '#33CAFF',
    padding: 20,
    fontWeight: 'bold',
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
  },
  dayButton: {
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
