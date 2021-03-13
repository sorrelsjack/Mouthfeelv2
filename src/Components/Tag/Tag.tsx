import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';
import { withTheme, Theme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { InvertColor } from '../../Common';

type TagSize = 'small' | 'regular';

interface TagProps {
    theme: ThemeProp,
    size?: TagSize,
    style?: object,
    item: {
        text: string,
        votes?: number,
        tooltipText: string
    }
}

const Tag = (props: TagProps) => {
    const { theme, size = 'regular', style, item } = props;
    const { text, votes, tooltipText } = item;

    const [tooltipHeight, setTooltipHeight] = useState(size === 'regular' ? 60 : 40);
    const [isPressed, setIsPressed] = useState(false);

    const styles = createStyles(size);

    const iconSize = size === 'regular' ? 18 : 14;

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: InvertColor(theme.primaryThemeColor) }
        : { ...styles.wrapper, backgroundColor: theme.primaryThemeColor }

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: InvertColor(theme.primaryThemeTextColor) }
        : { ...styles.text, color: theme.primaryThemeTextColor }

    // TODO: Invert this one
    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: theme.tag.counter.selected.backgroundColor }
        : { ...styles.counterContainer, backgroundColor: theme.tag.counter.unselected.backgroundColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    const handleTextMount = (e) => {
        const { height } = e.nativeEvent.layout;
        setTooltipHeight(height + 30);
    }

    return (
        <View style={[setWrapperStyle(), style]}>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ flexDirection: 'row' }}>
                    {votes && <View style={setCounterContainerStyle()}>
                        <Text style={setTextStyle()}>{votes}</Text>
                    </View>}
                    <Text style={setTextStyle()}>{text}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <Tooltip
                    overlayColor='transparent'
                    backgroundColor='rgba(0, 0, 0, .7)'
                    skipAndroidStatusBar
                    height={tooltipHeight}
                    popover={<Text onLayout={handleTextMount} style={{ color: 'white' }}>{tooltipText.toLowerCase()}</Text>}>
                    <Icon name={'question-circle'} size={iconSize} solid color={isPressed ? InvertColor(theme.primaryThemeTextColor) : theme.primaryThemeTextColor} />
                </Tooltip>
            </View>
        </View>
    )
}

export default withTheme(Tag);

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