import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ThemeProp } from '../../Models';

interface CircleButtonProps {
    theme: ThemeProp,
    icon: string,
    iconSelectedColor: string
}

const CircleButton = (props: CircleButtonProps) => {
    const { theme, icon, iconSelectedColor } = props;
    let [selected, setSelected] = useState(false);

    const styles = createStyles(theme)

    return (
        <TouchableOpacity style={styles.heartContainer} onPress={() => setSelected(!selected)}>
            <Icon name={icon} solid size={20} color={selected ? iconSelectedColor : theme.primaryThemeTextColor} />
        </TouchableOpacity>
    )
}

export default withTheme(CircleButton);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    heartContainer: {
        borderRadius: 50,
        margin: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.primaryThemeColor
    }
})