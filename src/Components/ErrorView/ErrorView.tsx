import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import BaseAnimatedView from '../BaseAnimatedView';

interface ErrorViewProps {
    fullScreen?: boolean,
    text?: string,
    buttonText?: string;
    onButtonPress?: () => any;
    secondButtonText?: string;
    onSecondButtonPress?: () => any;
}

const ErrorView = (props: ErrorViewProps) => {
    const { 
        fullScreen = false, 
        text = 'Something is wrong with the recipe!', 
        buttonText = 'Try Again', 
        onButtonPress = () => {},
        secondButtonText = 'Report The Mix-Up',
        onSecondButtonPress = () => {}
    } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    const LottieComponent = () => {
        return (
            <LottieView
                style={styles.image}
                source={require('../../Assets/error.json')}
                autoPlay />
        )
    }

    return (
        <BaseAnimatedView 
            text={text} 
            fullScreen={fullScreen} 
            view={<LottieComponent />}
            buttonText={buttonText}
            onButtonPress={onButtonPress}
            secondButtonText={secondButtonText}
            onSecondButtonPress={onSecondButtonPress} />
    )

}

export default ErrorView;

const createStyles = (fullScreen: boolean, windowHeight: number, headerHeight: number, extraAnimationHeight: number) => StyleSheet.create({
    image: {
        width: '80%',
        height: fullScreen ? (windowHeight - headerHeight - extraAnimationHeight) / 2 : 250
    }
})