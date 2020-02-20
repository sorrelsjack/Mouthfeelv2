import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Comment = (props) => {
    return (
        <View style={styles.wrapper}>
            <Text>{props.text}</Text>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    }
})