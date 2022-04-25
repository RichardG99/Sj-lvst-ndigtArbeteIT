import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,

} from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Capriola_400Regular } from '@expo-google-fonts/capriola';
import { AguafinaScript_400Regular } from '@expo-google-fonts/aguafina-script'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';

const getFonts = async () =>
    await Font.loadAsync({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
    });

export default function Splash() {
//     let [fontsLoaded] = useFonts({
//         'PacificoRegular': require('../assets/fonts/Pacifico-Regular.ttf'),
//     });

     if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={console.warn}
            />
        );
    }
    return( 

        <View style={styles.splashBackground}> 
        <Text style={styles.splashTitle}>
                    Augmented Audio
                </Text>
            <View style={styles.ellips1}>               
            </View>
            <View style={styles.ellips2}>               
            </View>
        </View>
       
        );
}

