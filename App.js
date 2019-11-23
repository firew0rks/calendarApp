import React, { useState, useEffect } from 'react';
import {
   StyleSheet, View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';
import { loadScheduleData, transformScheduleData, writeFile } from './app/helper/fileLoader';

export default function App() {
   // Disables the warning messages in the app
   console.disableYellowBox = true;

   const [schedule, setSchedule] = useState({});

   useEffect(() => {
      writeFile();
      // When app first launches, load in the file data.
      loadScheduleData().then((data) => {
         const transformedData = transformScheduleData(data);
         setSchedule(transformedData);
      });
   }, []);

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <SafeAreaView style={styles.container}>
            <View style={styles.app}>
               <ScrollView>
                  <Clock />
                  <Activity />
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