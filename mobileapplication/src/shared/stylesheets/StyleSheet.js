import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

//const tabSheetColor = 'rgba(255, 255, 255, 0.6)';
//const mainTextColor = '#FFDB21';
//const secondaryTextColor = 'black';
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth / 2 - 30;

export const styles = StyleSheet.create({
    // Bottom Bar
    tabBar: {
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        alignItems: 'center',
    },

    // App
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Home
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // My Library
    containerConst: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    story: {
        backgroundColor: 'lightblue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    pageTitle: {
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
    },
    by: {
        fontSize: 32,
        color: 'grey',
    },
    author: {
        fontSize: 32,
        color: 'white',
    },

    // Add User

    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // Edit Password
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },
    statusStyle: {
        margin: '1em 0',
        color: 'red',
    },

    // Edit Profile
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // Game
    containerDefault: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },
    titleSmall: {
        fontSize: 18,
        color: 'white',
    },
    headerSmall: {
        fontSize: 18,
        color: 'grey',
    },
    titleLarge: {
        fontSize: 32,
        color: 'white',
    },
    headerLarge: {
        fontSize: 32,
        color: 'grey',
    },
    author: {
        fontSize: 32,
        color: 'grey',
    },

    // Login
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    //Stories
    containerConst: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    story: {
        backgroundColor: 'lightgrey',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    pageTitle: {
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
    },
    by: {
        fontSize: 32,
        color: 'grey',
    },
    author: {
        fontSize: 32,
        color: 'white',
    },

    // Marketplace
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxHeight: '100%',
        alignItems: 'center',
    },
    flatlist: {
        marginBottom: 150,
        paddingBottom: 100,
    },
    categoryButton: {
        width: 150,
        height: 100,
        marginHorizontal: 7,
        marginBottom: '6%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    categoryText: {
        paddingHorizontal: 15,
        position: 'relative',
        marginTop: 75,
        //fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        color: '#fff',
        textAlign: 'left',
    },
    categoryTitle: {
        position: 'absolute',
        width: 299,
        height: 150,
        left: 10,
        //fontFamily: 'Noto Sans Kannada UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 80,
        /* or 48px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'left',
        letterSpacing: -0.41,
    },
    categoryTitle1: {
        marginTop: 160,
    },
    categoryTitle2: {
        marginTop: 330,
    },

    searchBarInput: {
        backgroundColor: '#C4C4C4',
    },
    searchBarCont: {
        backgroundColor: '#AAAAAA',
        borderColor: '#000',
    },
    allCategories: {
        paddingHorizontal: 5,
        paddingVertical: 55,
        width: screenWidth * 0.8,
        height: 100,
        //backgroundColor: 'blue',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 10,
        minWidth: '96%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    allCategories1: {
        marginTop: 50,
        marginBottom: 60,
    },

    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    sectionHeader: {
        position: 'absolute',
        width: 234,
        height: 38,
        left: 39,
        top: 177,
        backgroundColor: 'red',
        //fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 29,
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: 200,
        height: 200,
    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
});
