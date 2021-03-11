import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';

interface CommentProps {
    theme: ThemeProp,
    details: {
        body: string,
        username: string,
        totalScore: number
    }
}

const Comment = (props: CommentProps) => {
    const { theme, details } = props;
    let [upvoted, setUpvoted] = useState(false);
    let [downvoted, setDownvoted] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={() => { setUpvoted(!upvoted); setDownvoted(false); }}>
                    <Icon style={styles.icon} size={14} name={'arrow-up'} color={upvoted ? theme.clickableTextColor : theme.comment.arrow.default.color} />
                </TouchableOpacity>
                <Text style={styles.vote}>
                    {details.totalScore}
                </Text>
                <TouchableOpacity onPress={() => { setDownvoted(!downvoted); setUpvoted(false); }}>
                    <Icon style={styles.icon} size={14} name={'arrow-down'} color={downvoted ? theme.clickableTextColor : theme.comment.arrow.default.color} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={[styles.usernameText, styles.commentText]}>{details.username}</Text>
                <Text style={styles.commentText}>{details.body}</Text>
            </View>
        </View>
    )
}

export default withTheme(Comment);

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 45
    },
    arrowContainer: {
        paddingRight: 5,
        marginRight: 5,
        flexDirection: 'column'
    },
    icon: {
        paddingVertical: 2.5,
        paddingHorizontal: 5
    },
    vote: {
        alignSelf: 'center',
        paddingVertical: 2.5,
        paddingHorizontal: 5
    },
    usernameText: {
        fontWeight: 'bold'
    },
    commentText: {
        fontSize: 16
    }
})