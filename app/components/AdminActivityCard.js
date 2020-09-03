import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'native-base';
import {labels} from '../constants';

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
  tooltipContainer: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 1,
    bottom: '140%',
    right: -5,
    // marginLeft: -60,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  tooltipEditIcon: {
    color: 'rgb(0, 99, 255)',
    fontSize: 24,
    marginRight: 24,
  },
  tooltipDeleteIcon: {
    color: 'rgb(255, 0, 0)',
    fontSize: 24,
  },
});

class AdminActivityCard extends React.Component {
  state = {
    showTooltip: false,
  };

  toggleTooltip() {
    this.setState({showTooltip: !this.state.showTooltip});
  }

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
        {this.state.showTooltip && (
          <View style={styles.tooltipContainer}>
            <Icon type="Feather" name="edit" style={styles.tooltipEditIcon} />
            <Icon
              type="AntDesign"
              name="delete"
              style={styles.tooltipDeleteIcon}
            />
          </View>
        )}
        <Icon
          type="FontAwesome5"
          name="ellipsis-v"
          style={styles.ellipsisIcon}
          onPress={() => this.toggleTooltip()}
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
};

AdminActivityCard.defaultProps = {
  title: 'Morning Routine',
  duration: 30,
  // picturePath: '',
};
