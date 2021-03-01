import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface HomeListItemProps {
    onPress: () => any;
    item: {
        text: string,
        icon: string
    }
}

const HomeListItem = (props: HomeListItemProps) => {
    const { onPress, item } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Icon name={item.icon} size={20} />
                    </View>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name={'chevron-right'} size={20} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HomeListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        padding: 20
    },
    iconContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})