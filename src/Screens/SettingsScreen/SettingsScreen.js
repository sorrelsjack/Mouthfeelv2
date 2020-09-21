import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const SettingsScreen = (props) => {
    const handleLogOutPressed = () => {

    }

    const handleAboutPressed = () => {

    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handleAboutPressed}>
                <Text style={styles.title}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogOutPressed}>
                <Text style={styles.title}>Log Out</Text>
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
    }
});