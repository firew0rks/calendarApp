import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Tts from 'react-native-tts';

export default function DayCard(props) {
  const {cardText} = props;

  return (
    <Card
      containerStyle={styles.cardContainer}
      image={require('./../../images/taxi.png')}
      imageStyle={styles.cardImage}>
      <View style={styles.cardFooter}>
        <Text style={styles.activityText}>{cardText}</Text>
      </View>
    </Card>
  );
}

DayCard.propTypes = {
  cardText: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CDF07E',
    // width: Dimensions.get('window').width - 400,
    width: '100%',
    borderRadius: 10,
    padding: 10,
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
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#393939',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
