import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

interface BaseAnimatedViewProps {
    fullScreen?: boolean;
    view: JSX.Element;
    text?: string
}

const BaseAnimatedView = (props: BaseAnimatedViewProps) => {
    const { fullScreen = false, view, text } = props;

    const window = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const EXTRA_ANIMATION_HEIGHT = 30;

    const styles = createStyles(fullScreen, window.height, headerHeight, EXTRA_ANIMATION_HEIGHT);

    return (
        <View style={fullScreen ? styles.fullScreenWrapper : styles.wrapper}>
            <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
                {view}
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )

}

export default BaseAnimatedView;

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