import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card} from 'react-native-elements';
import Tts from 'react-native-tts';

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
  nowActivity: {
    backgroundColor: '#CDF07E',
    width: Dimensions.get('window').width - 100,
    resizeMode: 'contain',
    borderWidth: 0,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 10,
    padding: 10,
  },
  nextActivity: {
    backgroundColor: '#F07E7E',
    width: Dimensions.get('window').width - 300,
    borderWidth: 0,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 10,
    padding: 10,
  },
  nowImage: {
    height: Dimensions.get('window').height / 2,
  },
  nextImage: {
    height: Dimensions.get('window').height / 3,
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Activity = props => {
  const speak = () => {
    Tts.speak(props.textActivity ? props.textActivity : 'No input');
  };

  const cardContainerStyle =
    props.moments === 'NOW' ? styles.nowActivity : styles.nextActivity;
  const cardImageStyle =
    props.moments === 'NOW' ? styles.nowImage : styles.nextImage;

  return (
    <TouchableWithoutFeedback onPress={speak}>
      <View style={styles.activity}>
        <Text style={styles.timeText}>{props.moments}</Text>
        <View style={styles.textView}>
          <Text style={styles.timeText}>{props.time} </Text>
          <Card
            containerStyle={cardContainerStyle}
            image={{uri: `data:image/png;base64,${props.imagePath}`}}
            imageStyle={cardImageStyle}>
            <View style={styles.textView}>
              <Text style={styles.activityText}>{props.textActivity}</Text>
            </View>
          </Card>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Activity.propTypes = {
  moments: PropTypes.oneOf(['NOW', 'NEXT']).isRequired,
  textActivity: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  time: PropTypes.string,
};

export default Activity;
