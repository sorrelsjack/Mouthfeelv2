import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface AttributeListAddButton {
    theme: ThemeProp,
    onPress: () => any;
}

// TODO: Add functionality to add more flavors and textures on press of this button
const AttributeListAddButton = (props: AttributeListAddButton) => {
    const { theme, onPress } = props;

    const styles = createStyles(theme);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='plus' size={14} color={theme.primaryThemeTextColor} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(AttributeListAddButton);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        padding: 15,
        flexGrow: 0,
        marginRight: 7,
        backgroundColor: theme.primaryThemeColor
    },
});