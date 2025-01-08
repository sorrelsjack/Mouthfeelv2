import React from 'react';
import {
    StyleSheet,
    TextProps,
    Text
} from 'react-native';
import { withTheme } from 'react-native-elements';

export const GlobalFontName = 'Montserrat-Regular';
export const GlobalFontNameBold = 'Montserrat-Bold'

const CustomText = (props: TextProps) => {
    const isBold = props.style && 'fontWeight' in props.style
        ? props.style['fontWeight'] === 'bold'
        : false;

    return (
        <Text {...props} style={[styles.defaultText, props.style, isBold ? styles.boldText : {}]} />
    )
}

export default withTheme(CustomText);

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: GlobalFontName,
    },
    boldText: {
        fontFamily: GlobalFontNameBold,
        fontWeight: 'normal'
    }
});