import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { Button, CustomText } from '..';

interface BaseAnimatedViewProps {
    fullScreen?: boolean;
    view: JSX.Element;
    text?: string;
    fontSize?: number;
    buttonText?: string;
    onButtonPress?: () => any;
    secondButtonText?: string;
    onSecondButtonPress?: () => any;
}

const BaseAnimatedView = (props: BaseAnimatedViewProps) => {
    const {
        fullScreen = false,
        view,
        text,
        fontSize = 18,
        buttonText,
        onButtonPress = () => { },
        secondButtonText,
        onSecondButtonPress = () => { }
    } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT, fontSize);

    return (
        <View style={fullScreen ? styles.fullScreenWrapper : {}}>
            <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
                {view}
                <CustomText style={styles.text}>{text}</CustomText>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {buttonText && <Button style={styles.button} textStyle={styles.buttonText} text={buttonText} onPress={onButtonPress} />}
                {secondButtonText && <Button style={styles.button} textStyle={styles.buttonText} text={secondButtonText} onPress={onSecondButtonPress} />}
            </View>
        </View>
    )

}

export default BaseAnimatedView;

const createStyles = (fullScreen: boolean, windowHeight: number, headerHeight: number, extraAnimationHeight: number, fontSize: number) => StyleSheet.create({
    fullScreenWrapper: {
        height: fullScreen ? windowHeight - headerHeight - extraAnimationHeight : '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        height: fullScreen ? (windowHeight - headerHeight - extraAnimationHeight) / 2 : 250
    },
    button: {
        width: '70%',
        padding: 15,
        marginTop: 20
    },
    buttonText: {
        fontSize: 14
    },
    container: {
        marginTop: extraAnimationHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullScreenContainer: {
        marginTop: -extraAnimationHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: fontSize,
        marginTop: 20
    }
})