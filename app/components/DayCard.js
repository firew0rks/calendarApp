import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Tts from 'react-native-tts';

export default function DayCard(props) {
  const {cardText, status, ...rest} = props;

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

  return (
    <View style={{alignItems: 'center'}}>
      <Card
        {...rest}
        containerStyle={calculateContainerColours()}
        image={require('./../../images/taxi.png')}
        imageStyle={styles.cardImage}>
        <View style={styles.cardFooter}>
          <Text style={styles.activityText}>{cardText}</Text>
        </View>
      </Card>
      <View style={calculateConnectorColors()} />
    </View>
  );
}

DayCard.propTypes = {
  cardText: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['now', 'next', 'inactive']).isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CDF07E',
    // width: Dimensions.get('window').width - 400,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 0,
    // marginBottom: 30,
    // paddingRight: 10,
    // marginLeft: 10,
  },
  cardImage: {},
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
  },
  connector: {
    height: 50,
    backgroundColor: '#CDF07E',
    width: 100,
  },
});
