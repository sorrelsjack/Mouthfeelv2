import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  FlatList
} from 'react-native';
import { Comment } from '../../Components';
import { Colors } from './../../../../Common';

class CommentsSection extends Component {
    constructor () {
        super();
        this.state.animation = new Animated.Value(60);
    }

    state = {
        collapsedHeight: 60,
        expandedHeight: 400,
        expanded: false
    }

    handlePress = () => {
        const { expanded, collapsedHeight, expandedHeight } = this.state;

        this.setState({ expanded: !expanded });

        Animated.spring(
            this.state.animation, {
                toValue: expanded ? collapsedHeight : expandedHeight
        }).start();
    }

    render() {
        const test = ['AHHHH', 'OMG', 'THIS IS A COMMENT']
        return(
            <Animated.View style={[styles.wrapper, { height: this.state.animation, backgroundColor: Colors.section.backgroundColor }]}>
                <TouchableOpacity onPress={this.handlePress}>
                <Text>{this.state.expanded ? `- COMMENTS` : '+ COMMENTS' }</Text>
                </TouchableOpacity>
                <FlatList
                    data={test}
                    renderItem={({item}) => <Comment text={item}/>}
                    keyExtractor={item => item} />
            </Animated.View> 
        )
    }
}

export default CommentsSection;

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    }
})