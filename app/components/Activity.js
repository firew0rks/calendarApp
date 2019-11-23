import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements' ;
import Tts from 'react-native-tts';
import RNFS from 'react-native-fs' ;
import Clock from './Clock';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFile: null,
      textFile: null,
    } ;
  }

  // componentWillMount() {
  //     this._textFile()
  // }

  // _textFile() {
  //     const file = RNFS.read('C:/Users/oscar.lau/app/calendarApp/app/components/')
  //     return file
  // }

  render() {
    // require the module
    var RNFS = require('react-native-fs');

    // create a path you want to write to
    var path = '/test.txt';

    // write the file
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
    return (
      <View style={styles.activity}>
        <Text style={styles.timeText}>NOW </Text>
        <Card
          containerStyle={styles.nowActivity}
          image={require('./../../images/taxi.png')}
          imageStyle={styles.nowImage}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.activityText}>Take the Taxi</Text>
            <Icon
              size={40}
              name="sound"
              type="antdesign"
              onPress={() => {
                Tts.speak('Take the Taxi!');
              }}
            />
          </View>
        </Card>
        <Text style={styles.timeText}>NEXT</Text>
        <Card
          containerStyle={styles.nextActivity}
          image={require('./../../images/bowling.jpg')}
          imageStyle={styles.nextImage}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.activityText}>Bowling Activity</Text>
            <Icon
              size={40}
              name="sound"
              type="antdesign"
              onPress={() => {
                Tts.speak('Bowling activity!');
              }}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityText: {
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#393939',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  nowActivity: {
    backgroundColor: '#CDF07E',
    width: Dimensions.get('window').width - 100,
  },
  nextActivity: {
    backgroundColor: '#F07E7E',
    width: Dimensions.get('window').width - 300,
  },
  nowImage: {
    height: Dimensions.get('window').height / 4,
  },
  nextImage: {
    height: Dimensions.get('window').height / 5,
  },
});

export default Activity;


