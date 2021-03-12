import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

interface LoadingSpinnerProps {
    fullScreen?: boolean,
    containerStyle?: object,
    spinnerStyle?: object
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { fullScreen, containerStyle, spinnerStyle } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    return (
        <View style={styles.wrapper}>
            <View style={fullScreen ? styles.fullScreenContainer : {}}>
                <LottieView
                    style={[styles.image, fullScreen ? styles.fullScreenImage : {}]}
                    source={require('../../Assets/loading_pizza.json')}
                    autoPlay />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    )

}

export default LoadingSpinner;

const createStyles = (windowHeight: number, headerHeight: number, extraAnimationHeight: number) => StyleSheet.create({
    wrapper: {
        height: windowHeight - headerHeight - extraAnimationHeight, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%'
    },
    fullScreenImage: {
        height: (windowHeight - headerHeight - extraAnimationHeight) / 2
    },
    fullScreenContainer: {
        marginTop: -extraAnimationHeight,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    }
})