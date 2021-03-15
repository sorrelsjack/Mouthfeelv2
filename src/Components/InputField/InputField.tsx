import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config/SetTypography';

interface InputFieldProps {
    theme: ThemeProp,
    style?: object,
    textPosition?: 'top' | 'auto' | 'bottom' | 'center',
    secureTextEntry?: boolean,
    placeholder: string,
    placeholderTextColor?: string
    multiline?: boolean;
    value?: string
    onTextChange?: (value: string) => any;
}

const InputField = (props: InputFieldProps) => {
    const { 
        theme, 
        style,
        textPosition = 'top',
        secureTextEntry, 
        placeholder, 
        placeholderTextColor,
        multiline,
        value,
        onTextChange
    } = props;

    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={[styles.textInput, style]}
                textAlignVertical={textPosition}
                placeholderTextColor={placeholderTextColor}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                value={value}
                onChangeText={onTextChange} />
        </View>
    )
}

export default withTheme(InputField);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    textInput: {
        fontFamily: GlobalFontName
    }
})