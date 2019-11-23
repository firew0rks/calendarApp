import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

export default class NavBar extends React.Component {

  navigateFunction(props, goToDayPage) {
    if (goToDayPage === true){
      props.navigation.replace('Day');
    }
    else if (goToDayPage === false) {
      props.navigation.replace('Now');
    }
  }

  render() {
    console.log('++++', this.props.goToDayPage)
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
          style={[this.props.goToDayPage ? styles.nowButton : styles.dayButton]}
          disabled = {this.props.goToDayPage}
          onPress={() => this.navigateFunction(this.props.props, this.props.goToDayPage)}
        >
          <Text style={ styles.nowButtonText }>
            Now
          </Text>
        </Button>
        <Button
          style={[this.props.goToDayPage ? styles.dayButton : styles.nowButton]}
          disabled = {!this.props.goToDayPage}
          onPress={() => this.navigateFunction(this.props.props, this.props.goToDayPage)}
        >
          <Text style={ styles.dayButtonText }>
            Day
          </Text>
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
      fontSize: 35,
   },
   dayButton: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      fontWeight: 'bold',
      fontSize: 35,
   },
   dayButtonText: {
     color: '#A9A9A9',
     fontWeight: 'bold',
   },
   nowButtonText: {
     color: '#A9A9A9',
     fontWeight: 'bold',
   }
});
