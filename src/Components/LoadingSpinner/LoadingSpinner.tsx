import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text } from 'react-native';

interface LoadingSpinnerProps {
    containerStyle?: object,
    spinnerStyle?: object
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { containerStyle, spinnerStyle } = props;

    return (
        <View style={containerStyle}>
            <LottieView
                style={[styles.image, spinnerStyle]}
                source={require('../../Assets/loading_pizza.json')}
                autoPlay />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )

}

export default LoadingSpinner;

const styles = StyleSheet.create({
    image: {
        height: 175,
        width: '80%'
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    }
})