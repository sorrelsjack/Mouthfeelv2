import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';
import { withTheme, Theme } from 'react-native-elements';
import { AttributeType, ThemeProp } from '../../Models';
import { ConvertHexToRgba, InvertColor } from '../../Common';
import { AddOrUpdateAttributeRequest, FoodDetails, MouthfeelState, VotableAttribute } from '../../Redux/Models';
import { connect, useDispatch } from 'react-redux';
import { AddOrUpdateAttributeAction } from '../../Redux/Actions';

type TagSize = 'small' | 'regular';

interface TagProps {
    userId: number,
    selected: {
        loading: boolean;
        data: FoodDetails | null
    }
    theme: ThemeProp,
    size?: TagSize,
    style?: object,
    item: VotableAttribute;
    attributeType: AttributeType;
}

// TODO: Need logic here to determine if a user needs tihs to be pre-selected or not -- probably requires a backend change
const Tag = (props: TagProps) => {
    const { 
        userId,
        selected,
        theme, 
        size = 'regular', 
        style, 
        item, 
        attributeType 
    } = props;
    const { id, name, votes, sentiment, description } = item;

    const [tooltipHeight, setTooltipHeight] = useState(size === 'regular' ? 60 : 40);
    const [isPressed, setIsPressed] = useState(false);

    const dispatch = useDispatch();

    const styles = createStyles(size);

    const iconSize = size === 'regular' ? 18 : 14;

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: InvertColor(theme.primaryThemeColor) }
        : { ...styles.wrapper, backgroundColor: theme.primaryThemeColor }

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: InvertColor(theme.primaryThemeTextColor) }
        : { ...styles.text, color: theme.primaryThemeTextColor }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(InvertColor(theme.primaryThemeTextColor), .3) }
        : { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(theme.primaryThemeTextColor, .3) }

    const handlePress = () => {
        if (!selected.data || !userId) return;
        // TODO: Fix strange issue where this is effecting every single attribute
        // Might be related to the call to fetch food details
        const request: AddOrUpdateAttributeRequest = {
            foodId: selected.data?.id,
            userId: userId,
            attributeId: id
        };

        dispatch(AddOrUpdateAttributeAction(attributeType, request));
        setIsPressed(!isPressed);
    }

    const handleTextMount = (e) => {
        const { height } = e.nativeEvent.layout;
        setTooltipHeight(height + 30);
    }

    /*const calculateCurrentVoteTotal = () => {
        if (upvoted && sentiment !== 1) return details.votes + 1;
        if (downvoted && sentiment !== -1 && details.votes !== 0) return details.votes - 1;
        if (!upvoted && !downvoted && userId === details.userDetails.id && details.votes !== 0) return details.votes - 1;
        return details.votes;
    }*/

    const calculateCurrentVoteTotal = () => {
        if (isPressed) return (votes ?? 0) + 1;
        // TODO: There is logic that should be implemented here. Need to handle cases where we go into a screen with a tag pre-selected, and then un-selecting it
        // maybe need to know who originated this tag
        return votes;
    }

    useEffect(() => {
        if (sentiment > 0) setIsPressed(true);
    }, [sentiment])

    return (
        <View style={[setWrapperStyle(), style]}>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ flexDirection: 'row' }}>
                    {votes && <View style={setCounterContainerStyle()}>
                        <Text style={setTextStyle()}>{calculateCurrentVoteTotal()}</Text>
                    </View>}
                    <Text style={setTextStyle()}>{name}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <Tooltip
                    overlayColor='transparent'
                    backgroundColor={theme.tooltip.backgroundColor}
                    skipAndroidStatusBar
                    height={tooltipHeight}
                    popover={<Text onLayout={handleTextMount} style={{ color: theme.primaryThemeTextColor }}>{description.toLowerCase()}</Text>}>
                    <Icon name={'question-circle'} size={iconSize} solid color={isPressed ? InvertColor(theme.primaryThemeTextColor) : theme.primaryThemeTextColor} />
                </Tooltip>
            </View>
        </View>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        userId: state.user.profile.data?.id,
        selected: state.foods.selected
    }
})(Tag));

const createStyles = (size: TagSize) => StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    text: {
        textTransform: 'uppercase',
        fontSize: size === 'regular' ? 18 : 14,
        padding: 5
    },
    counterContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        marginRight: 5,
        paddingHorizontal: 7,
        flexGrow: 0,
    },
    iconContainer: {
        marginLeft: 5,
        paddingHorizontal: 7
    }
});