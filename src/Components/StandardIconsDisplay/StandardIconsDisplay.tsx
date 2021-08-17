import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { ThemeProp } from '../../Models';
import { FoodDetails } from '../../Redux/Models/FoodDetails';
import { FormatAsTitleCase, Routes } from '../../Common'
import { SetSelectedFoodAction, AddOrRemoveFoodToTryAction, ManageFoodSentimentAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';
import { LoadingSpinner, Tag } from '..';
import { withTheme, Theme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FoodSummary } from '../../Redux/Models';

interface StandardIconsDisplayProps {
    theme: ThemeProp,
    foodSummary: FoodSummary;
}

const StandardIconsDisplay = (props: StandardIconsDisplayProps) => {
    const { theme } = props;
    const { id, sentiment, toTry } = props.foodSummary ?? {};

    const dispatch = useDispatch();

    const [markedLiked, setMarkedLiked] = useState(false);
    const [markedDisliked, setMarkedDisliked] = useState(false);
    const [markedToTry, setMarkedToTry] = useState(false);

    useEffect(() => {
        if (sentiment === 1) setMarkedLiked(true);
        if (sentiment === -1) setMarkedDisliked(true);
    }, [sentiment])

    useEffect(() => {
        setMarkedToTry(toTry);
    }, [toTry])

    const handleLikedPressed = () => {
        const updatedStatus = !markedLiked;

        setMarkedLiked(updatedStatus);
        if (updatedStatus === true) setMarkedDisliked(false);
        dispatch(ManageFoodSentimentAction(id, updatedStatus === true ? 1 : 0));
    }

    const handleDislikedPressed = () => {
        const updatedStatus = !markedDisliked;

        setMarkedDisliked(updatedStatus);
        if (updatedStatus === true) setMarkedLiked(false);
        dispatch(ManageFoodSentimentAction(id, updatedStatus === true ? -1 : 0));
    }

    const handleToTryPressed = () => {
        const updatedStatus = !markedToTry;

        setMarkedToTry(updatedStatus);
        dispatch(AddOrRemoveFoodToTryAction(id));
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.icon} onPress={handleLikedPressed}>
                <Icon name='heart' size={16} solid={markedLiked} color={markedLiked ? theme.heartSelectedColor : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={handleDislikedPressed}>
                <Icon name='heart-broken' size={16} color={markedDisliked ? theme.heartSelectedColor : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={handleToTryPressed}>
                <Icon name='bookmark' size={16} solid={markedToTry} color={markedToTry ? theme.bookmarkSelectedColor : 'black'} />
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(StandardIconsDisplay);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },
    icon: {
        marginVertical: 7,
        marginHorizontal: 5
    }
});