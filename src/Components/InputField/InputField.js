import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

class InputField extends Component {
    render() {
        return(
            <View>
                <TextInput style={styles.textInput} placeholderTextColor={'black'} numberOfLines={1} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placeholder}></TextInput>
            </View>
        )
    }
}

export default InputField;

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#000',
        borderBottomWidth: 1
    }
})