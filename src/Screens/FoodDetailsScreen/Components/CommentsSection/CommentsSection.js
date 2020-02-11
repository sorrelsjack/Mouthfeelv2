import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class CommentsSection extends Component {
    state = {
        showComments: false
    }

    handlePress = () => {
        this.setState({ showComments: true });
    }

    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.handlePress}>
                <Text>COMMENTS</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

export default CommentsSection;