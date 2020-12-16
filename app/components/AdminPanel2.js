import React from 'react';
import {Text} from 'react-native';
import DatabaseHelper from '../components/sqlite';

class AdminPanel2 extends React.Component {
  constructor() {
    super();

    this.getActivityList();

    console.log('#################hereeeee');

    this.state = {
      activityList: [],
    };
  }

  async getActivityList() {
    const activityList = DatabaseHelper.getActivityList();

    console.log(`### ${activityList}`);

    this.setState({
      activityList,
    });
  }

  render() {
    return <Text>Hello world!</Text>;
  }
}

export default AdminPanel2;
