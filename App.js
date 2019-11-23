import React, { useState, useEffect } from 'react';
import {
   StyleSheet, View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';
import { loadScheduleData, transformScheduleData, writeFile } from './app/helper/fileLoader';
import NowActivity from './app/components/NowActivity';
import DayActivity from './app/components/DayActivity'

export default function App() {
   // Disables the warning messages in the app
   console.disableYellowBox = true;

   const [schedule, setSchedule] = useState({});

   useEffect(() => {
      // When app first launches, load in the file data.
      loadScheduleData().then((data) => {
         transformScheduleData(data).then((transformedData) => {
            setSchedule(transformedData);
         });
      });
   }, []);

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <SafeAreaView style={styles.container}>
            <View style={styles.app}>
               <ScrollView>
                  <Clock />
                  <NowActivity />
               </ScrollView>
            </View>
         </SafeAreaView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#F4F4F4',
      height: '100%',
      width: '100%',
   },
   app: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
});