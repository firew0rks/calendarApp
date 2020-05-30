import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Card} from 'react-native-elements';
import Tts from 'react-native-tts';
import {getImage} from '../helper/fileLoader';

export default function DayCard(props) {
  const {cardText, status, showTrail, ...rest} = props;
  const [image, setImage] = useState('');

  getImage(cardText.toLowerCase()).then(contents => setImage(contents));

  const calculateContainerColours = () => {
    switch (status) {
      case 'now': {
        return styles.cardContainer;
      }
      case 'next': {
        return {...styles.cardContainer, backgroundColor: '#F07E7E'};
      }
      default: {
        return {...styles.cardContainer, backgroundColor: '#C3C3C3'};
      }
    }
  };

  const calculateConnectorColors = () => {
    switch (status) {
      case 'now': {
        return styles.connector;
      }
      case 'next': {
        return {...styles.connector, backgroundColor: '#F07E7E'};
      }
      default: {
        return {...styles.connector, backgroundColor: '#C3C3C3'};
      }
    }
  };

  const speak = () => {
    console.log(cardText);
    Tts.speak(cardText);
  };

  return (
    <TouchableWithoutFeedback onPress={speak}>
      <View style={{alignItems: 'center'}}>
        <Card
          {...rest}
          containerStyle={calculateContainerColours()}
          image={{uri: `data:image/png;base64,${image}`}}
          imageStyle={styles.cardImage}>
          <View style={styles.cardFooter}>
            <Text style={styles.activityText}>{cardText}</Text>
          </View>
        </Card>
        {showTrail && <View style={calculateConnectorColors()} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

DayCard.propTypes = {
  cardText: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['now', 'next', 'inactive']).isRequired,
  showTrail: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CDF07E',
    // width: Dimensions.get('window').width - 400,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 0,
    borderWidth: 0,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 6,
  },
  cardImage: {
    height: 200,
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 15,
    color: '#393939',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'FredokaOne-Regular',
  },
  connector: {
    height: 50,
    backgroundColor: '#CDF07E',
    width: 100,
  },
});
