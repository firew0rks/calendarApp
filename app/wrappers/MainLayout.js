import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Clock from '../components/Clock';
import NavBar from '../components/NavBar';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  clockContainer: {
    height: 80,
  },
});

const MainLayout = props => {
  const {children, ...rest} = props;

  return (
    <SafeAreaView style={styles.container}>
      <NavBar {...rest} />
      <View style={styles.clockContainer}>
        <Clock />
      </View>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
