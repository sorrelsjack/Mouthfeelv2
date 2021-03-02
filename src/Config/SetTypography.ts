import React from 'react'
import { Text, Platform, StyleSheet } from 'react-native'

export const GlobalFontName = 'NexaDemo-Light';

// TODO: Get custom font working for iOS
// TODO: Need a bold version
// TODO: Need textinputs to inherit it
export const SetTypography = () => {
    const oldTextRender = Text.render;

    Text.render = (...args) => {
        const origin = oldTextRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [styles.defaultText, origin.props.style],
        })
    }
}

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: GlobalFontName,
    }
});