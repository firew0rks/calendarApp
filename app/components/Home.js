import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import Activity from './Activity'
import Clock from './Clock'


class Home extends Component {


   render() {
      return (
         <ScrollView >
            <Clock style={styles.container}/>
            <View>
               <Activity />
               <Activity />
               <Activity />
            </View>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'violet',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default Home