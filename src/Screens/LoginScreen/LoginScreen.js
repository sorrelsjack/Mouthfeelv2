import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputField } from './../../Components';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Routes } from './../../Common';

class LoginScreen extends Component {
    render() {
        return (
            <LinearGradient colors={[Colors.loginScreen.gradient.topColor, Colors.loginScreen.gradient.bottomColor]} style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>Mouthfeel</Text>
                    <View style={styles.inputFieldsContainer}>
                        <InputField placeholder={'Username'} secureTextEntry={false}></InputField>
                        <InputField placeholder={'Password'} secureTextEntry={true}></InputField>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.replace(Routes.Home)}>
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

}

export default LoginScreen;

const styles = StyleSheet.create({
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
        color: Colors.loginScreen.title.textColor,
        fontSize: 48
    },
    inputFieldsContainer: {
        width: '100%'
    },
    loginButton: {
        borderRadius: 30,
        marginVertical: 25,
        backgroundColor: Colors.loginScreen.loginButton.backgroundColor,
        width: '100%',
        paddingVertical: 10
    },
    loginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.loginScreen.loginButton.textColor
    },
    registerButton: {
        backgroundColor: Colors.loginScreen.registerButton.backgroundColor,
        borderColor: Colors.loginScreen.registerButton.backgroundColor,
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
        color: Colors.loginScreen.registerButton.textColor
    },
});