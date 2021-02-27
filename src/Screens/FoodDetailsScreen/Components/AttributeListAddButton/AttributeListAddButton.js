import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GetColor } from '../../../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

// TODO: Add functionality to add more flavors and textures on press of this button
const AttributeListAddButton = (props) => {
    const [isPressed, setIsPressed] = useState(false);

    const setWrapperStyle = () => isPressed
        ? { ...styles.wrapper, backgroundColor: GetColor().tag.selected.backgroundColor }
        : { ...styles.wrapper, backgroundColor: GetColor().tag.unselected.backgroundColor }

    const setCounterContainerStyle = () => isPressed
        ? { ...styles.counterContainer, backgroundColor: GetColor().tag.counter.selected.backgroundColor }
        : { ...styles.counterContainer, backgroundColor: GetColor().tag.counter.unselected.backgroundColor }

    const handlePress = () => {
        // TODO Increase or decrease the number
        setIsPressed(!isPressed);
    }

    return (
        <View style={setWrapperStyle()}>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='plus' size={14} color={GetColor().tag.icon.unselected.color} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AttributeListAddButton;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        paddingHorizontal: 15,
        flexGrow: 0,
        marginRight: 7
    },
});