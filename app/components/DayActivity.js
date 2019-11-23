import NavBar from './NavBar'
import Activity from './Activity'
import {
  StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions } from "react-native";
import moment from 'moment';
import Clock from './Clock';

export default function DayScreen(props) {

  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('ddd, MMMM Do YYYY '));

  return (
    <View style={styles.app}>
       <SafeAreaView>
       <ScrollView>
       <NavBar style={{ flex: 1 }} props={props} goToDayPage={false}/>
       <Clock
         time={time}
         setTime={setTime}
         date={date}
         setDate={setDate}
       />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('8:15') + "AM"} />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('8:30') + "AM"} />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('9:00') + "AM"} />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('9:30') + "AM"} />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('10:00') + "AM"} />
               <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('11:15') + "AM"} />
         </ScrollView>
      </SafeAreaView>
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    ActivityStyle: {
        backgroundColor: '#CDF07E',
        width: Dimensions.get("window").width - 400,
        borderRadius: 30,
        padding: 20,
    },
    ImageStyle: {
        height: Dimensions.get("window").height / 3,
    },
    TimeStyle: {
        color: '#393939',
        fontSize: 30
    }
});
