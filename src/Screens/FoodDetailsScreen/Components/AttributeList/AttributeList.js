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
                <Text style={styles.text}>{`What is eating ${this.props.food} like?`}</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                    horizontal={true}
                    data={this.props.test}
                    renderItem={({ item }) => <Tag text={item} />}
                    keyExtractor={item => item} />
            </View>
        )
    }
}

export default AttributeList;

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 20
    },
    text: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16
    },
    list: {
        marginHorizontal: -20
    }
})

