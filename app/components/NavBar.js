import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

export default class NavBar extends React.Component {

  navigateToDay(props) {
    props.navigation.replace('Day');
  }

  navigateToNow(props) {
    props.navigation.replace('Now');
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
          disabled={this.props.goToDayPage}
          onPress={() => this.navigateToNow(this.props.props)}
        >
          <Text>
            Now
          </Text>
        </Button>
        <Button
          disabled={!this.props.goToDayPage}
          onPress={() => this.navigateToDay(this.props.props)}
        >
          <Text>
            Day
          </Text>
        </Button>
      </View>
    );
  }
}
