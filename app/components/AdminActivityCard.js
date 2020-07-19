import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgb(255, 119, 109)',
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
  imagePlaceholder: {
    height: 44,
    width: 44,
    backgroundColor: 'magenta',
    borderRadius: 8,
  },
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
});

function AdminActivityCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.wrapper}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.cardTextWrapper}>
          <Text style={styles.cardTitle}>Morning Routine</Text>
          <Text style={styles.cardDuration}>30 mins</Text>
        </View>
      </View>
      <Icon type="FontAwesome5" name="ellipsis-v" style={styles.ellipsisIcon} />
    </View>
  );
}

export default AdminActivityCard;
