import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GetColor } from './../../../../Common';

const Comment = (props) => {
    let [upvoted, setUpvoted] = useState(false);
    let [downvoted, setDownvoted] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={() => { setUpvoted(!upvoted); setDownvoted(false); }}>
                    <Icon style={styles.icon} fontSize={20} name={'arrow-up'} color={upvoted ? GetColor().comment.arrow.up.color : GetColor().comment.arrow.default.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setDownvoted(!downvoted); setUpvoted(false); }}>
                    <Icon style={styles.icon} fontSize={20} name={'arrow-down'} color={downvoted ? GetColor().comment.arrow.down.color : GetColor().comment.arrow.default.color} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={[styles.usernameText, styles.text]}>{props.details.username}</Text>
                <Text style={styles.text}>{props.details.body}</Text>
            </View>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 45
    },
    arrowContainer: {
        paddingRight: 5,
        flexDirection: 'column'
    },
    icon: {
        paddingVertical: 2.5,
        paddingHorizontal: 5
    },
    usernameText: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16
    }
})