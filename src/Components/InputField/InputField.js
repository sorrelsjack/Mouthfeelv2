import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Colors } from './../../Common';

const InputField = (props) => {
    const { secureTextEntry, placeholder } = props;

    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={Colors.textInput.placeholderColor}
                numberOfLines={1}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder} />
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    textInput: {
        color: Colors.textInput.textColor,
        borderBottomColor: Colors.textInput.lineColor,
        borderBottomWidth: 1
    }
})