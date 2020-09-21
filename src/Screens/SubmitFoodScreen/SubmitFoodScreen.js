import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tag } from '../../Components';
import { Colors } from '../../Common';

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
const SubmitFoodScreen = () => {
    const dummyData = [
        { text: "crunchy" },
        { text: "soft" }
    ];

    return (
        <View style={styles.wrapper}>
            <TextInput placeholder={'Name'} />
            <Text style={styles.title}>Flavors</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={dummyData}
                renderItem={({ item }) => <Tag item={item} />}
                keyExtractor={item => item}
                horizontal />
            <Text style={styles.title}>Textures</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={dummyData}
                renderItem={({ item }) => <Tag item={item} />}
                keyExtractor={item => item}
                horizontal />
            <Text style={styles.title}>Misc</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={dummyData}
                renderItem={({ item }) => <Tag item={item} />}
                keyExtractor={item => item}
                horizontal />
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubmitFoodScreen;

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    },
    title: {
        marginVertical: 10
    },
    submitButton: {
        backgroundColor: Colors.button.backgroundColor,
        borderRadius: 30,
        marginVertical: 25,
        width: '100%',
        paddingVertical: 10,

    },
    submitButtonText: {
        color: Colors.button.textColor,
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});