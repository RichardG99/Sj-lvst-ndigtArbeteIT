import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const DATA = [
    {
        id: 1,
        nav: {},
        image: require('../assets/raven-gaa8626c41_1920.jpg'),
        title: 'Thriller',
    },
    {
        id: 2,
        nav: {},
        image: require('../assets/not-hear-g120d30a73_1920.jpg'),
        title: 'Comedy',
    },
    {
        id: 3,
        nav: {},
        image: require('../assets/couple-g798e44f98_1920.jpg'),
        title: 'Romance',
    },
    {
        id: 4,
        nav: {},
        image: require('../assets/fredrik-solli-wandem-TrPwD7wfrG0-unsplash.jpg'),
        title: 'Horror',
    },
    {
        id: 5,
        nav: {},
        image: require('../assets/fredrik-solli-wandem-TrPwD7wfrG0-unsplash.jpg'),
        title: 'Thriller',
    },
    {
        id: 6,
        nav: {},
        image: require('../assets/couple-g798e44f98_1920.jpg'),
        title: 'Children',
    },
];

function Item({ selectedCategory, image, title }) {
    //Title är namnet på kategorin När du klickar på knappen skickar du med title till funktionen selectedCategory.
    return (
        <TouchableOpacity onPress={() => selectedCategory(title)}>
            <ImageBackground
                imageStyle={{
                    borderRadius: 10,
                }}
                source={image}
                style={styles.categoryButton}
            >
                <Text style={styles.categoryText}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            stories: [],
            categoryNames: [],
        };
    }
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    selectedCategory = (title) => {
        console.log('Title: ' + title); //Namnet på den kategori du klickat på.

        this.props.navigation.navigate('Stories', {
            storyCategory: title,
        });
    };

    componentDidMount() {
        this.getCategories();
    }
    getCategories = () => {
        const Story = Parse.Object.extend('Story');
        const query = new Parse.Query(Story);
        query.limit(1000); // TODO :limits the amount of stories we can fetch, might want a way to make this uncapped.
        query.find().then((stories) => {
            console.log('antal stories: ' + stories.length);
            this.setState({ stories: stories });
        });
    };

    render() {
        const { search } = this.state;
        const headerComponent = () => (
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: 'transparent', height: 150 }}>
                    <Text style={styles.sectionTitle}> All stories </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Stories', {
                                storyCategory: '',
                            });
                        }}
                        style={{ alignSelf: 'center' }}
                    >
                        <ImageBackground
                            style={styles.allCategories}
                            source={require('../assets/mark-mc-neill-qEBg-naOcQY-unsplash.jpg')}
                            imageStyle={{ borderRadius: 10 }}
                        ></ImageBackground>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: 'transparent',
                        height: 150,
                        marginBottom: 70,
                    }}
                >
                    <Text style={[styles.sectionTitle]}> Popular </Text>
                    <TouchableOpacity
                        onPress={() => console.log('Popular')}
                        style={{ alignSelf: 'center' }}
                    >
                        <ImageBackground
                            style={styles.allCategories}
                            source={require('../assets/alistair-macrobert-b6NIuzqaD0s-unsplash.jpg')}
                            imageStyle={{ borderRadius: 10 }}
                        ></ImageBackground>
                    </TouchableOpacity>
                    <Text style={[styles.sectionTitle, styles.sectionTitle2]}>
                        {' '}
                        Categories{' '}
                    </Text>
                </View>
            </View>
        );

        return (
            <>
                <SafeAreaView style={{ backgroundColor: '#00082F' }}>
                    <StatusBar style="light" />
                    <SearchBar
                        inputStyle={{ fontSize: 16 }}
                        containerStyle={{
                            marginTop: 25,
                            height: 70,
                            backgroundColor: '#00082F',
                        }}
                        inputContainerStyle={{
                            borderRadius: 20,
                            height: 35,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}
                        placeholder="Search for stories"
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <View style={styles.flatlistView}>
                        <FlatList
                            ListHeaderComponent={headerComponent}
                            data={DATA}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.title}
                                    image={item.image}
                                    selectedCategory={this.selectedCategory}
                                    category={item}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            style={styles.flatlist}
                            contentContainerStyle={{ alignItems: 'center' }}
                        ></FlatList>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
