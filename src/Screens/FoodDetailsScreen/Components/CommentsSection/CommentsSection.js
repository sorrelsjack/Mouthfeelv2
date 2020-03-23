import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
    Dimensions
} from 'react-native';
import { Comment } from '../../Components';
import { Colors } from './../../../../Common';

class CommentsSection extends Component {
    constructor() {
        super();
        this.state.animation = new Animated.Value(60);
    }

    state = {
        collapsedHeight: 60,
        expandedHeight: 0,
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
        const test = ['AHHHH', 'OMG', 'THIS IS A COMMENT', 'Another one', 'Filling up space', 'Thats our job']
        return (
            <Animated.View
                style={[styles.wrapper, { height: this.state.animation }]} >
                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.headerText}>{this.state.expanded ? `- COMMENTS` : '+ COMMENTS'}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ backgroundColor: 'cyan', flex: 0 }}
                        onContentSizeChange={(contentHeight) => { this.setState({ expandedHeight: contentHeight + this.state.expandedHeight }) }}
                        data={test}
                        renderItem={({ item }) => <Comment text={item} />}
                        keyExtractor={item => item} />
                </View>
            </Animated.View>
        )
    }
}

export default CommentsSection;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        //Colors.section.backgroundColor
        backgroundColor: 'red',
        padding: 20
    },
    headerText: {
        color: Colors.section.clickableText.textColor
    }
})