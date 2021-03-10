import React from 'react'
import { Text, StyleSheet } from 'react-native'

export const GlobalFontName = 'Montserrat-Regular';
export const GlobalFontNameBold = 'Montserrat-Bold'

export const SetTypography = () => {
    const oldTextRender = Text.render;

    Text.render = (...args) => {
        const origin = oldTextRender.call(this, ...args)

        const isBold = origin.props.style 
            ? origin.props.style['fontWeight'] === 'bold' 
            : false;

        return React.cloneElement(origin, {
            style: [styles.defaultText, origin.props.style, isBold ? styles.boldText : { }],
        })
    }
}

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: GlobalFontName,
    },
    boldText: {
        fontFamily: GlobalFontNameBold,
        fontWeight: 'normal'
    }
});