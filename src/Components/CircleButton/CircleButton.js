import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CircleButton = props => {
    const { theme, icon } = props;
    let [selected, setSelected] = useState(false);

    const styles = createStyles(theme)

    return (
        <TouchableOpacity style={styles.heartContainer} onPress={() => setSelected(!selected)}>
            <Icon name={icon} solid size={20} color={selected ? props.iconSelectedColor : theme.primaryThemeTextColor} />
        </TouchableOpacity>
    )
}

export default withTheme(CircleButton);

const createStyles = (theme) => StyleSheet.create({
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