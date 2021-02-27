import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GetColor } from './../../Common';

const InputField = (props) => {
    const { secureTextEntry, placeholder } = props;

    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={GetColor().textInput.placeholderColor}
                numberOfLines={1}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder} />
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    textInput: {
        color: GetColor().textInput.textColor,
        borderBottomColor: GetColor().textInput.lineColor,
        borderBottomWidth: 1
    }
})