import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { getBuildNumber, getReadableVersion } from 'react-native-device-info';
import { withTheme } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Routes } from '../../Common';
import { ArrowAccordion, Button, CustomText } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { ThemeProp } from '../../Models';
import { LogoutAction } from '../../Redux/Actions';

interface SettingsScreenProps {
    theme: ThemeProp
}

const SettingsScreen = (props: SettingsScreenProps) => {
    const { theme } = props;

    const [logoutPressed, setLogoutPressed] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const profile = useAppStore(s => s.user.profile)

    useEffect(() => {
        if (!profile.data && logoutPressed) navigation.navigate(Routes.Login);

    }, [profile || logoutPressed])

    const handleLogOutPressed = () => {
        setLogoutPressed(true);
        dispatch(LogoutAction());
    }

    const handleAboutPressed = () => {
        // TODO
    }

    const styles = createStyles(theme);

    const AutismSection = () => {
        return (
            <>
                <CustomText style={styles.text}>
                    Autism, or autism spectrum disorder (ASD), is a developmental disability that affects a person's experience of the world. One component of this is related to the senses, as an autistic person might process stimuli differently than a neurotypical person would. This can result in certain textures or flavors being overwhelming, making eating a challenging activity.
                </CustomText>
                <CustomText style={styles.text}>
                    If pressed to continue experiencing something that overwhelms the senses, such as eating a meal that does so, an autistic individual may experience sensory overload; a total overwhelming of the senses that can result in high anxiety, irritability, and stress.
                </CustomText>
                <TouchableOpacity onPress={() => Linking.openURL('https://autisticadvocacy.org/about-asan/about-autism/')}>
                    <CustomText style={[styles.text, styles.clickable]}>
                        Learn more about autism on ASAN's website
                    </CustomText>
                </TouchableOpacity>
            </>
        )
    }

    const ArfidSection = () => {
        return (
            <>
                <CustomText style={styles.text}>
                    ARFID, or Avoidant Restrictive Food Intake Disorder, is classified as an eating disorder, and can be understood as a form of extreme "picky eating", though sufferers do not reject food by choice. People with ARFID often struggle with foods with "complex" textures or flavors, preferring foods similar to ones they're familiar with. It is also known as SED, or Selective Eating Disorder.
                </CustomText>
            </>
        )
    }

    const SensoryProcessingDisorderSection = () => {
        return (
            <>
                <CustomText style={styles.text}>
                    Sensory Processing Disorder, or SPD, is a disorder where the brain has trouble processing sensory information. As eating is highly sensory in nature, this can be overwhelming to someone with SPD. Individual experiences of flavor, smell, and texture can be heightened as well, potentially causing physical or psychological pain. It is also worth noting that SPD is more common among autistic people and people with ADHD.
                </CustomText>
            </>
        )
    }

    const Sections = [
        {
            title: 'What is ARFID?',
            content: <ArfidSection />
        },
        {
            title: 'What is autism?',
            content: <AutismSection />
        },
        {
            title: 'What is Sensory Processing Disorder?',
            content: <SensoryProcessingDisorderSection />
        }
    ]

    return (
        <ScrollView
            style={{ height: '100%' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleAboutPressed}>
                    <CustomText style={styles.title}>About</CustomText>
                </TouchableOpacity>
                <CustomText style={styles.text}>
                    Mouthfeel was made with certain groups in mind, with an aim of improving their quality of life. These include sufferers of ARFID, those on the autism spectrum, those with sensory processing issues, and generally anyone who has difficulty with food.
                </CustomText>
                <CustomText style={styles.text}>Tap the sections below to learn more about each condition.</CustomText>
                <View style={styles.container}>
                    <ArrowAccordion sections={Sections} />
                    <View style={{ marginTop: 20 }}>
                        <Button text='Log Out' textStyle={{ fontSize: 14 }} onPress={handleLogOutPressed} />
                        <View style={{ marginTop: 10 }}>
                            <CustomText style={{ fontSize: 12 }}>{`Version ${getReadableVersion()} (${getBuildNumber()})`}</CustomText>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default withTheme(SettingsScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        padding: 20,
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        marginTop: 10
    },
    clickable: {
        color: theme.primaryThemeColor,
        textAlign: 'center',
    },
    button: {
        backgroundColor: theme.primaryThemeColor,
        padding: 15
    },
    buttonText: {
        textAlign: 'center',
        color: theme.primaryThemeTextColor
    },
    container: {
        flex: 1,
        height: '100%',
        marginTop: 20,
        justifyContent: 'space-between'
    }
});