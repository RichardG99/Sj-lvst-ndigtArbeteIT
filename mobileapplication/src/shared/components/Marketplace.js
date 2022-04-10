import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ScrollView,
    FlatList,
    Item,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';

export default class Stories extends React.Component {
    render() {
        return (
            <View style={styles.box}>
                <TouchableOpacity
                    styles={styles.touchableHighlight}
                ></TouchableOpacity>
                <Text>Marketplace</Text>
            </View>
        );
    }
}
