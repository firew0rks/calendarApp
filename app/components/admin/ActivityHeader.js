import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button, Text, Icon} from 'native-base';

const styles = StyleSheet.create({
  activitiesTitle: {
    fontSize: 28,
    color: 'rgb(37, 38, 41)',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  newActivityButton: {
    backgroundColor: 'rgb(0, 99, 255)',
  },
});

export default class ActivityHeader extends React.Component {
  render() {
    return (
      <>
        <Text style={styles.activitiesTitle}>Activities</Text>
        <Button
          style={styles.newActivityButton}
          onPress={() => this.props.setModalVisible(true)}>
          <Icon type="Entypo" name="plus" />
        </Button>
      </>
    );
  }
}

ActivityHeader.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
