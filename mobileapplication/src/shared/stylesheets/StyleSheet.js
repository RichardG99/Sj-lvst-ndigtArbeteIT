import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

//const tabSheetColor = 'rgba(255, 255, 255, 0.6)';
//const mainTextColor = '#FFDB21';
//const secondaryTextColor = 'black';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

    // Home

    button: {
        padding: 10,
    },

    // My Library
    containerConst: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    pageTitle: {
        textAlign: 'center',
    },
    refreshButton: {
        marginLeft: '75%',
        top: '2%',
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowColor: 'black',
    },

    // Add User
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

    button: {
        padding: 10,
    },

    // Game
    gameContainer: {
        flex: 1,
        backgroundColor: '#00082F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameButtonText: {
        marginLeft: 10,
        color: '#fff',
        fontFamily: 'InterSemiBold',
        fontSize: 20,
    },
    gameButton: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#506BC8',
        width: screenWidth * 0.65,
        height: screenHeight * 0.06,

        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,

        /* justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.65,
        height: screenHeight * 0.06,
        shadowColor: '#fff',
        backgroundColor: '#506BC8',
        borderRadius: 10,
        margin: 15,*/
    },
    pauseButton: {
        borderRadius: 1000,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        width: 160,
        height: 160,
        backgroundColor: '#FF9900',
        shadowOpacity: 0.5,
        shadowColor: 'white',
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
    },
    titleSmall: {
        fontSize: 18,
        color: 'white',
        margin: 10,
        fontFamily: 'InterRegular',
    },
    headerSmall: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'InterSemiBold',
    },
    titleLarge: {
        fontSize: 32,
        color: 'white',
        fontFamily: 'InterSemiBold',
        margin: 10,
    },
    headerLarge: {
        fontSize: 32,
        color: 'grey',
    },

    //Stories
    containerConst: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    story: {
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderWidth: 0.8,
        borderRadius: 10,
        padding: 20,
        paddingVertical: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        width: screenWidth * 0.9,
        height: screenHeight * 0.12,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10,
        fontFamily: 'InterSemiBold',
    },
    title: {
        fontFamily: 'InterSemiBold',
        fontSize: 28,
        marginBottom: 10,
    },
    by: {
        fontFamily: 'InterRegular',
        marginRight: 10,
        fontSize: 20,
        color: 'grey',
    },
    author: {
        fontFamily: 'InterRegular',
        fontSize: 24,
        color: 'black',
    },

    //Splash
    splashTitle: {
        position: 'absolute',
        fontFamily: 'Pacifico',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 38,
        lineHeight: 60,
        marginTop: 115,
        /* or 57px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: '#FF9900',
        shadowOpacity: 0.5,
        shadowColor: 'black',
    },
    splashBackground: {
        backgroundColor: '#00082F',
        flex: 1,
    },

    ellips1: {
        //top left corner
        position: 'absolute',
        width: 300,
        height: 300,
        left: -123,
        top: -90,
        borderRadius: 10000,
        backgroundColor: '#001458',
    },
    ellips2: {
        //bottom right corner
        position: 'absolute',
        width: 360,
        height: 360,
        left: 136,
        top: 555,
        borderRadius: 10000,
        backgroundColor: '#420196',
    },

    //Login

    defaultButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.55,
        height: screenHeight * 0.06,
        shadowColor: '#fff',
        backgroundColor: '#506BC8',
        borderRadius: 10,
        margin: 15,

        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
    },

    buttonAccount: {},

    loginText: {
        position: 'absolute',
        fontFamily: 'InterSemiBold',
        fontSize: 20,
        /* or 30px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: 'white',
    },

    ellips3: {
        //top left corner
        position: 'absolute',
    },

    ellips4: {
        //bottom right corner
        position: 'absolute',
    },

    // Marketplace
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxHeight: '100%',
        alignItems: 'center',
    },

    flatlist: { marginBottom: 80 },

    flatlistView: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: screenHeight * 0.8,
        marginTop: 25,
        //marginTop: 100,
        //alignItems: 'center',
    },
    categoryButton: {
        width: screenWidth * 0.4,
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
        fontFamily: 'InterSemiBold',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 20,
        color: '#fff',
        textAlign: 'left',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
        textShadowColor: 'black',
    },

    sectionTitle: {
        position: 'absolute',
        marginTop: 1,
        width: 299,
        height: 150,
        left: 10,
        fontFamily: 'InterSemiBold',
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
    allCategories: {
        width: screenWidth * 0.84,
        height: 110,
        borderRadius: 10,
        margin: 15,

        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },

    //Category page
    squareButton: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginHorizontal: 7,
        backgroundColor: '#CBD9F5',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    categoryTitle: {
        fontSize: 40,
        fontFamily: 'Pacifico',
        alignSelf: 'center',
        marginTop: 25,
        color: '#CBD9F5',
        shadowOpacity: 0.5,
        shadowColor: 'black',
    },
    mainTitles: {
        color: '#FF9900',
    },
    sectionTitles: {
        fontFamily: 'InterSemiBold',
        fontSize: 24,
        lineHeight: 29,
        letterSpacing: 0,
        textAlign: 'left',
        //marginTop: 10,
    },
    item: {
        margin: 5,
    },
    itemPhoto: {
        width: 120,
        height: 120,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },

    //Profile

    profileTitle: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 70,
        fontFamily: 'Pacifico',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 40,
        lineHeight: 60,
        /* or 57px */
        //flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: '#FF9900',
        shadowOpacity: 0.5,
        shadowColor: 'black',
    },

    //AddUser

    createAccountButton: {
        top: 550,
    },

    resetFormButton: {
        top: 600,
    },

    // Edit Password

    changeButton: {
        top: 450,
    },

    resetButton: {
        top: 500,
    },
});
