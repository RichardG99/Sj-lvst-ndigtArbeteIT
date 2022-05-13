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

const Item = ({ title, image, myCategory, selectedCategory }) => (
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
);

export default class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myCategories: [],
        };
    }
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };
    selectedCategory = (myCategory) => {
        this.props.navigation.navigate('Category', {
            categoryTitle: myCategory.category.get('title'),
            //activeStoryId: myStory.story.id,
            //currentBoxId: myStory.currentBoxId,
            //currentTime: myStory.timeStamp,
        });
    };

    render() {
        const { search } = this.state;

        const renderItem = ({ item }) => (
            <Item
                title={item.title}
                image={item.image}
                navigation={this.props.navigation}
                id={item.id}
                myCategory={item}
                selectedCategory={this.selectedCategory}
            />
        );
        const headerComponent = () => (
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: 'transparent', height: 150 }}>
                    <Text style={styles.categoryTitle}> New </Text>
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
                    <Text style={[styles.categoryTitle]}> Popular </Text>
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
                    <Text style={[styles.categoryTitle, styles.categoryTitle2]}>
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
                            renderItem={renderItem}
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

/*<ImageBackground
            
            imageStyle={{
                borderRadius: 10,
            }}
            source={image}
        >
            <Text style={styles.categoryText}>{title}</Text>
        </ImageBackground>*/
