import React from 'react';
import {
  StyleSheet, View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native';
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
  container: {
    backgroundColor: '#F4F4F4',
    height: '100%',
    width: '100%',
  },
  app: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
