import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { EmptyView } from '..';
import BaseAnimatedView from '../BaseAnimatedView';

interface LoadingSpinnerProps {
    fullScreen?: boolean,
    fontSize?: number
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { fullScreen = false, fontSize = 20 } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    const LottieComponent = () => {
        return (
            <LottieView
                style={styles.image}
                source={require('../../Assets/loading_pizza.json')}
                autoPlay />
        )
    }

    return (
        <BaseAnimatedView text='Loading...' fullScreen={fullScreen} view={<LottieComponent />} fontSize={fontSize} />
    )

}

export default LoadingSpinner;

const createStyles = (fullScreen: boolean, windowHeight: number, headerHeight: number, extraAnimationHeight: number) => StyleSheet.create({
    image: {
        width: '80%',
        height: fullScreen ? (windowHeight - headerHeight - extraAnimationHeight) / 2 : 250
    }
})