import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class HomeListItem extends Component {
    render() {
        return (
            <TouchableOpacity>
                    <Text style={styles.text}>{this.props.item}</Text>
            </TouchableOpacity>
        )
    }
}

export default HomeListItem;

const styles = StyleSheet.create({
    text: {
        padding: 20
    }
})