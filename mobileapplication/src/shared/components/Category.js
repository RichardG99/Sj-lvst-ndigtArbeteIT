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
    SectionList,
    Image,
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
        title: 'Top Stories',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/10/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1002/200',
            },
        ],
    },
    {
        title: 'New Stories',
        horizontal: true,
        data: [
            {
                key: '4',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1011/200',
            },
            {
                key: '5',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/1012/200',
            },

            {
                key: '6',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1013/200',
            },
            {
                key: '7',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1015/200',
            },
            {
                key: '8',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1016/200',
            },
        ],
    },
    {
        title: 'Recommended',
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1011/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/1012/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1013/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1015/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1016/200',
            },
        ],
    },
];

const Item = ({ title, image }) => (
    <FlatList>
        <TouchableOpacity
            style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginHorizontal: 7,
                marginBottom: '6%',
                backgroundColor: '#CBD9F5',
                //Dropshadow
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 3,
                shadowOpacity: 0.2,
                shadowColor: '#000',
            }}
        ></TouchableOpacity>
    </FlatList>
);

const ListItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginHorizontal: 7,
                marginBottom: '6%',
                backgroundColor: '#CBD9F5',
                //Dropshadow
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 3,
                shadowOpacity: 0.2,
                shadowColor: '#000',
            }}
        ></TouchableOpacity>
    );
};

export default class Marketplace2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        const renderItem = ({ item }) => (
            <Item title={item.title} image={item.image} />
        );

        return (
            <>
                <SafeAreaView style={{ backgroundColor: '#00082F' }}>
                    <SearchBar
                        inputStyle={{ fontSize: 16 }}
                        containerStyle={{
                            marginTop: 25,
                            height: 70,
                            backgroundColor: '#00082F',
                        }}
                        inputContainerStyle={{
                            borderRadius: 20,
                            height: 20,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}
                        placeholder="Search for stories"
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 40,
                            marginTop: 10,
                            alignItems: 'center',
                        }}
                    >
                        <SectionList
                            stickySectionHeadersEnabled={false}
                            sections={DATA}
                            keyExtractor={(item) => item.id}
                            style={styles.flatlist}
                            contentContainerStyle={{
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                            renderSectionHeader={({ section }) => (
                                <>
                                    <Text style={styles.sectionHeader}>
                                        {section.title}
                                    </Text>
                                    {section.horizontal ? (
                                        <FlatList
                                            horizontal
                                            data={section.data}
                                            renderItem={({ item }) => (
                                                <ListItem item={item} />
                                            )}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                        />
                                    ) : null}
                                </>
                            )}
                            renderItem={({ item, section }) => {
                                if (section.horizontal) {
                                    return null;
                                }
                                return <ListItem item={item} />;
                            }}
                        />
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
