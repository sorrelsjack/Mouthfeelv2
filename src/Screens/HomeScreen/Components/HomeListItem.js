import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Routes } from './../../../Common';

class HomeListItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
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