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
    state = {
        expanded: false
    }

    render() {
        const test = ['ahhh', 'omg', 'this is a comment']
        return (
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => this.setState({ expanded: !this.state.expanded })}>
                        <Text style={styles.headerText}>{this.state.expanded ? `- COMMENTS` : '+ COMMENTS'}</Text>
                    </TouchableOpacity>
                    { this.state.expanded && <FlatList
                        data={test}
                        renderItem={({ item }) => <Comment text={item} />}
                        keyExtractor={item => item} /> }
                </View>
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