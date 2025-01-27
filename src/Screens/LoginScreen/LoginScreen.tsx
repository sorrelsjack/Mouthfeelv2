import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { IsIos, JwtIsValid, RetrieveJwt, Routes } from '../../Common';
import { Button, CustomText, ErrorText, InputField, RegisterForm } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { ThemeProp } from '../../Models';
import { AuthenticateUserAction, RegisterUserAction } from '../../Redux/Actions';
import { CreateUserRequest } from '../../Redux/Models';

interface LoginScreenProps {
    theme: ThemeProp
}

// TODO: Guest login
// TODO: Forgot PW
const LoginScreen = (props: LoginScreenProps) => {
    const { theme } = props;
    const profile = useAppStore(s => s.user.profile);
    const createNewUser = useAppStore(s => s.user.createNewUser)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationRequest, setRegistrationRequest] = useState<CreateUserRequest>();
    const [canRegister, setCanRegister] = useState(false);

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const canLogin = (showLoginForm && !profile.loading && (username && password)) || showRegisterForm;

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
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

    const handleGuestPressed = () => {
        // TODO: Fill this out
        // TODO: Create guest user flow. They'll only be able to search for foods
    }

    const handleRegisterPressed = () => {
        setShowRegisterForm(true);
        setShowLoginForm(false);

        if (!registrationRequest) return;
        if (canRegister) dispatch(RegisterUserAction(registrationRequest));
    }

    const LoadingView = () => {
        return (
            <View style={styles.loadingView}>
                <LottieView source={require('../../Assets/linear_loading.json')} autoPlay />
                <CustomText style={{ color: theme.primaryThemeTextColor, fontSize: 16 }}>Loading...</CustomText>
            </View>
        )
    }

    return (
        <LinearGradient colors={[theme.loginScreen.gradient.topColor, theme.loginScreen.gradient.bottomColor]} style={styles.wrapper}>
            <KeyboardAwareScrollView
                enableAutomaticScroll
                bounces={false}
                enableOnAndroid
                style={{ width: '100%' }}
                contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <CustomText style={styles.title}>Mouthfeel</CustomText>
                        <CustomText style={styles.subtitle}>A descriptive encyclopedia of food</CustomText>
                    </View>
                    <View style={styles.inputFieldsContainer}>
                        {showLoginForm &&
                            <>
                                {!profile.loading ? <><InputField
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
                                        secureTextEntry={true} /></> : <LoadingView />}

                            </>}
                        {(showRegisterForm) && (!createNewUser.loading ? <RegisterForm onSubmitAllowed={handleRegisterAllowed} /> : <LoadingView />)}
                    </View>
                    <Button
                        style={!showRegisterForm ? styles.topButton : styles.bottomButton}
                        backgroundColor={theme.loginScreen.loginButton.backgroundColor}
                        textColor={theme.loginScreen.loginButton.textColor}
                        disabled={!canLogin}
                        onPress={handleLoginPressed}
                        text='Log In' />
                    {(profile.error && !showRegisterForm) ? <ErrorText text={profile.error.Message} scheme='dark' style={{ marginTop: 10 }} /> : null}
                    {/*
                Fix this so that the button doesnt overlap the login button
                <Button
                    style={styles.guestButton}
                    onPress={handleGuestPressed}
                text='Proceed As Guest' />*/}
                    <Button
                        style={showRegisterForm ? styles.bottomButton : styles.topButton}
                        backgroundColor={theme.loginScreen.registerButton.backgroundColor}
                        textColor={theme.loginScreen.registerButton.textColor}
                        disabled={showRegisterForm && !canRegister}
                        onPress={handleRegisterPressed}
                        text='Register' />
                </View>
            </KeyboardAwareScrollView>
        </LinearGradient >
    )

}

export default withTheme(LoginScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%'
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '80%'
    },
    loadingView: {
        marginTop: 20,
        height: 100,
        alignItems: 'center'
    },
    title: {
        color: theme.loginScreen.title.textColor,
        fontSize: 48
    },
    subtitle: {
        color: theme.loginScreen.title.textColor,
        textAlign: 'center',
        fontSize: 18
    },
    inputField: {
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        color: theme.loginScreen.textInput.textColor,
        borderBottomColor: theme.loginScreen.textInput.lineColor,
        marginVertical: IsIos() ? 15 : 0
    },
    inputFieldsContainer: {
        width: '100%',
        justifyContent: 'space-between'
    },
    topButton: {
        borderRadius: 30,
        marginTop: 25,
        backgroundColor: theme.loginScreen.loginButton.backgroundColor,
        width: '100%',
        paddingVertical: 10
    },
    bottomButton: {
        backgroundColor: theme.loginScreen.registerButton.backgroundColor,
        marginTop: 25,
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.loginScreen.loginButton.textColor
    },
    guestButton: {
        borderRadius: 30,
        position: 'absolute',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 60
    },
    bottomButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.loginScreen.registerButton.textColor
    },
});