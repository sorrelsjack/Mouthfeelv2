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
    disabled?: boolean;
    onPress: (attributeId: number) => any;
}

const Tag = (props: TagProps) => {
    const {
        userId,
        selected,
        theme,
        size = 'regular',
        style,
        item,
        attributeType,
        disabled = false,
        onPress
    } = props;

    const { id, name, votes, sentiment, description } = item;

    const [tooltipHeight, setTooltipHeight] = useState(size === 'regular' ? 60 : 40);
    const [fontSize, setFontSize] = useState(size === 'regular' ? 18 : 11);
    const [isPressed, setIsPressed] = useState(false);

    const dispatch = useDispatch();

    const styles = createStyles(size, disabled);

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: disabled ? 'rgba(80, 80, 80, .6)' : InvertColor(theme.primaryThemeColor) }
        : { ...styles.wrapper, backgroundColor: disabled ? 'rgba(80, 80, 80, .6)' : theme.primaryThemeColor }

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: InvertColor(theme.primaryThemeTextColor), fontSize: fontSize }
        : { ...styles.text, color: theme.primaryThemeTextColor, fontSize: fontSize }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(InvertColor(theme.primaryThemeTextColor), .3) }
        : { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(theme.primaryThemeTextColor, .3) }

    const handlePress = () => {
        if (!userId) return;

        const request: AddOrUpdateAttributeRequest = {
            foodId: selected.data?.id,
            userId: userId,
            attributeId: id
        };

        onPress(id);
        if (!onPress) dispatch(AddOrUpdateAttributeAction(attributeType, request));
        setIsPressed(!isPressed);
    }

    const handleTextMount = (e) => {
        const { height } = e.nativeEvent.layout;
        setTooltipHeight(height + 30);
    }

    const calculateCurrentVoteTotal = () => {
        if (isPressed && votes === 1 && sentiment === 1) return 1;
        if (isPressed) return (votes ?? 0) + 1;
        return votes;
    }

    const MAX_CHARS_BEFORE_RESIZE = 7;

    useEffect(() => {
        if (name.length >= MAX_CHARS_BEFORE_RESIZE && size === 'small') {
            const characterDifference = name.length - MAX_CHARS_BEFORE_RESIZE;
            setFontSize(fontSize - (characterDifference * .5));
        }
    }, [name])

    useEffect(() => {
        if (sentiment > 0) setIsPressed(true);
    }, [sentiment])

    return (
        <View style={[setWrapperStyle(), style]}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flexGrow: 1 }} disabled={disabled} onPress={handlePress}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {votes && <View style={setCounterContainerStyle()}>
                            <Text adjustsFontSizeToFit style={setTextStyle()}>{calculateCurrentVoteTotal()}</Text>
                        </View>}
                        <Text adjustsFontSizeToFit style={setTextStyle()} onTextLayout={(e) => {
                            /*if (name.length >= MAX_CHARS_BEFORE_RESIZE && fontSize >= 10) {
                                const characterDifference = name.length - MAX_CHARS_BEFORE_RESIZE;
                                console.log(fontSize - characterDifference)
                                setFontSize(fontSize - characterDifference);
                            }*/
                        }}>{name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <Tooltip
                        overlayColor='transparent'
                        backgroundColor={theme.tooltip.backgroundColor}
                        skipAndroidStatusBar
                        height={tooltipHeight}
                        popover={<Text onLayout={handleTextMount} style={{ color: theme.primaryThemeTextColor }}>{description.toLowerCase()}</Text>}>
                        <Icon
                            name={'question-circle'}
                            size={fontSize}
                            solid
                            color={isPressed ? InvertColor(theme.primaryThemeTextColor) : theme.primaryThemeTextColor} />
                    </Tooltip>
                </View>
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

const createStyles = (size: TagSize, disabled: boolean) => StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    text: {
        justifyContent: 'center',
        textTransform: 'uppercase',
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
        justifyContent: 'flex-end',
        marginLeft: 5,
        paddingHorizontal: 7
    }
});