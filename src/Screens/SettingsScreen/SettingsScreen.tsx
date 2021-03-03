import React from 'react';
import { useDispatch } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Linking
} from 'react-native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { withNavigation } from 'react-navigation';
import { Routes } from '../../Common';
import { Actions } from '../../Redux/Actions';

interface SettingsScreenProps {
    theme: ThemeProp,
    navigation: any // TODO; Fix
}

// TODO: Maybe make each section "hideable"
const SettingsScreen = (props: SettingsScreenProps) => {
    const { theme, navigation } = props;

    const dispatch = useDispatch();

    const handleLogOutPressed = () => {
        dispatch({ type: Actions.Logout }); // TODO: Make this into an actual action once we have login
        navigation.navigate(Routes.Login);
    }

    const handleAboutPressed = () => {

    }

    const styles = createStyles(theme);

    const AutismSection = () => {
        return (
            <>
                <Text style={[styles.text, styles.header]}>
                    What is autism?
                </Text>
                <Text style={styles.text}>
                    Autism, or autism spectrum disorder (ASD), is a developmental disability that affects a person's experience of the world. One component of this is related to the senses, as an autistic person might process stimuli differently than a neurotypical person would. This can result in certain textures or flavors being overwhelming, making eating a challenging activity.
                </Text>
                <Text style={styles.text}>
                    If pressed to continue experiencing something that overwhelms the senses, such as eating a meal that does so, an autistic individual may experience sensory overload; a total overwhelming of the senses that can result in high anxiety, irritability, and stress.
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://autisticadvocacy.org/about-asan/about-autism/')}>
                    <Text style={[styles.text, styles.clickable]}>
                        Learn more about autism on ASAN's website
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    const ArfidSection = () => {
        return (
            <>
                <Text style={[styles.text, styles.header]}>
                    What is ARFID?
                </Text>
                <Text style={styles.text}>
                    ARFID, or Avoidant Restrictive Food Intake Disorder, is classified as an eating disorder, and can be understood as a form of extreme "picky eating", though sufferers do not reject food by choice. People with ARFID often struggle with foods with "complex" textures or flavors, preferring foods similar to ones they're familiar with. It is also known as SED, or Selective Eating Disorder.
                </Text>
            </>
        )
    }

    const SensoryProcessingDisorderSection = () => {
        return (
            <>
                <Text style={[styles.text, styles.header]}>
                    What is Sensory Processing Disorder?
                </Text>
                <Text style={styles.text}>
                    Sensory Processing Disorder, or SPD, is a disorder where the brain has trouble processing sensory information. As eating is highly sensory in nature, this can be overwhelming to someone with SPD. Individual experiences of flavor, smell, and texture can be heightened as well, potentially causing physical or psychological pain. It is also worth noting that SPD is more common among autistic people and people with ADHD.
                </Text>
            </>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleAboutPressed}>
                    <Text style={styles.title}>About</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    Mouthfeel was made with certain groups in mind, with an aim of improving their quality of life. These include sufferers of ARFID, those on the autism spectrum, those with sensory processing issues, and generally anyone who has difficulty with food.
                </Text>
                <ArfidSection />
                <AutismSection />
                <SensoryProcessingDisorderSection />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOutPressed}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default withNavigation(withTheme(SettingsScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text: {
        marginTop: 10
    },
    clickable: {
        color: theme.primaryThemeColor,
        textAlign: 'center',
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