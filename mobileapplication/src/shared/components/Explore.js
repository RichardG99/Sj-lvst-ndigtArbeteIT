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
        //category: this.props.route.params.storyCategory,
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
        title: 'Adventure',
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

/* const Item = ({ title, image, myCategory, myStory }) => (
    <TouchableOpacity onPress={() => selectedCategory(myCategory)}>
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
); */

function Item({ selectedCategory, myStory, image, title }) {
    return (
        <TouchableOpacity onPress={() => selectedCategory(myStory)}>
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
            myStories: [],
        };
    }
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    selectedCategory = (myStory) => {
        this.props.navigation.navigate('Category', {
            /* storyTitle: myStory.story.get('title'),
            activeStoryId: myStory.story.id,
            currentBoxId: myStory.currentBoxId,
            currentTime: myStory.timeStamp, */
        });
    };

    render() {
        const { search } = this.state;
        const headerComponent = () => (
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: 'transparent', height: 150 }}>
                    <Text style={styles.sectionTitle}> New </Text>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('New');
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
                                    myStory={item}
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

/*  */
