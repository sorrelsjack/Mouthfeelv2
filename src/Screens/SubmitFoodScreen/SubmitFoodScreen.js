import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tag, AttributeList } from '../../Components';
import { withTheme } from 'react-native-elements';

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
// TODO: Might want to add some styling so that the tags are smaller
const SubmitFoodScreen = (props) => {
    const dummyData = [
        { text: "crunchy" },
        { text: "2" },
        { text: "soft" },
        { text: "test" },
        { text: "test2" }
    ];

    const { theme } = props;
    const styles = createStyles(theme);

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <TextInput placeholder={'Name'} />
                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={require('../../Assets/plate.png')} style={styles.image} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Flavors</Text>
                    <AttributeList
                        includeAddButton={false}
                        horizontal={false}
                        contentContainerStyle={styles.attributeListContainer}
                        tagStyle={styles.tagStyle}
                        items={dummyData} />
                    <Text style={styles.title}>Textures</Text>
                    <AttributeList
                        includeAddButton={false}
                        horizontal={false}
                        contentContainerStyle={styles.attributeListContainer}
                        tagStyle={styles.tagStyle}
                        items={dummyData} />
                    <Text style={styles.title}>Misc</Text>
                    <AttributeList
                        includeAddButton={false}
                        horizontal={false}
                        contentContainerStyle={styles.attributeListContainer}
                        tagStyle={styles.tagStyle}
                        items={dummyData} />
                </View>
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default withTheme(SubmitFoodScreen);

const createStyles = (theme) => StyleSheet.create({
    wrapper: {
        height: '100%',
        padding: 20
    },
    imageContainer: {
        borderWidth: 5, 
        borderColor: 'black', // TODO: Put this in colors constant
        marginBottom: 10
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 175,
        width: '80%'
    },
    title: {

    },
    attributeListContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tagStyle: {
        marginTop: 10
    },
    submitButtonContainer: {
        flex: 1,
        marginTop: 40,
        justifyContent: 'flex-end'
    },
    submitButton: {
        backgroundColor: theme.primaryThemeColor,
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10
    },
    submitButtonText: {
        color: theme.primaryThemeTextColor,
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});