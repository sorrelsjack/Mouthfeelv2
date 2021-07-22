import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Text
} from 'react-native';
import { InputField } from '..';
import { ThemeProp } from '../../Models';
import { withTheme } from 'react-native-elements';
import { ApiOperation, CreateUserRequest, MouthfeelState } from '../../Redux/Models';
import ErrorText from '../ErrorText';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

interface RegisterFormProps {
    theme: ThemeProp;
    createNewUser: ApiOperation;
    onSubmitAllowed: (request: CreateUserRequest) => any;
}

const RegisterForm = (props: RegisterFormProps) => {
    const { theme, createNewUser, onSubmitAllowed } = props;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordsMatch = password === confirmPassword;
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

    useEffect(() => {
        if (createNewUser.success) Toast.show('User created successfully!');
    }, [createNewUser])

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
            {(!passwordsMatch && password.length >= 1 && !createNewUser.error) ? <ErrorText text='Passwords must match!' scheme='dark' style={{ marginTop: 10 }} /> : null}
            {createNewUser.error ? <ErrorText text={createNewUser.error.Message} scheme='dark' style={{ marginTop: 10 }} /> : null}
        </KeyboardAvoidingView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {

    return {
        createNewUser: state.user.createNewUser
    }

})(RegisterForm));

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