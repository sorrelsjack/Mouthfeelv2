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
    const { fullScreen = false, containerStyle, spinnerStyle } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    return (
        <View style={fullScreen ? styles.fullScreenWrapper : styles.wrapper}>
            <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
                <LottieView
                    style={styles.image}
                    source={require('../../Assets/loading_pizza.json')}
                    autoPlay />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    )

}

export default LoadingSpinner;

const createStyles = (fullScreen: boolean, windowHeight: number, headerHeight: number, extraAnimationHeight: number) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    fullScreenWrapper: {
        height: fullScreen ? windowHeight - headerHeight - extraAnimationHeight : '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        height: fullScreen ? (windowHeight - headerHeight - extraAnimationHeight) / 2 : 250
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
        fontSize: 20,
        marginTop: 20
    }
})