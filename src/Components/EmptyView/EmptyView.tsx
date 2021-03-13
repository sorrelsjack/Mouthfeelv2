import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import BaseAnimatedView from '../BaseAnimatedView';

interface EmptyViewProps {
    fullScreen?: boolean,
    text: string
}

const EmptyView = (props: EmptyViewProps) => {
    const { fullScreen = false, text } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    const LottieComponent = () => {
        return (
            <LottieView
                style={styles.image}
                source={require('../../Assets/empty_view.json')}
                autoPlay />
        )
    }

    return (
        <BaseAnimatedView text={text} fullScreen={fullScreen} view={<LottieComponent />} />
    )

}

export default EmptyView;

const createStyles = (fullScreen: boolean, windowHeight: number, headerHeight: number, extraAnimationHeight: number) => StyleSheet.create({
    image: {
        width: '80%',
        height: fullScreen ? (windowHeight - headerHeight - extraAnimationHeight) / 2 : 250
    }
})