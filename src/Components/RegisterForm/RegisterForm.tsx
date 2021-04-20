import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import { InputField } from '..';
import { ThemeProp } from '../../Models';
import { withTheme } from 'react-native-elements';
import { CreateUserRequest } from '../../Redux/Models';

interface RegisterFormProps {
    theme: ThemeProp;
    onSubmitAllowed: (request: CreateUserRequest) => any;
}

const RegisterForm = (props: RegisterFormProps) => {
    const { theme, onSubmitAllowed } = props;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // TODO: Have an error corresponding to this
    // TODO: handle any errors the register endpoint comes back wtih
    const passwordsMatch = password === confirmPassword && password.length >= 1;
    const canSubmit = !!email && !!username && passwordsMatch;
    
    const styles = createStyles(theme);

    useEffect(() => {
        const request: CreateUserRequest = {
            username: username,
            password: password,
            email: email
        };

        if (canSubmit) onSubmitAllowed(request);
    }, [canSubmit]);

    return (
        <KeyboardAvoidingView style={styles.wrapper}>
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
        </KeyboardAvoidingView>
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