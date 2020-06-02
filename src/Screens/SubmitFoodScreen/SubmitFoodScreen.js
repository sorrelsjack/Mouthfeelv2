import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
const SubmitFoodScreen = () => {
    return (
        <View>
            <TextInput placeholder={'Name'} />
            <Text>Flavors</Text>
            <Text>Textures</Text>
            <Text>Misc</Text>
        </View>
    )
}

export default SubmitFoodScreen;

const styles = StyleSheet.create({

});