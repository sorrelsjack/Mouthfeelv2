export let primaryThemeColor = '#6200ea';

const Colors = {
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
        }
    },
    button: {
        backgroundColor: primaryThemeColor,
        textColor: 'white'
    },
    page: {
        backgroundColor: '#e5e5e5'
    },
    circleButton: {
        circleBackground: {
            backgroundColor: primaryThemeColor
        },
        icon: {
            unselected: {
                color: 'white'
            },
            selected: {
                heart: {
                    color: 'red'
                },
                heartBroken: {
                    color: 'black'
                }
            }
        }
    },
    section: {
        backgroundColor: '#ffffff',
        clickableText: {
            textColor: primaryThemeColor
        }
    },
    textInput: {
        lineColor: '#fdfffc',
        placeholderColor: '#fdfffc',
        textColor:'#fdfffc'
    },
    tag: {
        unselected: {
            backgroundColor: primaryThemeColor,
            textColor: 'white'
        },
        selected: {
            backgroundColor: 'yellow',
            textColor: 'black'
        },
        icon: {
            unselected: {
                color: 'white'
            },
            selected: {
                color: 'black'
            }
        },
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
            },
            down: {
                color: primaryThemeColor
            },
            up: {
                color: primaryThemeColor
            }
        }
    },
    homeScreenList: {
        itemSeparator: {
            backgroundColor: 'black'
        }
    }
}

export const GetColor = () => Colors;

export const SetPrimaryThemeColor = (newColor) => primaryThemeColor = newColor;