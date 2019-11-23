import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import Tts from 'react-native-tts'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format('h:mm a'),
            date: moment().format('ddd, MMMM Do YYYY ')
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: moment().format('h:mm a'),
            date: moment().format('ddd, MMMM Do YYYY ')
        });
    }
    render() {
        return (
            <View style={styles.clock}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Icon size={30} name="clockcircleo" color='red' type='antdesign' onPress={() => {
                        Tts.speak("The time is " + this.state.time)
                    }} />
                    <Text style={styles.time} >
                        {this.state.time}
                    </Text></View>

                <Text style={styles.date}>
                    {this.state.date}
                </Text>
                <StatusBar>backgroundColor="blue"</StatusBar>
            </View >
        );
    }
}

export default Clock

const styles = StyleSheet.create({
    clock: {
        flex: 1,
    },
    time: {
        flex: 1,
        fontSize: 25,
        color: '#F04A64',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 15,
        color: '#F04A64',
    }
});
