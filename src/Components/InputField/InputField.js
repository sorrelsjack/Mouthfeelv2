import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Colors } from './../../Common';

class InputField extends Component {
    render() {
        return(
            <View>
                <TextInput style={styles.textInput} placeholderTextColor={Colors.textInput.placeholderColor} numberOfLines={1} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placeholder}></TextInput>
            </View>
        )
    }
}

export default InputField;

const styles = StyleSheet.create({
    textInput: {
        color: Colors.textInput.textColor,
        borderBottomColor: Colors.textInput.lineColor,
        borderBottomWidth: 1
    }
})