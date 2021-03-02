import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputField } from '../../Components';
import LinearGradient from 'react-native-linear-gradient';
import { Routes } from '../../Common';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface LoginScreenProps {
    theme: ThemeProp,
    navigation: any // TODO: Fix
}

const LoginScreen = (props: LoginScreenProps) => {
    const { theme } = props;

    const styles = createStyles(theme);

    return (
        <LinearGradient colors={[theme.loginScreen.gradient.topColor, theme.loginScreen.gradient.bottomColor]} style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Mouthfeel</Text>
                <View style={styles.inputFieldsContainer}>
                    <InputField 
                        style={styles.inputField} 
                        placeholder={'Username'} 
                        placeholderTextColor={theme.loginScreen.textInput.placeholderColor} 
                        secureTextEntry={false} />
                    <InputField 
                        style={styles.inputField} 
                        placeholder={'Password'} 
                        placeholderTextColor={theme.loginScreen.textInput.placeholderColor} 
                        secureTextEntry={true} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.replace(Routes.Home)}>
                    <View>
                        <Text style={styles.loginButtonText}>
                            Log In
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton}>
                    <View>
                        <Text style={styles.registerButtonText}>
                            Register
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )

}

export default withTheme(LoginScreen);

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
        borderColor: theme.loginScreen.registerButton.backgroundColor,
        borderRadius: 30,
        position: 'absolute',
        width: '100%',
        paddingVertical: 10,
        borderWidth: 1,
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