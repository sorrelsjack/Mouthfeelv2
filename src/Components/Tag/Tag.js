import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tooltip } from 'react-native-elements';

const Tag = (props) => {
    const { text, votes } = props.item;
    const [isPressed, setIsPressed] = useState(false);

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: Colors.tag.selected.backgroundColor }
        : { ...styles.wrapper, backgroundColor: Colors.tag.unselected.backgroundColor }

    const setTextStyle = () => isPressed
        ? { ...styles.text, color: Colors.tag.selected.textColor }
        : { ...styles.text, color: Colors.tag.unselected.textColor }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: Colors.tag.counter.selected.backgroundColor }
        : { ...styles.counterContainer, backgroundColor: Colors.tag.counter.unselected.backgroundColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    // TODO: Populate tooltip with desc of flavor or texture

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
                    popover={<Text style={{ color: 'white' }}>{text}</Text>}>
                    <Icon name={'question-circle'} size={18} solid color={isPressed ? Colors.tag.icon.selected.color : Colors.tag.icon.unselected.color} />
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