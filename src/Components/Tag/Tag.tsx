import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';
import { withTheme, Theme } from 'react-native-elements';
import { AttributeType, ThemeProp } from '../../Models';
import { ConvertHexToRgba, InvertColor } from '../../Common';
import { AddOrUpdateAttributeRequest, FoodDetails, MouthfeelState, VotableAttribute } from '../../Redux/Models';
import { connect, useDispatch } from 'react-redux';
import { AddOrUpdateAttributeAction } from '../../Redux/Actions';
import CustomText from '../CustomText/CustomText';

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
    const [tooltipWidth, setTooltipWidth] = useState(size === 'regular' ? 100 : 80)
    const [fontSize, setFontSize] = useState(size === 'regular' ? 18 : 11);
    const [isPressed, setIsPressed] = useState(false);

    const dispatch = useDispatch();

    const styles = createStyles(size, disabled);

    const currentVoteTotal = useMemo(() => {
        if (isPressed && votes === 1 && sentiment === 1) return 1;
        if (isPressed) return (votes ?? 0) + 1;
        return votes;
    }, [isPressed, votes, sentiment]);

    const wrapperStyle = useMemo(() => isPressed
        ? { ...styles.wrapper, backgroundColor: disabled ? 'rgba(80, 80, 80, .6)' : InvertColor(theme.primaryThemeColor) }
        : { ...styles.wrapper, backgroundColor: disabled ? 'rgba(80, 80, 80, .6)' : theme.primaryThemeColor }, [name, isPressed])

    const textStyle = useMemo(() => isPressed
        ? { ...styles.text, color: InvertColor(theme.primaryThemeTextColor), fontSize: fontSize }
        : { ...styles.text, color: theme.primaryThemeTextColor, fontSize: fontSize }, [name, fontSize, isPressed])

    const counterContainerStyle = useMemo(() => isPressed
        ? { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(InvertColor(theme.primaryThemeTextColor), .3) }
        : { ...styles.counterContainer, backgroundColor: ConvertHexToRgba(theme.primaryThemeTextColor, .3) }, [name, isPressed, currentVoteTotal])

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
        const { height, width } = e.nativeEvent.layout;
        setTooltipHeight(height + 30);
        setTooltipWidth(width + 30);
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
        <View style={[wrapperStyle, style]}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flexGrow: 1 }} disabled={disabled} onPress={handlePress}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {votes && <View style={counterContainerStyle}>
                            <CustomText adjustsFontSizeToFit style={textStyle}>{currentVoteTotal}</CustomText>
                        </View>}
                        <CustomText adjustsFontSizeToFit style={textStyle} onTextLayout={(e) => {
                            /*if (name.length >= MAX_CHARS_BEFORE_RESIZE && fontSize >= 10) {
                                const characterDifference = name.length - MAX_CHARS_BEFORE_RESIZE;
                                console.log(fontSize - characterDifference)
                                setFontSize(fontSize - characterDifference);
                            }*/
                        }}>{name}</CustomText>
                    </View>
                </TouchableOpacity>
                <View style={[styles.iconContainer, !votes ? { marginLeft: 0 } : {}]}>
                    <Tooltip
                        overlayColor='transparent'
                        backgroundColor={theme.tooltip.backgroundColor}
                        skipAndroidStatusBar
                        width={tooltipWidth}
                        height={tooltipHeight}
                        popover={<CustomText onLayout={handleTextMount} style={{ color: theme.primaryThemeTextColor, flexWrap: 'wrap' }}>{description.toLowerCase()}</CustomText>}>
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
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    text: {
        justifyContent: 'center',
        textTransform: 'uppercase',
        paddingHorizontal: 5
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