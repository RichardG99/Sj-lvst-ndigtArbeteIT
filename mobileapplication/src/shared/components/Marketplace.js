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
import { FlatList } from 'react-native-gesture-handler';

const DATA = [
    {
        id: 1,
        nav: {},
        title: 'Horror',
    },
    {
        id: 2,
        nav: {},
        title: 'Comedy',
    },
    {
        id: 3,
        nav: {},
        title: 'Romance',
    },
    {
        id: 4,
        nav: {},
        title: 'Adventure',
    },
    {
        id: 5,
        nav: {},
        title: 'Thriller',
    },
    {
        id: 6,
        nav: {},
        title: 'Children',
    },
];
//onPress={() => this.props.navigation.navigate('Horror')}

const Item = ({ title }) => (
    <TouchableOpacity style={styles.categoryButton}>
        <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
);

export default class Stories extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        const renderItem = ({ item }) => <Item title={item.title} />;

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
                <TouchableOpacity style={styles.allCategories}>
                    <Text style={styles.categoryText}>All categories</Text>
                </TouchableOpacity>
                <View style={styles.buttons}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        style={styles.flatlist}
                    ></FlatList>
                </View>
            </View>
        );
    }
}
