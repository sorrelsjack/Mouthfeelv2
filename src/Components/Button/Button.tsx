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
import { Tag, AttributeList, LoadingSpinner, InputField } from '../../Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GetAllVotableAttributesAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest } from '../../Redux/Models';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';

interface ButtonProps {
    onPress: () => any;
    theme: ThemeProp;
    text: string;
    backgroundColor?: string;
    textColor?: string;
}

const Button = (props: ButtonProps) => {
    const { 
        onPress, 
        theme, 
        text, 
        backgroundColor = theme.primaryThemeColor, 
        textColor = theme.primaryThemeTextColor
    } = props;

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: backgroundColor }]} onPress={onPress}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
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