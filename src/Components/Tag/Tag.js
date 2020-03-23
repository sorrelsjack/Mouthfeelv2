import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../../Common';

class Tag extends Component {
    state = {
        isPressed: false
    }

    setWrapperStyle = () => {
        if (this.state.isPressed)
            return { ...styles.wrapper, backgroundColor: Colors.tag.selected.backgroundColor }
        else
            return { ...styles.wrapper, backgroundColor: Colors.tag.unselected.backgroundColor }
    }

    setTextStyle = () => {
        if (this.state.isPressed)
            return { ...styles.text, color: Colors.tag.selected.textColor }
        else
            return { ...styles.text, color: Colors.tag.unselected.textColor }

    }

    handlePress = () => {
        this.setState({ isPressed: !this.state.isPressed })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={this.setWrapperStyle()}>
                    <Text style={this.setTextStyle()}>{'+ ' + this.props.text.toUpperCase()}</Text>    
                </View>                
            </TouchableOpacity>
        )
    }
}

export default Tag;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 30,
        marginHorizontal: 10
    },
    text: {
        fontSize: 18,
        padding: 5
    }
});