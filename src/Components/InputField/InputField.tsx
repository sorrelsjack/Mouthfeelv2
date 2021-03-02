import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config/SetTypography';

interface InputFieldProps {
    theme: ThemeProp,
    style?: object,
    secureTextEntry?: boolean,
    placeholder: string,
    placeholderTextColor?: string
}

const InputField = (props: InputFieldProps) => {
    const { theme, style, secureTextEntry, placeholder, placeholderTextColor } = props;
    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={[styles.textInput, style]}
                placeholderTextColor={placeholderTextColor}
                numberOfLines={1}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder} />
        </View>
    )
}

export default withTheme(InputField);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    textInput: {
        fontFamily: GlobalFontName
    }
})