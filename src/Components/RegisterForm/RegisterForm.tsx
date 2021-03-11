import React, { useState } from 'react';
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

// TODO: Have a canSubmit conditional here
const RegisterForm = (props: RegisterFormProps) => {
    const { theme } = props;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // TODO: Have an error corresponding to this
    const passwordsMatch = password === confirmPassword;
    
    const styles = createStyles(theme);

    return (
        <View style={styles.wrapper}>
            <InputField 
                style={styles.inputField} 
                placeholder={'Email'} 
                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                value={email}
                onTextChange={setEmail} />
            <InputField 
                style={styles.inputField} 
                placeholder={'Username'} 
                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                value={username}
                onTextChange={setUsername} />
            <InputField 
                style={styles.inputField} 
                secureTextEntry 
                placeholder={'Password'} 
                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                value={password}
                onTextChange={setPassword} />
            <InputField 
                style={styles.inputField} 
                secureTextEntry 
                placeholder={'Confirm Password'} 
                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                value={confirmPassword}
                onTextChange={setConfirmPassword} />
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