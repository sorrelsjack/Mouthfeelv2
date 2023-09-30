import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors } from '../../Common';
import { CustomText } from '../../Components';

const AppIntroScreen = () => {
    const slides = [
        {
            key: 1,
            title: 'Welcome To Mouthfeel',
            text: 'Mouthfeel is an app that lets users access and contribute to a descriptive repository of foods.',
            backgroundColor: Colors.primaryThemeColor,
        },
        {
            key: 2,
            title: 'Like Or Dislike Foods',
            text: 'Other cool stuff',
            backgroundColor: Colors.primaryThemeColor,
        },
        {
            key: 3,
            title: 'Keep A List Of Foods To Try',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            backgroundColor: Colors.primaryThemeColor,
        },
        {
            key: 4,
            title: 'Get Recommendations',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            backgroundColor: Colors.primaryThemeColor,
        },
        {
            key: 5,
            title: 'Add New Foods To The App',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            backgroundColor: Colors.primaryThemeColor,
        },
        {
            key: 6,
            title: 'Help Describe Foods',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            backgroundColor: Colors.primaryThemeColor,
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <CustomText style={[styles.title, { color: Colors.primaryThemeTextColor }]}>{item.title}</CustomText>
                <CustomText style={[styles.text, { color: Colors.primaryThemeTextColor }]}>{item.text}</CustomText>
            </View>
        )
    }


    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides} />
    )
}

export default AppIntroScreen;

const styles = StyleSheet.create({
    slide: {
        backgroundColor: 
        Colors.primaryThemeColor, 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 20
    },
    title: {
        fontSize: 24,
        padding: 20
    },
    text: {
        fontSize: 20
    }
})