import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../Common';
import CustomText from '../CustomText/CustomText';

type ColorScheme = 'light' | 'dark';

interface ErrorTextProps {
    text: string;
    style?: object;
    scheme?: ColorScheme;
}

const ErrorText = (props: ErrorTextProps) => {
    const { text, style, scheme = 'light' } = props;

    return (
        <CustomText style={[styles(scheme).text, style]}>
            {text}
        </CustomText>
    )
}

export default ErrorText;

const styles = (scheme: ColorScheme) => StyleSheet.create({
    text: {
        color: scheme === 'light' ? Colors.errorColorLight : Colors.errorColorDark
    }
})