import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GetColor } from './../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';

const Tag = (props) => {
    const { text, votes, tooltipText } = props.item;
    const [isPressed, setIsPressed] = useState(false);

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: GetColor().tag.selected.backgroundColor }
        : { ...styles.wrapper, backgroundColor: GetColor().tag.unselected.backgroundColor }

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: GetColor().tag.selected.textColor }
        : { ...styles.text, color: GetColor().tag.unselected.textColor }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: GetColor().tag.counter.selected.backgroundColor }
        : { ...styles.counterContainer, backgroundColor: GetColor().tag.counter.unselected.backgroundColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    // TODO: Fix tooltip so it expands with the text

    return (
        <View style={setWrapperStyle()}>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={setCounterContainerStyle()}>
                        <Text style={setTextStyle()}>{votes || 0}</Text>
                    </View>
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
                    <Icon name={'question-circle'} size={18} solid color={isPressed ? GetColor().tag.icon.selected.color : GetColor().tag.icon.unselected.color} />
                </Tooltip>
            </View>
        </View>
    )
}

export default Tag;

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