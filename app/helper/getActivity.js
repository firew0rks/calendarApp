import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import moment from 'moment'

var RNFS = require('react-native-fs');

function fileSystem(props) {

    time = {
        day: moment().format('dddd'),
        hour: moment().format('HH'),
        minute: moment().format('mm'),
    }
}