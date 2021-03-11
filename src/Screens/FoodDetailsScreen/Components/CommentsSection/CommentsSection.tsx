import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Comment } from '..';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';

interface CommentsSectionProps {
    theme: ThemeProp
}

// TODO: Arrange comment order by number of votes
const CommentsSection = (props: CommentsSectionProps) => {
    const { theme } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const styles = createStyles(theme)
        const test = [
            {
                username: 'nara',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper id augue sit amet elementum. Vestibulum id rhoncus lectus, in suscipit enim. Maecenas lacinia ligula vitae dolor laoreet, vel cursus mi tempus. Mauris laoreet varius nisl, quis lobortis odio lacinia ut. Duis mi elit, laoreet id nisl sit amet,',
                totalScore: 4
            },
            {
                username: 'miles',
                body: 'Suspendisse mollis rhoncus nisl id pretium. Sed eu convallis ex. Nunc ac quam vitae libero consectetur blandit quis non magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam magna neque, vulputate eu mauris vitae, egestas commodo ex.',
                totalScore: 2,
            },
            {
                username: 'cecil',
                body: 'Nulla consectetur porttitor purus, nec pharetra tortor congue et.',
                totalScore: -3
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
                        keyExtractor={item => item.username} /> }
                </View>
        )
}

export default withTheme(CommentsSection);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        backgroundColor: theme.section.backgroundColor,
        padding: 20
    },
    headerText: {
        color: theme.clickableTextColor
    }
})