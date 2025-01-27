import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ThemeProp } from '../../Models';
import { FoodDetails } from '../../Redux/Models/FoodDetails';
import { FormatAsTitleCase } from '../../Common'
import { AddOrRemoveFoodToTryAction, ManageFoodSentimentAction } from '../../Redux/Actions';
import { withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';

interface StandardIconsDisplayProps {
    theme: ThemeProp,
    foodDetails: FoodDetails;
}

const StandardIconsDisplay = (props: StandardIconsDisplayProps) => {
    const { theme } = props;
    const { id, name, sentiment, toTry } = props.foodDetails ?? {};

    const dispatch = useDispatch();

    const [markedLiked, setMarkedLiked] = useState(false);
    const [markedDisliked, setMarkedDisliked] = useState(false);
    const [markedToTry, setMarkedToTry] = useState(false);

    const delayedDispatch = useCallback(_.debounce((foodId: number, sentiment: number) =>
    dispatch(ManageFoodSentimentAction(foodId, sentiment)), 500), []);

    useEffect(() => {
        if (sentiment === 1) setMarkedLiked(true);
        if (sentiment === -1) setMarkedDisliked(true);
    }, [sentiment])

    useEffect(() => {
        setMarkedToTry(toTry);
    }, [toTry])

    // TODO: Rework this logic -- could probably be condensed with the disliked function
    const handleLikedPressed = () => {
        const updatedStatus = !markedLiked;

        setMarkedLiked(updatedStatus);
        if (updatedStatus === true) setMarkedDisliked(false);
        Toast.show(`'${FormatAsTitleCase(name)}' ${!updatedStatus ? 'added to' : 'removed from'} list of liked foods!`);
        delayedDispatch(id, updatedStatus === true ? 1 : 0);
    }

    const handleDislikedPressed = () => {
        const updatedStatus = !markedDisliked;

        setMarkedDisliked(updatedStatus);
        if (updatedStatus === true) setMarkedLiked(false);
        Toast.show(`'${FormatAsTitleCase(name)}' ${!updatedStatus ? 'added to' : 'removed from'} list of disliked foods!`);
        delayedDispatch(id, updatedStatus === true ? -1 : 0);
    }

    const handleToTryPressed = () => {
        const initialMarkedToTry = markedToTry;
        setMarkedToTry(!markedToTry);
        Toast.show(`'${FormatAsTitleCase(name)}' ${!initialMarkedToTry ? 'added to' : 'removed from'} list of foods to try!`);
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