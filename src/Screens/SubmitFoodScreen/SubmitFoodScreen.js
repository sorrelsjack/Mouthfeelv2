import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tag } from '../../Components';

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
const SubmitFoodScreen = () => {
    const dummyData = [
        {
            text: "Crunchy",
            text: "Soft"
        }
    ];

    return (
        <View>
            <TextInput placeholder={'Name'} />
            <Text>Flavors</Text>
            <FlatList
                data={dummyData}
                renderItem={({ item }) => <Tag item={item} />}
                keyExtractor={item => item}
                horizontal />
            <Text>Textures</Text>
            <Text>Misc</Text>
        </View>
    )
}

export default SubmitFoodScreen;

const styles = StyleSheet.create({

});