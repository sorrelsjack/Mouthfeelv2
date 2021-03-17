import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import { Comment } from '..';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';
import { BaseAnimatedView, LoadingSpinner, InputField } from '../../../../Components';
import LottieView from 'lottie-react-native';
import { GetCommentsForFoodAction } from '../../../../Redux/Actions';
import { FoodDetails, MouthfeelState, Comment as CommentModel } from '../../../../Redux/Models';

interface CommentsSectionProps {
    theme: ThemeProp,
    selected: {
        loading: boolean,
        data: FoodDetails
    },
    comments: {
        loading: boolean,
        data: CommentModel[]
    }
}

// TODO: Fix issue where the empty view shows up before comments are even loading
// TODO: Add button for new comment UI
// TODO: Maybe snap the screen to scroll down to comments section end
const CommentsSection = (props: CommentsSectionProps) => {
    const { theme, selected, comments } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const dispatch = useDispatch();
    const styles = createStyles(theme);

    const sortItems = (items: CommentModel[]) =>
        items ? items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) ? 1 : -1) : [];

    const handleHeaderTextPressed = () => {
        if (!isExpanded) dispatch(GetCommentsForFoodAction(selected?.data?.id));
        setIsExpanded(!isExpanded)
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
                            keyExtractor={item => item.userDetails.id.toString()} />
                        {comments?.data?.length ?
                            <InputField
                                multiline
                                placeholder={`Describe what ${selected?.data ? selected.data.name : 'this food'} is like`}
                                placeholderTextColor={'rgba(0, 0 , 0 , .7)'}
                                style={{ backgroundColor: theme.page.backgroundColor }} /> : null}
                    </View>}
                {(!comments?.loading && !comments?.data?.length) && <NoCommentsView />}
            </View>

        )
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handleHeaderTextPressed}>
                <Text style={styles.headerText}>{isExpanded ? `- COMMENTS` : '+ COMMENTS'}</Text>
            </TouchableOpacity>
            { isExpanded && <CommentList />}
        </View>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    const { selected } = state.foods;

    return {
        comments: selected?.data?.id ? state.comments.byFood[selected?.data?.id] : [],
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
    image: {
        width: '80%',
        height: 150
    }
})