import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tag, AttributeList, LoadingSpinner, InputField, CustomText } from '../../Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GetAllVotableAttributesAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest } from '../../Redux/Models';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';

interface ButtonProps {
    onPress: () => any;
    style?: object,
    theme: ThemeProp;
    text: string;
    textStyle?: object;
    backgroundColor?: string;
    textColor?: string;
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    const { 
        onPress,
        style,
        theme, 
        text,
        textStyle,
        backgroundColor = theme.primaryThemeColor, 
        textColor = theme.primaryThemeTextColor,
        disabled
    } = props;

    const getBackgroundStyles = () => [styles.button, style, { backgroundColor: disabled ? theme.disabledButton.backgroundColor : backgroundColor }];

    const getTextStyles = () => [styles.buttonText, textStyle, { color: disabled ? theme.disabledButton.textColor : textColor }];

    return (
        <TouchableOpacity style={getBackgroundStyles()} disabled={disabled} onPress={onPress}>
            <CustomText style={getTextStyles()}>{text}</CustomText>
        </TouchableOpacity>
    )
}

export default withTheme(Button);

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})