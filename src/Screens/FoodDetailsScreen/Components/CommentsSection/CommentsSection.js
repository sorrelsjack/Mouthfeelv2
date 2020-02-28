import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList
} from 'react-native';
import { Comment } from '../../Components';
import { Colors } from './../../../../Common';

// TODO: Do some calculations to make the comments section only as big as it needs to be

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
                toValue: expanded ? collapsedHeight : expandedHeight,
        }).start();
    }

    render() {
        const test = ['AHHHH', 'OMG', 'THIS IS A COMMENT']
        return(
            <Animated.View style={[styles.wrapper, { height: this.state.animation }]}>
                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.headerText}>{this.state.expanded ? `- COMMENTS` : '+ COMMENTS' }</Text>
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
        backgroundColor: Colors.section.backgroundColor,
        padding: 20
    },
    headerText: {
        color: Colors.section.clickableText.textColor
    }
})