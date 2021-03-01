import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface AttributeListAddButton {
    theme: ThemeProp
}

// TODO: Add functionality to add more flavors and textures on press of this button
const AttributeListAddButton = (props: AttributeListAddButton) => {
    const { theme } = props;
    const [isPressed, setIsPressed] = useState(false);

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: theme.tag.selected.backgroundColor }
        : { ...styles.wrapper, backgroundColor: theme.primaryThemeColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    return (
        <View style={setWrapperStyle()}>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='plus' size={14} color={theme.primaryThemeTextColor} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(AttributeListAddButton);

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        paddingHorizontal: 15,
        flexGrow: 0,
        marginRight: 7
    },
});