import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Activity from './Activity';
import moment from 'moment';
import * as RNFS from 'react-native-fs';
import NavBar from './NavBar';
import {ScrollView} from 'react-native-gesture-handler';
import Clock from './Clock';
import {findCurrentTaskIndex} from '../helper/schedule';
import {getImage} from '../helper/fileLoader';
import isEmpty from 'lodash/isEmpty';

export default function NowActivity(props) {
  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('DD MMMM YYYY'));

   const { schedule } = props.screenProps;
   let today = moment().format('D/M/YY');
   const [nowImage, setNowImage] = useState('');
   const [nowImage_2, setNowImage_2] = useState('');
   const [nextImage, setNextImage] = useState('');
   const [nextImage_2, setNextImage_2] = useState('');
   const [taskSelected, setTaskSelected] = useState(0);
   const SCHEDULE_PATH = RNFS.DocumentDirectoryPath;
   const scheduleForToday = schedule[today];

   let nextActivity;
   let nowActivity;
   let nextActivity_2 = "";
   let nowActivity_2 = "";
   let endOfSchedule = false;

   if (!isEmpty(scheduleForToday)) {
      try {
         const index = findCurrentTaskIndex(scheduleForToday);
         nowActivity = scheduleForToday[index].activity1.toLowerCase();
         if (scheduleForToday[index].activity2 != "") {
           nowActivity_2 = scheduleForToday[index].activity2.toLowerCase();
         }
         if (index + 1 < scheduleForToday.length - 1) {
            nextActivity = scheduleForToday[index + 1].activity1.toLowerCase();
         } else {
            const tomorrow = moment()
               .add(1, 'days')
               .format('DD/MM/YY');
            nowActivity = scheduleForToday[
               scheduleForToday.length - 1].activity1.toLowerCase();

            try {
               nextActivity = schedule[tomorrow][0].activity1;
            } catch (error) {
               endOfSchedule = true;
               console.log('End of schedule')
            }
         }
         // Load photos
         getImage(nowActivity).then(contents => setNowImage(contents));
         getImage(nowActivity_2).then(contents => setNowImage_2(contents));
         getImage(nextActivity).then(contents => setNextImage(contents));

      } catch (error) {
         console.log('There are no more activities, please upload new CSV with new dates and activities');
      }
      // Load photos
      getImage(nowActivity.toLowerCase()).then(contents =>
        setNowImage(contents),
      );
      getImage(nextActivity.toLowerCase()).then(contents =>
        setNextImage(contents),
      );
    } catch (error) {
      console.log(
        'There are no more activities, please upload new CSV with new dates and activities',
      );
    }
  }

   return (
      <View style={styles.app}>
         <View>
            <NavBar props={props} goToDayPage={true} />
            <View style={{ height: 80, alignItems: 'center' }}>
               <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
            </View>
            {(!nowActivity_2 == "" && taskSelected == 0) &&
            (<ScrollView>
              <View style={styles.pickATask}>
                <Text style={styles.pickATaskText}>
                  Pick a task:
                </Text>
              </View>
               {!isEmpty(scheduleForToday) && nowActivity != null ?
                 <View style={{ flexDirection: 'row' }}>
                 <TouchableOpacity onPress={() => setTaskSelected(1)}>
                 <Activity
                  ActivityStyle={[(nowActivity_2 == "") ? styles.nowActivity : styles.nowActivity_multi]}
                  ImageStyle={styles.nowImage}
                  moments={'NOW'}
                  textActivity={nowActivity}
                  imagePath={nowImage}
               />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => setTaskSelected(2)}>
               <Activity
                   ActivityStyle={styles.nowActivity_multi}
                   ImageStyle={styles.nowImage}
                   moments={'Now'}
                   textActivity={nowActivity_2}
                   imagePath={nowImage_2}
               />
               </TouchableOpacity>
               </View> :
                  <Text style={styles.noSheduleText}>At the end of schedule, please upload new schedule CSV with the new dates</Text>}

               {!endOfSchedule && nextActivity != null &&
                  < Activity
                     ActivityStyle={styles.nextActivity}
                     ImageStyle={styles.nextImage}
                     moments={'NEXT'}
                     textActivity={nextActivity}
                     imagePath={nextImage}
                  />
               }
            </ScrollView>
          )}
          {(!nowActivity_2 == "" && !taskSelected == 0) &&
          (<ScrollView>
            <View style={styles.pickATask}>
              <Text style={styles.pickATaskText}>
                Pick a task:
              </Text>
            </View>
             {!isEmpty(scheduleForToday) && nowActivity != null ?
               <View style={{ flexDirection: 'row' }}>
               <Activity
                ActivityStyle={[(taskSelected == 1) ? styles.nowActivity_multi : styles.nowActivity_multi_NotSelected]}
                ImageStyle={styles.nowImage}
                moments={'NOW'}
                textActivity={nowActivity}
                imagePath={nowImage}
             />
             <Activity
                 ActivityStyle={[(taskSelected == 1) ? styles.nowActivity_multi_NotSelected : styles.nowActivity_multi]}
                 ImageStyle={styles.nowImage}
                 moments={'Now'}
                 textActivity={nowActivity_2}
                 imagePath={nowImage_2}
             />
             </View> :
                <Text style={styles.noSheduleText}>At the end of schedule, please upload new schedule CSV with the new dates</Text>}

             {!endOfSchedule && nextActivity != null &&
                < Activity
                   ActivityStyle={styles.nextActivity}
                   ImageStyle={styles.nextImage}
                   moments={'NEXT'}
                   textActivity={nextActivity}
                   imagePath={nextImage}
                />
             }
          </ScrollView>
        )}
          {(nowActivity_2 == "") &&
          (<ScrollView>
             {!isEmpty(scheduleForToday) && nowActivity != null ?
               <View style={{ flexDirection: 'row' }}>
               <Activity
                ActivityStyle={styles.nowActivity}
                ImageStyle={styles.nowImage}
                moments={'NOW'}
                textActivity={nowActivity}
                imagePath={nowImage}
             />
             </View> :
                <Text style={styles.noSheduleText}>At the end of schedule, please upload new schedule CSV with the new dates</Text>}

             {!endOfSchedule && nextActivity != null &&
                < Activity
                   ActivityStyle={styles.nextActivity}
                   ImageStyle={styles.nextImage}
                   moments={'NEXT'}
                   textActivity={nextActivity}
                   imagePath={nextImage}
                />
             }
          </ScrollView>
        )}
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   app: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   nowActivity: {
      backgroundColor: '#CDF07E',
      width: Dimensions.get('window').width - 100,
      resizeMode: 'contain',
   },
   nowActivityNotSelected: {
      backgroundColor: '#A9A9A9',
      width: Dimensions.get('window').width - 100,
      resizeMode: 'contain',
   },
   nowActivity_multi: {
      backgroundColor: '#94E609',
      width: Dimensions.get('window').width - 550,
      resizeMode: 'contain',
   },
   nowActivity_multi_NotSelected: {
      backgroundColor: '#A9A9A9',
      width: Dimensions.get('window').width - 550,
      resizeMode: 'contain',
   },
   nextActivity: {
      backgroundColor: '#F07E7E',
      width: Dimensions.get('window').width - 300,
   },
   nowImage: {
      height: Dimensions.get('window').height / 2,
   },
   nextImage: {
      height: Dimensions.get('window').height / 3,
   },
   noSheduleText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'FredokaOne-Regular',
   },
   pickATask: {
     alignItems: 'center',
     padding: 10,
     width: 200,
     marginTop: 20,
     backgroundColor: '#94E609',
     borderRadius: 30,
     flex: 1,
   },
   pickATaskText: {
     alignItems: 'center',
     color: '#FFFFFF',
     fontWeight: 'bold',
     fontSize: 35
   }
});
