import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';
import { Comment as CommentModel, ManageCommentVoteRequest, AuthenticateUserResponse, MouthfeelState } from '../../../../Redux/Models';
import { GetCurrentUserAction, ManageCommentVoteAction } from '../../../../Redux/Actions';
import moment from 'moment';
import _ from 'lodash';

interface CommentProps {
    theme: ThemeProp,
    details: CommentModel;
    userId: number
}

const Comment = (props: CommentProps) => {
    const { theme, details, userId } = props;
    const { id, foodId, sentiment } = details;

    const dispatch = useDispatch();

    let [upvoted, setUpvoted] = useState(false);
    let [downvoted, setDownvoted] = useState(false);
    let [votes, setVotes] = useState(0);

    const delayedDispatch = useCallback(_.debounce((commentId: number, foodId: number, vote: number) =>
        dispatch(ManageCommentVoteAction({ commentId, foodId, vote })), 2000), []);

    useEffect(() => {
        if (!userId) dispatch(GetCurrentUserAction());
    }, [])

    useEffect(() => {
        if (!details) return;

        if (sentiment === 1) {
            setUpvoted(true);
            setDownvoted(false);
        }

        if (sentiment === -1) {
            setDownvoted(true);
            setUpvoted(false);
        }

        setVotes(details.votes ?? 0);

    }, [details])

    const handleUpArrowPressed = () => {
        const upcomingState = !upvoted;

        setVotes(calculateCurrentVoteTotal(upcomingState, false));

        setUpvoted(upcomingState);
        setDownvoted(false);

        delayedDispatch(id, foodId, upcomingState === true ? 1 : 0);
    }

    const handleDownArrowPressed = () => {
        const upcomingState = !downvoted;

        setVotes(calculateCurrentVoteTotal(false, upcomingState));

        setDownvoted(upcomingState);
        setUpvoted(false);

        delayedDispatch(id, foodId, upcomingState === true ? -1 : 0);
    }

    const calculateCurrentVoteTotal = (up: boolean, down: boolean) => {
        if (up) return votes + 1;
        else if (down && votes !== 0) return votes - 1;
        else if (!up && !down && userId === details.userDetails.id && votes !== 0) return votes - 1;
        return votes;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={handleUpArrowPressed}>
                    <Icon style={styles.icon} size={14} name={'arrow-up'} color={upvoted ? theme.clickableTextColor : theme.comment.arrow.default.color} />
                </TouchableOpacity>
                <Text style={styles.vote}>
                    {votes}
                </Text>
                <TouchableOpacity onPress={handleDownArrowPressed}>
                    <Icon style={styles.icon} size={14} name={'arrow-down'} color={downvoted ? theme.clickableTextColor : theme.comment.arrow.default.color} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={[styles.usernameText, styles.commentText]}>{details.userDetails.username}</Text>
                    <Text style={styles.dateText}>{`, ${moment(details.dateTime).format('MMM Do YYYY')}`}</Text>
                </View>
                <Text style={styles.commentText}>{details.body}</Text>
            </View>
        </View>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        userId: state.user.profile.data?.id
    }
})(Comment));

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
        fontSize: 14,
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 14,
    },
    commentText: {
        fontSize: 16
    }
})