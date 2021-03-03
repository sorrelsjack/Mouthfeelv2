import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { InputField } from '..';
import { ThemeProp } from '../../Models';
import { withTheme } from 'react-native-elements';

interface RegisterFormProps {
    theme: ThemeProp
}

const RegisterForm = (props: RegisterFormProps) => {
    const { theme } = props;
    
    const styles = createStyles(theme);

    return (
        <View style={styles.wrapper}>
            <InputField style={styles.inputField} placeholder={'Email'} placeholderTextColor={theme.loginScreen.textInput.placeholderColor} />
            <InputField style={styles.inputField} placeholder={'Username'} placeholderTextColor={theme.loginScreen.textInput.placeholderColor} />
            <InputField style={styles.inputField} secureTextEntry placeholder={'Password'} placeholderTextColor={theme.loginScreen.textInput.placeholderColor} />
            <InputField style={styles.inputField} secureTextEntry placeholder={'Confirm Password'} placeholderTextColor={theme.loginScreen.textInput.placeholderColor} />
        </View>
    )
}

export default withTheme(RegisterForm);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingBottom: 30
    },
    inputField: {
        borderBottomWidth: 1,
        color: theme.loginScreen.textInput.textColor,
        borderBottomColor: theme.loginScreen.textInput.lineColor
    },
})