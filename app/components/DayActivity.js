import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Activity from './Activity'
import moment from 'moment'


class DayActivity extends Component {

    render() {
        return (
            <View>
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('8:15') + "AM"} />
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('8:30') + "AM"} />
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('9:00') + "AM"} />
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('9:30') + "AM"} />
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('10:00') + "AM"} />
                <Activity ActivityStyle={styles.ActivityStyle} ImageStyle={styles.ImageStyle} time={moment().format('11:15') + "AM"} />
            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    ActivityStyle: {
        backgroundColor: '#CDF07E',
        width: Dimensions.get("window").width - 400,
    },
    ImageStyle: {
        height: Dimensions.get("window").height / 3,
    },
    TimeStyle: {
        color: '#393939',
        fontSize: 30
    }
});



export default DayActivity