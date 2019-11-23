import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import Activity from './Activity'
import moment from 'moment'
import * as RNFS from 'react-native-fs';
import NavBar from './NavBar';
import { ScrollView } from 'react-native-gesture-handler';
import Clock from './Clock'


export default function NowActivity(props) {

   const [time, setTime] = useState(moment().format('h:mm a'));
   const [date, setDate] = useState(moment().format('ddd, MMMM Do YYYY'));


   const { schedule } = props.screenProps;
   const today = moment().format('1/12/19')
   const currentTime = moment().format('1300')
   const [nowImage, setNowImage] = useState('')
   const [nextImage, setNextImage] = useState('')
   const SCHEDULE_PATH = RNFS.DocumentDirectoryPath;
   const scheduleForToday = schedule[today]

   console.log('--------------------', props.screenProps)
   let nextActivity;
   let nowActivity;
   let endOfSchedule = false;

   console.log("SCHEDULE FOR TODAY---------------------")
   console.log(scheduleForToday)

   const index = scheduleForToday.findIndex(x => {
      const start = Number(x.startTime);
      const end = Number(x.endTime);

      return start <= currentTime && end >= currentTime
   })
   console.log('----------------INDEX----------------------')
   console.log(index)

   try {
      nowActivity = scheduleForToday[index].activity1.toLowerCase()
      if (index + 1 < scheduleForToday.length - 1) {
         nextActivity = scheduleForToday[index + 1].activity1.toLowerCase()
      }
      else {
         const today = moment().add(1, 'days').format('DD/MM/YY')
         nextActivity = schedule[today][0].activity1
      }
   }
   catch {
      nowActivity = scheduleForToday[scheduleForToday.length - 1].activity1.toLowerCase()
      console.log('I am running')
      endOfSchedule = true
   }
   // try {
   //     RNFS.readFile(SCHEDULE_PATH + "/photos/" + nowActivity + ".png", 'base64').then(contents => { setNowImage(contents) })
   //     RNFS.readFile(SCHEDULE_PATH + "/photos/" + nextActivity + ".png", 'base64').then(contents => { setNextImage(contents) })
   // }
   // catch (error) {
   //     console.log(error)
   // }

   try {
      RNFS.readFile(SCHEDULE_PATH + "/photos/" + nowActivity + ".jpg", 'base64').then(contents => { setNowImage(contents) })
      RNFS.readFile(SCHEDULE_PATH + "/photos/" + nextActivity + ".jpg", 'base64').then(contents => { setNextImage(contents) })
   }
   catch (error) {
      console.log(error)
   }

   console.log(currentTime)
   return (
      <View style={styles.app}>
         <NavBar props={props} goToDayPage={true} />
         <ScrollView>
            <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
            <Activity
               ActivityStyle={styles.nowActivity}
               ImageStyle={styles.nowImage}
               moments={'NOW'}
               textActivity={nowActivity}
               imagePath={nowImage} />
            {!endOfSchedule && <Activity
               ActivityStyle={styles.nextActivity}
               ImageStyle={styles.nextImage}
               moments={"NEXT"}
               textActivity={nextActivity}
               imagePath={nextImage} />}
         </ScrollView>

      </View>
   )
}

const styles = StyleSheet.create({
   app: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   nowActivity: {
      backgroundColor: '#CDF07E',
      width: Dimensions.get("window").width - 100,
      resizeMode: 'contain',
   },
   nextActivity: {
      backgroundColor: '#F07E7E',
      width: Dimensions.get("window").width - 300,
   },
   nowImage:
   {
      height: Dimensions.get("window").height / 4,
   },
   nextImage:
   {
      height: Dimensions.get("window").height / 5,
   }
});