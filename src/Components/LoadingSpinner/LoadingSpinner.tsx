import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

const LoadingSpinner = () =>
    <LottieView
        style={styles.image}
        source={require('../../Assets/loading_pizza.json')}
        autoPlay />

export default LoadingSpinner;

const styles = StyleSheet.create({
    image: {
        height: 175,
        width: '80%'
    }
})