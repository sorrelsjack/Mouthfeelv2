import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { InputField } from './../../Components';

class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>Mouthfeel</Text>
                    <View style={styles.inputFieldsContainer}>
                        <InputField placeholder={'Username'} secureTextEntry={false}></InputField>
                        <InputField placeholder={'Password'} secureTextEntry={true}></InputField>
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <View>
                            <Text style={styles.buttonText}>
                                Log In
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton}>
                        <View>
                            <Text style={styles.buttonText}>
                                Register
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default LoginScreen;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'cyan',
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
        fontSize: 48
    },
    inputFieldsContainer: {
        width: '100%'
    },
    loginButton: {
        borderRadius: 30,
        marginVertical: 25,
        backgroundColor: 'pink',
        width: '100%',
        paddingVertical: 10
    },
    registerButton: {
        borderRadius: 30,
        position: 'absolute',
        width: '100%',
        paddingVertical: 10,
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
});