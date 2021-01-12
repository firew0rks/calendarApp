import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Pressable} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 100,
    right: -5,
    top: 30,
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

export default function CardTooltip(props) {
  return (
    <View style={styles.tooltipContainer}>
      <Pressable onPress={props.handlePressDelete}>
        <Icon type="Feather" name="edit" style={styles.tooltipEditIcon} />
      </Pressable>
      <Pressable onPress={props.handlePressEdit}>
        <Icon type="AntDesign" name="delete" style={styles.tooltipDeleteIcon} />
      </Pressable>
    </View>
  );
}

CardTooltip.propTypes = {
  handlePressEdit: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
};
