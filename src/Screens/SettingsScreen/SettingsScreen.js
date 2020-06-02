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
        <View>
            <TouchableOpacity onPress={handleLogOutPressed}>
                <Text>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAboutPressed}>
                <Text>About</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({

});