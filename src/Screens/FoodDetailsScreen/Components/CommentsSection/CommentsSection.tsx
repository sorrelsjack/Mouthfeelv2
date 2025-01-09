import { FlashList } from '@shopify/flash-list';
import { isNil } from 'lodash/fp';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { Comment } from '..';
import { BaseAnimatedView, CustomText, ErrorText, InputField, LoadingSpinner } from '../../../../Components';
import { useAppStore } from '../../../../Hooks/useAppStore';
import { ThemeProp } from '../../../../Models';
import { CreateCommentAction, GetCommentsForFoodAction, GetCurrentUserAction } from '../../../../Redux/Actions';
import { Comment as CommentModel, CreateCommentRequest } from '../../../../Redux/Models';

interface CommentsSectionProps {
    theme: ThemeProp,
}

// TODO: Fix error here with virtualizedlists. seems to have to do with CommentList
const CommentsSection = (props: CommentsSectionProps) => {
    const { theme } = props;
    const create = useAppStore(s => s.comments.create);
    const comments = useAppStore(s => s.comments.byFood);
    const userId = useAppStore(s => s.user.profile.data?.id);
    const selected = useAppStore(s => s.foods.selected);

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

    if (isNil(selected.data)) return null;

    const handleHeaderTextPressed = () => {
        if (!selected.data) return;
        if (!isExpanded) dispatch(GetCommentsForFoodAction(selected.data?.id));
        setComponentIsReady(!isExpanded ? true : false);
        setIsExpanded(!isExpanded);
    }

    const handleButtonPressed = () => {
        // TODO: Need UX for this
        if (!userId || !selected.data) return;

        const request: CreateCommentRequest = {
            userId,
            foodId: selected.data?.id,
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
            <View style={{ flex: 1, flexGrow: 1, minHeight: 2 }}>
                {comments?.loading
                    ? <LoadingSpinner fontSize={16} />
                    : <View>
                        <FlashList
                            estimatedItemSize={100}
                            ListEmptyComponent={<NoCommentsView />}
                            data={comments?.data ? sortItems(comments.data) : []}
                            renderItem={({ item }) => <Comment details={item} />}
                            keyExtractor={item => item.id.toString()} />
                    </View>}
            </View>

        )
    }

    return (
        <View style={styles.wrapper}>
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
                            placeholder={`Describe what ${selected.data ? selected.data.name : 'this food'} is like!`}
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
            {isExpanded && <CommentList />}
        </View>
    )
}

export default withTheme(CommentsSection);

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