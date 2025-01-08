import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView
} from 'react-native';
import { Comment } from '..';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';
import { BaseAnimatedView, LoadingSpinner, InputField, ErrorText, CustomText } from '../../../../Components';
import LottieView from 'lottie-react-native';
import { CreateCommentAction, GetCommentsForFoodAction, GetCurrentUserAction } from '../../../../Redux/Actions';
import { FoodDetails, MouthfeelState, Comment as CommentModel, ApiOperation, CreateCommentRequest, ApiData } from '../../../../Redux/Models';
import { IsIos } from '../../../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface CommentsSectionProps {
    theme: ThemeProp,
    userId?: number,
    create: ApiOperation,
    comments: ApiData<CommentModel[]>,
    selected: {
        loading: boolean,
        data: FoodDetails
    },
}

const CommentsSection = (props: CommentsSectionProps) => {
    const { theme, create, userId, selected, comments } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [componentIsReady, setComponentIsReady] = useState(false);
    const [newComment, setNewComment] = useState('');

    const dispatch = useDispatch();
    const styles = createStyles(theme);

    const buttonDisabled = !userId || create.loading;

    const sortItems = (items: CommentModel[]) =>
        items ? items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) || a.dateTime < b.dateTime ? 1 : -1) : [];

    useEffect(() => {
        if (create.success) setNewComment('');
    }, [create])

    const handleHeaderTextPressed = () => {
        if (!isExpanded) dispatch(GetCommentsForFoodAction(selected?.data?.id));
        setComponentIsReady(!isExpanded ? true : false);
        setIsExpanded(!isExpanded);
    }

    const handleButtonPressed = () => {
        // TODO: Need UX for this
        if (!userId) return;

        const request: CreateCommentRequest = {
            userId,
            foodId: selected?.data?.id,
            body: newComment
        }

        if (!userId) dispatch(GetCurrentUserAction());
        dispatch(CreateCommentAction(request));
    }

    const getButtonStyle = () => {
        return !buttonDisabled ? styles.button : { ...styles.button, opacity: .7 };
    }

    const NoCommentsView = () => {

        const LottieComponent = () => {
            return (
                <LottieView
                    style={styles.image}
                    source={require('../../../../Assets/no_comments.json')}
                    autoPlay />
            )
        }

        return (
            <BaseAnimatedView
                text='There are no comments here. Add the first!'
                fontSize={16}
                view={<LottieComponent />} />
        )
    }

    const CommentList = () => {
        return (
            <View>
                {comments?.loading
                    ? <LoadingSpinner fontSize={16} />
                    : <View>
                        <FlatList
                            data={comments?.data ? sortItems(comments.data) : []}
                            renderItem={({ item }) => <Comment details={item} />}
                            keyExtractor={item => item.id.toString()} />
                    </View>}
                {(!comments?.loading && !comments?.data?.length && componentIsReady) && <NoCommentsView />}
            </View>

        )
    }

    return (
        <KeyboardAvoidingView
            behavior={IsIos() ? 'height' : 'height'}
            style={styles.wrapper}>
            <TouchableOpacity onPress={handleHeaderTextPressed}>
                <CustomText style={styles.headerText}>{isExpanded ? `- COMMENTS` : '+ COMMENTS'}</CustomText>
            </TouchableOpacity>
            {isExpanded ?
                <View style={styles.commentInputContainer}>
                    <View style={{ width: newComment.length ? '90%' : '100%' }}>
                        <InputField
                            multiline
                            editable={!comments.loading}
                            onBlur={setNewComment}
                            onSubmitEditing={setNewComment}
                            placeholder={`Describe what ${selected?.data ? selected.data.name : 'this food'} is like!`}
                            placeholderTextColor={'rgba(0, 0 , 0 , .7)'}
                            style={styles.commentInput} />
                    </View>
                    {newComment.length ? <View style={styles.buttonContainer}>
                        <TouchableOpacity disabled={buttonDisabled} style={getButtonStyle()} onPress={handleButtonPressed}>
                            <Icon name='paper-plane' size={16} solid color={theme.primaryThemeTextColor} />
                        </TouchableOpacity>
                    </View> : null}
                </View> : null}
            {isExpanded && create.error ? <ErrorText text='There was an error submitting this comment.' style={{ marginTop: 10 }} /> : null}
            { isExpanded && <CommentList />}
        </KeyboardAvoidingView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    const { selected } = state.foods;

    return {
        create: state.comments.create,
        comments: state.comments.byFood,
        userId: state.user.profile.data?.id,
        selected
    }

})(CommentsSection));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        backgroundColor: theme.section.backgroundColor,
        padding: 20
    },
    headerText: {
        color: theme.clickableTextColor
    },
    commentInputContainer: {
        flexDirection: 'row'
    },
    commentInput: {
        width: '100%',
        marginTop: 20,
        backgroundColor: theme.page.backgroundColor
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:
            theme.primaryThemeColor,
        padding: 10
    },
    image: {
        width: '80%',
        height: 150
    }
})