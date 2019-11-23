import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

export default class NavBar extends React.Component {

  navigateToDay(props) {
    props.navigation.navigate('Day');
  }

  navigateToNow(props) {
    props.navigation.navigate('Now');
  }

  render() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: width,
        padding: 10,
        backgroundColor: '#f1f1f1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }
        }}>
        <Button
          title="Go to Day"
          disabled={!this.props.goToDayPage}
          onPress={() => this.navigateToDay(this.props.props)}
        >
          <Text>
            Now
          </Text>
        </Button>
        <Button
          title="Go to Now"
          disabled={this.props.goToDayPage}
          onPress={() => this.navigateToNow(this.props.props)}
        >
          <Text>
            Day
          </Text>
        </Button>
      </View>
    );
  }
}
