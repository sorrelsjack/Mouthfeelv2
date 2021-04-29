import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../Common';

type ColorScheme = 'light' | 'dark';

interface ErrorTextProps {
    text: string;
    style?: object;
    scheme?: ColorScheme;
}

const ErrorText = (props: ErrorTextProps) => {
    const { text, style, scheme = 'light' } = props;

    return (
        <Text style={[styles(scheme).text, style]}>
            {text}
        </Text>
    )
}

export default ErrorText;

const styles = (scheme: ColorScheme) => StyleSheet.create({
    text: {
        color: scheme === 'light' ? Colors.errorColorLight : Colors.errorColorDark
    }
})