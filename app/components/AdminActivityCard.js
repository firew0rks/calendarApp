import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Icon} from 'native-base';
import {labels} from '../constants';
import CardTooltip from './CardTooltip';

const styles = StyleSheet.create({
  cardContainer: {
    // backgroundColor: 'rgb(255, 119, 109)',
    borderRadius: 8,
    height: 60,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    zIndex: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {width: 44, height: 44, borderRadius: 8},
  ellipsisIcon: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  },
  cardTextWrapper: {
    marginLeft: 8,
  },
  cardTitle: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  cardDuration: {
    fontSize: 15,
    lineHeight: 16,
    color: 'rgb(255, 255, 255)',
  },
});

class AdminActivityCard extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.cardContainer,
          {backgroundColor: labels[this.props.label].color},
        ]}>
        <View style={styles.wrapper}>
          {this.props.picturePath !== '' ? (
            <Image
              source={{uri: this.props.picturePath}}
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.cardImage} />
          )}
          <View style={styles.cardTextWrapper}>
            <Text style={styles.cardTitle}>{this.props.title}</Text>
            <Text style={styles.cardDuration}>{this.props.duration} mins</Text>
          </View>
        </View>
        {this.props.showTooltip && <CardTooltip />}
        <Icon
          type="FontAwesome5"
          name="ellipsis-v"
          style={styles.ellipsisIcon}
          onPress={() => this.props.toggleTooltip()}
        />
      </View>
    );
  }
}

export default AdminActivityCard;

AdminActivityCard.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number,
  picturePath: PropTypes.string,
  label: PropTypes.number,
  showTooltip: PropTypes.bool,
  toggleTooltip: PropTypes.func,
};

AdminActivityCard.defaultProps = {
  title: 'Morning Routine',
  duration: 30,
  // picturePath: '',
};
