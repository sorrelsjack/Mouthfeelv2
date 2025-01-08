import React, {  } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { CustomText } from '../../Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface ButtonProps {
    onPress: () => any;
    style?: object,
    theme: ThemeProp;
    text: string;
    textStyle?: object;
    backgroundColor?: string;
    textColor?: string;
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    const { 
        onPress,
        style,
        theme, 
        text,
        textStyle,
        backgroundColor = theme.primaryThemeColor, 
        textColor = theme.primaryThemeTextColor,
        disabled
    } = props;

    const getBackgroundStyles = () => [styles.button, style, { backgroundColor: disabled ? theme.disabledButton.backgroundColor : backgroundColor }];

    const getTextStyles = () => [styles.buttonText, textStyle, { color: disabled ? theme.disabledButton.textColor : textColor }];

    return (
        <TouchableOpacity style={getBackgroundStyles()} disabled={disabled} onPress={onPress}>
            <CustomText style={getTextStyles()}>{text}</CustomText>
        </TouchableOpacity>
    )
}

export default withTheme(Button);

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})