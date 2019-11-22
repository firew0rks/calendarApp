import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PresentationalComponent from './app/components/PresentationalComponent'
import Clock from './app/components/Clock'
import Activity from './app/components/Activity'

export default class App extends Component {

   render() {
      return (
         <View style={styles.app}>
            <ScrollView >
               <Clock />
               <Activity />
            </ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   app: {
      backgroundColor: '#F4F4F4',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
});
