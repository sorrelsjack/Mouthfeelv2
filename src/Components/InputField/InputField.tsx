import React, { useState } from 'react';
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
    value?: string;
    editable?: boolean;
    onBlur?: (value: string) => any;
    onTextChange?: (value: string) => any;
    onSubmitEditing?: (value: string) => any;
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
        editable = true,
        onBlur = (value: string) => {},
        onTextChange = (value: string) => {},
        onSubmitEditing = (value: string) => {}
    } = props;

    const styles = createStyles(theme);

    const [text, setText] = useState('');

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
                editable={editable}
                onBlur={() => onBlur(text)}
                onChangeText={(val) => { onTextChange(val); setText(val) }}
                onSubmitEditing={() => onSubmitEditing(text)} />
        </View>
    )
}

export default withTheme(InputField);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    textInput: {
        fontFamily: GlobalFontName
    }
})