import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Comment } from '../../Components';
import { GetColor } from './../../../../Common';

const CommentsSection = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

        const test = [
            {
                username: 'nara',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper id augue sit amet elementum. Vestibulum id rhoncus lectus, in suscipit enim. Maecenas lacinia ligula vitae dolor laoreet, vel cursus mi tempus. Mauris laoreet varius nisl, quis lobortis odio lacinia ut. Duis mi elit, laoreet id nisl sit amet,'
            },
            {
                username: 'miles',
                body: 'Suspendisse mollis rhoncus nisl id pretium. Sed eu convallis ex. Nunc ac quam vitae libero consectetur blandit quis non magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam magna neque, vulputate eu mauris vitae, egestas commodo ex.'
            },
            {
                username: 'cecil',
                body: 'Nulla consectetur porttitor purus, nec pharetra tortor congue et.'
            }
        ]
        return (
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                        <Text style={styles.headerText}>{isExpanded ? `- COMMENTS` : '+ COMMENTS'}</Text>
                    </TouchableOpacity>
                    { isExpanded && <FlatList
                        data={test}
                        renderItem={({ item }) => <Comment details={item} />}
                        keyExtractor={item => item} /> }
                </View>
        )
}

export default CommentsSection;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: GetColor().section.backgroundColor,
        padding: 20
    },
    headerText: {
        color: GetColor().section.clickableText.textColor
    }
})