import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class Stories extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <View style={{ padding: 10, flex: 1 }}>
                <SearchBar
                    inputStyle={styles.searchBarInput}
                    containerStyle={styles.searchBarCont}
                    inputContainerStyle={styles.searchBarInput}
                    placeholder="Search for stories"
                    onChangeText={this.updateSearch}
                    value={search}
                />

                <Text style={styles.categoryTitle}> Which category? </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Horror</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Comedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Romance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Adventure</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
// <ImageBackground source={require('../assets/raven-gaa8626c41_1920.jpg')}style={styles.categoryDef} />
