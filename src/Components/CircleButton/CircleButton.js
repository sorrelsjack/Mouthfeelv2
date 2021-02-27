import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { GetColor } from './../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CircleButton = props => {
    const { icon } = props;
    let [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity style={styles.heartContainer} onPress={() => setSelected(!selected)}>
            <Icon name={icon} solid size={20} color={selected ? props.iconSelectedColor : GetColor().circleButton.icon.unselected.color} />
        </TouchableOpacity>
    )
}

export default CircleButton;

const styles = StyleSheet.create({
    heartContainer: {
        borderRadius: 50,
        margin: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: GetColor().circleButton.circleBackground.backgroundColor
      }
})