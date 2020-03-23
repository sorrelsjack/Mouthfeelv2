import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class CollapsibleSection extends Component {
    // TODO finish this as a higher-order component
    
    constructor () {
        super();
        this.state.animation = new Animated.Value(60);
    }

    state = {
        collapsedHeight: 60,
        expandedHeight: 400,
        expanded: false
    }

    render() {
        return(
            <View>

            </View>
        )
    }
}

export default CollapsibleSection;