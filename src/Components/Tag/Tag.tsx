import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';
import { withTheme, Theme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

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
// TODO: Type def here to have small vs normal sized tags

// TODO: Let's get the descriptions standardized in terms of case
// TODO: Put size defualt back to regular
const Tag = (props: TagProps) => {
    const { theme, size = 'regular', style, item } = props;
    const { text, votes, tooltipText } = item;
    const [isPressed, setIsPressed] = useState(false);

    const styles = createStyles(size);

    const iconSize = size === 'regular' ? 18 : 14;
    // TODO: Make the height vary on how much text there is
    const tooltipHeight = size === 'regular' ? 60 : 40;

    // TODO: Selected color could be the inverted version of unselected
    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: theme.tag.selected.backgroundColor }
        : { ...styles.wrapper, backgroundColor: theme.primaryThemeColor }

    console.log(setWrapperStyle())

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: theme.tag.selected.textColor }
        : { ...styles.text, color: theme.primaryThemeTextColor }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: theme.tag.counter.selected.backgroundColor }
        : { ...styles.counterContainer, backgroundColor: theme.tag.counter.unselected.backgroundColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    // TODO: Fix tooltip so it expands with the text
    // TODO: Move the loose colors into colors constant

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
                    popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}>
                    <Icon name={'question-circle'} size={iconSize} solid color={isPressed ? theme.tag.icon.selected.color : theme.primaryThemeTextColor} />
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