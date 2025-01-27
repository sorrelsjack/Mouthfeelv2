import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface AttributeListAddButton {
    theme: ThemeProp,
    onPress: () => any;
}

// TODO: make more circular
const AttributeListAddButton = (props: AttributeListAddButton) => {
    const { theme, onPress } = props;

    const styles = createStyles(theme);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Icon adjustsFontSizeToFit name='plus' color={theme.primaryThemeTextColor} />
                </View>
            </View>
        </TouchableOpacity>
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
    container: {
        flexDirection: 'row'
    }
});