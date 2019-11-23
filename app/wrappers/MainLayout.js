import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Clock from '../components/Clock';
import NavBar from '../components/NavBar';
import moment from 'moment';

export default function MainLayout(props) {
  const {children, ...rest} = props;

  const [time, setTime] = useState(moment().format('h:mm a'));
  const [date, setDate] = useState(moment().format('MMMM Do YYYY '));

  return (
    <View style={styles.app}>
      <SafeAreaView style={styles.container}>
        <NavBar props={{...rest}} goToDayPage={false} />
        <View style={{height: 80}}>
          <Clock time={time} setTime={setTime} date={date} setDate={setDate} />
        </View>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </View>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    height: '100%',
    width: '100%',
  },
});
