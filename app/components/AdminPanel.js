import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import AdminActivityCard from './AdminActivityCard';
import AdminCalendar from './AdminCalendar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    paddingBottom: 16,
  },
  calendarPanel: {
    flex: 16,
    paddingHorizontal: 24,
  },
  activitesPanel: {
    flex: 9,
    paddingHorizontal: 24,
  },
  header: {
    height: 76,
  },
  calendarHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
  },
  activitiesHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthTitleText: {
    fontSize: 28,
    color: 'rgb(0, 99, 255)',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  monthTitleIcon: {
    fontSize: 14,
    color: 'rgb(0, 99, 255)',
    paddingLeft: 8,
  },
  settingsButton: {
    backgroundColor: 'rgb(231, 241, 255)',
  },
  settingsButtonIcon: {
    color: 'rgb(0, 99, 255)',
  },
  backButton: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  backButtonIcon: {
    marginRight: 8,
    color: 'rgb(0, 99, 255)',
  },
  backButtonText: {
    fontSize: 17,
    lineHeight: 24,
    paddingLeft: 0,
    color: 'rgb(0, 99, 255)',
  },
  activitiesTitle: {
    fontSize: 28,
    color: 'rgb(37, 38, 41)',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  newActivityButton: {
    backgroundColor: 'rgb(0, 99, 255)',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  calendarBody: {
    height: '100%',
    flex: 16,
  },
  activitiesBody: {
    flex: 9,
    height: '100%',
  },
  scrollView: {
    height: '100%',
  },
});

function AdminPanel() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Calendar */}
        <View style={styles.calendarPanel}>
          <View style={styles.header}>
            <View style={styles.calendarHeader}>
              <Button style={styles.backButton}>
                <Icon
                  type="AntDesign"
                  name="arrowleft"
                  style={styles.backButtonIcon}
                />
                <Text style={styles.backButtonText}>Back</Text>
              </Button>
              <View style={styles.monthTitle}>
                <Text style={styles.monthTitleText}>August</Text>
                <Icon
                  type="AntDesign"
                  name="caretdown"
                  style={styles.monthTitleIcon}
                />
              </View>
              <Button style={styles.settingsButton}>
                <Icon
                  type="FontAwesome"
                  name="gear"
                  style={styles.settingsButtonIcon}
                />
              </Button>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.calendarBody}>
              <AdminCalendar />
            </View>
          </View>
        </View>
        {/* Activites */}
        <View style={styles.activitesPanel}>
          <View style={styles.header}>
            <View style={styles.activitiesHeader}>
              <Text style={styles.activitiesTitle}>Activities</Text>
              <Button style={styles.newActivityButton}>
                <Icon type="Entypo" name="plus" />
              </Button>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.activitiesBody}>
              <ScrollView style={styles.scrollView}>
                <AdminActivityCard />
                <AdminActivityCard />
                <AdminActivityCard />
                <AdminActivityCard />
                <AdminActivityCard />
                <AdminActivityCard />
                <AdminActivityCard />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AdminPanel;
