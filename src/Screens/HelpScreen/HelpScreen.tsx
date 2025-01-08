import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Routes } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { Button, CustomText } from '../../Components';

interface HelpScreenProps {
    theme: ThemeProp;
}

const HelpScreen = (props: HelpScreenProps) => {
    const { theme } = props;

    const navigation = useNavigation();
    const styles = createStyles(theme);

    return (
        <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <CustomText style={{ fontSize: 20 }}>Not sure what to include here.</CustomText>
                    <Button text='Contact Us' textStyle={styles.buttonText} onPress={() => navigation.navigate(Routes.ContactUs)} />
                </View>
            </View>
        </ScrollView>
    )
}

export default withTheme(HelpScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    scrollViewContentContainer: {
        flexGrow: 1
    },
    wrapper: {
        padding: 20,
        height: '100%'
    },
    container: {
        flex: 1, 
        height: '100%', 
        marginTop: 20, 
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: theme.primaryThemeColor,
        padding: 15
    },
    buttonText: {
        fontSize: 14
    }
})