import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Tts from 'react-native-tts';

class Activity extends Component {
  speak = () => {
    Tts.speak(this.props.textActivity ? this.props.textActivity : 'No input');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.speak}>
        <View style={styles.activity}>
          <Text style={styles.timeText}>{this.props.moments}</Text>
          <View style={styles.textView}>
            <Text style={styles.timeText}>{this.props.time} </Text>
            <Card
              containerStyle={this.props.ActivityStyle}
              // image={require('./../../images/taxi.png')}
              image={{uri: `data:image/png;base64,${this.props.imagePath}`}}
              imageStyle={this.props.ImageStyle}>
              <View style={styles.textView}>
                <Text style={styles.activityText}>
                  {this.props.textActivity}
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  timeText: {
    fontSize: 40,
    color: '#393939',
    fontFamily: 'FredokaOne-Regular',
  },
  activityText: {
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#393939',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'FredokaOne-Regular',
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextActivity: {
    backgroundColor: '#F07E7E',
    width: Dimensions.get('window').width - 300,
  },
});

export default Activity;
