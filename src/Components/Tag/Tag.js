import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Tag extends Component {
    state = {
        isPressed: false
    }

    // TODO: Implement tooltip
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

    setCounterContainerStyle = () => {
        if (this.state.isPressed)
            return { ...styles.counterContainer, backgroundColor: Colors.tag.counter.selected.backgroundColor }
        else
            return { ...styles.counterContainer, backgroundColor: Colors.tag.counter.unselected.backgroundColor }
    }

    handlePress = () => {
        // TODO Increase or decrease the number
        this.setState({ isPressed: !this.state.isPressed })
    }

    render() {
        return (
            <View style={this.setWrapperStyle()}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={this.setCounterContainerStyle()}>
                            <Text style={this.setTextStyle()}>12</Text>
                        </View>
                        <Text style={this.setTextStyle()}>{this.props.text.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                        <Icon name={'question-circle'} size={18} solid color={this.state.isPressed ? Colors.tag.icon.selected.color : Colors.tag.icon.unselected.color} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Tag;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    text: {
        fontSize: 18,
        padding: 5
    },
    counterContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        marginRight: 5,
        paddingHorizontal: 7,
        flexGrow: 0,
    },
    iconContainer: {
        marginLeft: 5,
        paddingHorizontal: 7
    }
});