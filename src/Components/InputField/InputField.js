import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { withTheme } from 'react-native-elements';

const InputField = (props) => {
    const { theme, secureTextEntry, placeholder } = props;
    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={theme.textInput.placeholderColor}
                numberOfLines={1}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder} />
        </View>
    )
}

export default withTheme(InputField);

const createStyles = (theme) => StyleSheet.create({
    textInput: {
        borderBottomWidth: 1,
        color: theme.textInput.textColor, 
        borderBottomColor: theme.textInput.lineColor
    }
})