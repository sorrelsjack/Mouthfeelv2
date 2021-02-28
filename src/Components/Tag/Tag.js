import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';
import { withTheme } from 'react-native-elements';

const Tag = (props) => {
    const { theme, style } = props;
    const { text, votes, tooltipText } = props.item;
    const [isPressed, setIsPressed] = useState(false);

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
                    height={60}
                    popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}>
                    <Icon name={'question-circle'} size={18} solid color={isPressed ? theme.tag.icon.selected.color : theme.primaryThemeTextColor} />
                </Tooltip>
            </View>
        </View>
    )
}

export default withTheme(Tag);

const styles = StyleSheet.create({
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
        fontSize: 18,
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