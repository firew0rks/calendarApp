import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import NewActivityModal from './NewActivityModal';

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
  state = {
    modalVisible: false,
  };

  constructor(props) {
    super(props);

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  render() {
    return (
      <>
        <Text style={styles.activitiesTitle}>Activities</Text>
        <Button
          style={styles.newActivityButton}
          onPress={() => this.setModalVisible(true)}>
          <Icon type="Entypo" name="plus" />
        </Button>
        <NewActivityModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
        />
      </>
    );
  }
}
