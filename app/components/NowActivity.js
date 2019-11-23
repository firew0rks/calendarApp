import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import Tts from 'react-native-tts'
import RNFS from 'react-native-fs'
import Clock from './Clock'
import Activity from './Activity'
import NavBar from './NavBar'

class NowActivity extends Component {

    render() {
        return (
            <View>
                <NavBar props={this.props} goToDayPage={true}/>
                <Activity ActivityStyle={styles.nowActivity} ImageStyle={styles.nowImage} moments={'NOW'} />
                <Activity ActivityStyle={styles.nextActivity} ImageStyle={styles.nextImage} moments={"NEXT"} />
            </View>

            // <View style={styles.activity}>
            //     <Text style={styles.timeText}>NOW </Text>
            //     <Card
            //         containerStyle={styles.nowActivity}
            //         image={require('./../../images/taxi.png')}
            //         imageStyle={styles.nowImage}>
            //         <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
            //             <Text style={styles.activityText}>
            //                 Take the Taxi</Text>
            //             <Icon size={40} name="sound" type='antdesign' onPress={() => { Tts.speak("Take the Taxi!") }} />
            //         </View>
            //     </Card>
            //     <Text style={styles.timeText}>NEXT</Text>
            //     <Card
            //         containerStyle={styles.nextActivity}
            //         image={require('./../../images/bowling.jpg')}
            //         imageStyle={styles.nextImage}>
            //         <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
            //             <Text style={styles.activityText}>
            //                 Bowling Activity</Text>
            //             <Icon size={40} name="sound" type='antdesign' onPress={() => { Tts.speak("Bowling activity!") }} />
            //         </View>
            //     </Card>
            // </View >
        )
    };
}

const styles = StyleSheet.create({
    nowActivity: {
        backgroundColor: '#CDF07E',
        width: Dimensions.get("window").width - 100,
    },
    nextActivity: {
        backgroundColor: '#F07E7E',
        width: Dimensions.get("window").width - 300,
    },
    nowImage:
    {
        height: Dimensions.get("window").height / 4,
    },
    nextImage:
    {
        height: Dimensions.get("window").height / 5,
    }
});



export default NowActivity
