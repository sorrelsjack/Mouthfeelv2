import React, { useEffect, useState } from 'react';
import {
    StyleSheet
} from 'react-native';
import { InputField } from '..';
import { ThemeProp } from '../../Models';
import { withTheme } from 'react-native-elements';
import { CreateUserRequest, MouthfeelState } from '../../Redux/Models';
import ErrorText from '../ErrorText';
import Toast from 'react-native-simple-toast';
import { useAppStore } from '../../Hooks/useAppStore';

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

    const passwordsMatch = password === confirmPassword;
    const canSubmit = !!email && !!username && passwordsMatch;
    const createNewUser = useAppStore(s => s.user.createNewUser)

    const styles = createStyles(theme);

    useEffect(() => {
        const request: CreateUserRequest = {
            username: username,
            password: password,
            email: email
        };

        if (canSubmit) onSubmitAllowed(request);
    }, [canSubmit]);

    useEffect(() => {
        if (createNewUser.success) Toast.show('User created successfully!');
    }, [createNewUser])

    return (
        <>
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
            {(!passwordsMatch && password.length >= 1 && !createNewUser.error) ? <ErrorText text='Passwords must match!' scheme='dark' style={styles.errorText} /> : null}
            {createNewUser.error ? <ErrorText text={createNewUser.error.Message} scheme='dark' style={styles.errorText} /> : null}
        </>
    )
}

export default withTheme(RegisterForm)

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    inputField: {
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        color: theme.loginScreen.textInput.textColor,
        borderBottomColor: theme.loginScreen.textInput.lineColor
    },
    errorText: {
        marginTop: 10
    }
})