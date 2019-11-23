import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import moment from 'moment'



function getActivity(props) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
            <Text>{moment().format('8:15 ')} AM</Text>
            <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} />
        </View>
    )
}