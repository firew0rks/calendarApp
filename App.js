import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   ScrollView
} from 'react-native';

import Clock from './app/components/Clock'
import NowActivity from './app/components/NowActivity'
import DayActivity from './app/components/DayActivity';
import CountdownCircle from 'react-native-countdown-circle'
import CircleTimer from 'react-native-circle-timer';

export default class App extends Component {

   render() {

      return (

         <CircleTimer
            radius={80}
            borderWidth={10}
            seconds={500}
            borderColor={'#F5F5F5'}
            borderBackgroundColor={"#FF0000"}
            onTimeElapsed={() => {
               console.log('Timer Finished!');
            }}
            showSecond={true}
         />


         // <View style={styles.app}>
         //    <ScrollView >
         //       <Clock />
         //       {/* <NowActivity /> */}
         //       <DayActivity />
         //    </ScrollView>
         // </View>
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
