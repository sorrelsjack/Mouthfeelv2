import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../../Common';

class Tag extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.handlePress}>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>    
                </View>                
            </TouchableOpacity>
        )
    }
}

export default Tag;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: Colors.tag.backgroundColor,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 30,
        marginHorizontal: 10
    },
    text: {
        fontSize: 18,
        color: Colors.tag.textColor,
        padding: 5
    }
});