import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { GetColor } from '../../Common';

const SettingsScreen = (props) => {
    const handleLogOutPressed = () => {

    }

    const handleAboutPressed = () => {

    }

    return (
        <View style={styles.wrapper}>
            <View>
                <TouchableOpacity onPress={handleAboutPressed}>
                    <Text style={styles.title}>About</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOutPressed}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        height: '100%',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center'
    },
    logoutButton: {
        backgroundColor: GetColor().button.backgroundColor,
        padding: 15
    },
    logoutButtonText: {
        textAlign: 'center',
        color: GetColor().button.textColor
    }
});