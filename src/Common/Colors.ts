export const Colors = {
    primaryThemeColor: '#6200ea',
    primaryThemeTextColor: '#ffffff',
    clickableTextColor: '#6200ea',
    heartSelectedColor: '#ff0000',
    heartBrokenSelectedColor: '#910900',
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

export const GetDefaultPrimaryThemeColor = () => '#6200ea';

export const GetDefaultPrimaryThemeTextColor = () => '#ffffff';