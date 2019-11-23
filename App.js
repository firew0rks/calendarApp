import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import PresentationalComponent from './app/components/PresentationalComponent';
import Clock from './app/components/Clock';
import Activity from './app/components/Activity';

export default function App() {
  console.disableYellowBox = true;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.app}>
          <ScrollView>
            <Clock />
            <Activity />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
