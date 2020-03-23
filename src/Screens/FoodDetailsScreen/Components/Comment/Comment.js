import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from './../../../../Common';

const Comment = (props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity>
                    <Icon style={styles.icon} name={'arrow-up'} color={Colors.comment.arrow.default.color} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon style={styles.icon} name={'arrow-down'} color={Colors.comment.arrow.default.color} />
                </TouchableOpacity>
            </View>
            <Text>{props.text}</Text>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20
    },
    arrowContainer: {
        paddingRight: 5,
        flexDirection: 'column'
    },
    icon: {
        paddingVertical: 2.5,
        paddingHorizontal: 5
    }
})