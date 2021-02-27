import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import { Tag } from '../../../../Components';
import { AttributeListAddButton } from '../AttributeListAddButton';

const AttributeList = (props) => {
    const { title, items } = props;

    sortItems = (items) => items.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <AttributeListAddButton />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                    horizontal={true}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag item={item} />}
                    keyExtractor={item => item} />
            </View>
        </View>
    )
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
    }
})

