import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import { Tag } from '../../../../Components';

class AttributeList extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.text}>{this.props.title}</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                    horizontal={true}
                    data={this.props.items}
                    renderItem={({ item }) => <Tag text={item} />}
                    keyExtractor={item => item} />
            </View>
        )
    }
}

export default AttributeList;

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 15
    },
    text: {
        paddingBottom: 15,
        paddingHorizontal: 20,
        fontSize: 16
    },
    list: {
        marginRight: -20,
        marginLeft: -20
    }
})

