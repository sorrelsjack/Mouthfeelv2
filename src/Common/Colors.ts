export const Colors = {
    primaryThemeColor: '#270061',
    primaryThemeTextColor: '#ffffff',
    errorColorLight: '#ff0000',
    errorColorDark: '#470000',
    clickableTextColor: '#270061',
    heartSelectedColor: '#ff0000',
    heartBrokenSelectedColor: '#910900',
    bookmarkSelectedColor: '#e38d02',
    halfTransparent: 'rgba(0, 0, 0, 0.5)',

    loginScreen: {
        gradient: {
            topColor: '#e71d36',
            bottomColor: '#ff9f1c'
        },
        title: {
            textColor: '#fdfffc'
        },
        loginButton: {
            backgroundColor: '#2ec4b6',
            textColor: '#fdfffc'
        },
        registerButton: {
            backgroundColor: '#fdfffc',
            textColor: 'black'
        },
        textInput: {
            lineColor: '#fdfffc',
            placeholderColor: '#fdfffc',
            textColor:'#fdfffc'
        },
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    disabledButton: {
        backgroundColor: '#cfcfcf',
        textColor: 'rgba(0, 0, 0, .3)'
    },
    page: {
        backgroundColor: '#e5e5e5'
    },
    section: {
        backgroundColor: '#ffffff'
    },
    tag: {
        counter: {
            unselected: {
                backgroundColor: 'rgba(255, 255, 255, .3)'
            },
            selected: {
                backgroundColor: 'rgba(0, 0, 0, .1)'
            }
        }
    },
    comment: {
        arrow: {
            default: {
                color: '#8d8f8e'
            }
        }
    },
    homeScreenList: {
        itemSeparator: {
            backgroundColor: 'rgba(0, 0, 0, .3)'
        }
    },
    submitFoodScreen: {
        submitButton: {
            backgroundColor: '#4ABD02',
            textColor: 'white'
        }
    }
}

export const GetColor = () => Colors;

export const GetDefaultPrimaryThemeColor = () => '#270061';

export const GetDefaultPrimaryThemeTextColor = () => '#ffffff';

export const GetDefaultHeartSelectedColor = () => '#ff0000';

export const GetDefaultHeartBrokenSelectedColor = () => '#910900';