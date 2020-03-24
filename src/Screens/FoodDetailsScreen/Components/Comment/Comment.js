import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from './../../../../Common';

const Comment = (props) => {
    let [upvoted, setUpvoted] = useState(false);
    let [downvoted, setDownvoted] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={() => { setUpvoted(!upvoted); setDownvoted(false); }}>
                    <Icon style={styles.icon} fontSize={16} name={'arrow-up'} color={upvoted ? Colors.comment.arrow.up.color : Colors.comment.arrow.default.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setDownvoted(!downvoted); setUpvoted(false); }}>
                    <Icon style={styles.icon} fontSize={16} name={'arrow-down'} color={downvoted ? Colors.comment.arrow.down.color : Colors.comment.arrow.default.color} />
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20
    },
    arrowContainer: {
        paddingRight: 5,
        flexDirection: 'column'
    },
    icon: {
        paddingVertical: 2.5,
        paddingHorizontal: 5
    },
    text: {
        fontSize: 16
    }
})