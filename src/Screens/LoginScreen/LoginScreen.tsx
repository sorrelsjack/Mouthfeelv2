import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { InputField, RegisterForm, Button } from '../../Components';
import LinearGradient from 'react-native-linear-gradient';
import { Routes, RetrieveJwt, JwtIsValid, IsIos } from '../../Common';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { AuthenticateUserAction, GetCurrentUserAction, RegisterUserAction } from '../../Redux/Actions';
import { MouthfeelState, AuthenticateUserResponse, ApiError, ApiData, CreateUserRequest } from '../../Redux/Models';

interface LoginScreenProps {
    theme: ThemeProp,
    profile: ApiData<AuthenticateUserResponse>,
    navigation: any // TODO: Fix
}

const LoginScreen = (props: LoginScreenProps) => {
    const { theme, profile, navigation } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationRequest, setRegistrationRequest] = useState<CreateUserRequest>();
    const [canRegister, setCanRegister] = useState(false);

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const canLogin = (showLoginForm && !profile.loading && (username && password)) || showRegisterForm;

    const dispatch = useDispatch();
    const styles = createStyles(theme);

    useEffect(() => {
        const maybeNavigateToHomeScreen = async () => {
            const jwt = await RetrieveJwt();
            if (JwtIsValid(jwt)) navigation.replace(Routes.Home);
        }

        maybeNavigateToHomeScreen();
    }, [])

    useEffect(() => {
        if (!profile.error) return;

        Keyboard.dismiss();

    }, [profile.error])

    useEffect(() => {
        if (!profile.data) return;

        navigation.replace(Routes.Home);

    }, [profile.data]);

    const handleRegisterAllowed = (request: CreateUserRequest) => {
        setCanRegister(true);
        setRegistrationRequest(request);
    }

    const handleLoginPressed = () => {
        if (!showLoginForm) {
            setShowLoginForm(true);
            setShowRegisterForm(false);
            return;
        }

        if (canLogin) dispatch(AuthenticateUserAction(username, password));
    }

    const handleRegisterPressed = () => {
        setShowRegisterForm(true);
        setShowLoginForm(false);

        if (!registrationRequest) return;
        if (canRegister) dispatch(RegisterUserAction(registrationRequest));
    }

    return (
        <LinearGradient colors={[theme.loginScreen.gradient.topColor, theme.loginScreen.gradient.bottomColor]} style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Mouthfeel</Text>
                <View style={styles.inputFieldsContainer}>
                    {showLoginForm &&
                        <>
                            <InputField
                                style={styles.inputField}
                                placeholder={'Username'}
                                value={username}
                                onTextChange={setUsername}
                                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                                secureTextEntry={false} />
                            <InputField
                                style={styles.inputField}
                                placeholder={'Password'}
                                value={password}
                                onTextChange={setPassword}
                                placeholderTextColor={theme.loginScreen.textInput.placeholderColor}
                                secureTextEntry={true} />
                        </>}
                    {showRegisterForm && <RegisterForm onSubmitAllowed={handleRegisterAllowed} />}
                </View>
                <Button
                    style={styles.loginButton}
                    backgroundColor={theme.loginScreen.loginButton.backgroundColor}
                    textColor={theme.loginScreen.loginButton.textColor}
                    disabled={!canLogin}
                    onPress={handleLoginPressed}
                    text='Log In' />
                {profile.error ? <Text>{profile.error.Message}</Text> : null}
                <Button
                    style={styles.registerButton}
                    backgroundColor={theme.loginScreen.registerButton.backgroundColor}
                    textColor={theme.loginScreen.registerButton.textColor}
                    disabled={showRegisterForm && !canRegister}
                    onPress={handleRegisterPressed}
                    text='Register' />
            </View>
        </LinearGradient>
    )

}

export default withTheme(connect((state: MouthfeelState) => {

    return {
        profile: state.user.profile
    }

})(LoginScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '80%'
    },
    title: {
        color: theme.loginScreen.title.textColor,
        fontSize: 48
    },
    inputField: {
        borderBottomWidth: 1,
        color: theme.loginScreen.textInput.textColor,
        borderBottomColor: theme.loginScreen.textInput.lineColor
    },
    inputFieldsContainer: {
        width: '100%'
    },
    loginButton: {
        borderRadius: 30,
        marginVertical: 25,
        backgroundColor: theme.loginScreen.loginButton.backgroundColor,
        width: '100%',
        paddingVertical: 10
    },
    loginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.loginScreen.loginButton.textColor
    },
    registerButton: {
        backgroundColor: theme.loginScreen.registerButton.backgroundColor,
        borderRadius: 30,
        position: 'absolute',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0
    },
    registerButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.loginScreen.registerButton.textColor
    },
});