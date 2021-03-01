import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';

interface SettingsScreenProps {
    theme: ThemeProp
}

const SettingsScreen = (props: SettingsScreenProps) => {
    const { theme } = props;
    
    const handleLogOutPressed = () => {

    }

    const handleAboutPressed = () => {

    }

    const styles = createStyles(theme);

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

export default withTheme(SettingsScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        padding: 20,
        height: '100%',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center'
    },
    logoutButton: {
        backgroundColor: theme.primaryThemeColor,
        padding: 15
    },
    logoutButtonText: {
        textAlign: 'center',
        color: theme.primaryThemeTextColor
    }
});