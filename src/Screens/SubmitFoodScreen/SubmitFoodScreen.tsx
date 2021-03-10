import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import { Tag, AttributeList, LoadingSpinner, InputField } from '../../Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GetAllVotableAttributesAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest } from '../../Redux/Models';

interface SubmitFoodScreenProps {
    theme: ThemeProp,
    flavors: { loading: boolean, all: VotableAttribute[] },
    textures: { loading: boolean, all: VotableAttribute[] },
    misc: { loading: boolean, all: VotableAttribute[] },
    items: string[]
}

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
// TODO: With ingredients, include prep time, if applicable
// TODO: Include "subtypes" of food - e.g., chicken nuggets, then chicken nuggets from wendy's, or chicken nuggets from a pinterest recipe. in the DB, this would be a string representing location. could be a URL or a location
// TODO: Add "parent food" input
// TODO: Handle errors here, for if a name is already being used or something else...
// TODO: Change background color of button when it is disabled
const SubmitFoodScreen = (props: SubmitFoodScreenProps) => {
    const { theme, /*flavors, textures, misc*/ } = props;

    const dummyData = {
        loading: false, all: [
            { name: "crunchy", description: 'Testing' },
            { name: "2", description: 'Testing' },
            { name: "soft", description: 'Testing' },
            { name: "test", description: 'Testing' },
            { name: "test2", description: 'Testing' }
        ]
    };

    const [name, setName] = useState('');

    const flavors = dummyData;
    const textures = dummyData;
    const misc = dummyData;

    const loading = flavors.loading || textures.loading || misc.loading;
    const styles = createStyles(theme);
    const dispatch = useDispatch();

    const canSubmit = !!name;

    useEffect(() => {
        //dispatch(GetAllVotableAttributesAction());
    }, [])

    const handleSubmitButtonPress = () => {
        const request: CreateFoodRequest = {
            name: name
        }
        // Gather up name, imageUrl (or imageData?), flavor ids, texture ids, and misc ids, then pile them into an object and do a request
    }

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                {loading ?
                    <View style={styles.loadingSpinnerContainer}>
                        <LoadingSpinner />
                    </View> :
                    <>
                        <InputField 
                            style={styles.nameInput} 
                            placeholder={'Food Name'} 
                            value={name} 
                            onChangeText={setName} />
                        <View>
                            <Text style={styles.title}>Image</Text>
                            <TouchableOpacity style={styles.imageContainer}>
                                <Image source={require('../../Assets/plate.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.title}>Flavors</Text>
                            <AttributeList
                                includeAddButton={false}
                                horizontal={false}
                                contentContainerStyle={styles.attributeListContainer}
                                tagStyle={styles.tagStyle}
                                tagSize={'small'}
                                items={flavors.all.length ? flavors.all.map(f => { return { text: f.name, tooltipText: f.description } }) : []} />
                            <Text style={styles.title}>Textures</Text>
                            <AttributeList
                                includeAddButton={false}
                                horizontal={false}
                                contentContainerStyle={styles.attributeListContainer}
                                tagStyle={styles.tagStyle}
                                tagSize={'small'}
                                items={textures.all.length ? textures.all.map(t => { return { text: t.name, tooltipText: t.description } }) : []} />
                            <Text style={styles.title}>Misc</Text>
                            <AttributeList
                                includeAddButton={false}
                                horizontal={false}
                                contentContainerStyle={styles.attributeListContainer}
                                tagStyle={styles.tagStyle}
                                tagSize={'small'}
                                items={misc.all.length ? misc.all.map(m => { return { text: m.name, tooltipText: m.description } }) : []} />
                        </View>
                        <View style={styles.submitButtonContainer}>
                            <TouchableOpacity style={styles.submitButton} disabled={!canSubmit} onPress={handleSubmitButtonPress}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </>}
            </View>
        </ScrollView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        flavors: state.flavors,
        textures: state.textures,
        misc: state.miscellaneous
    }
})(SubmitFoodScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        height: '100%',
        padding: 20
    },
    loadingSpinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInput: {
        backgroundColor: 'white',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: theme.halfTransparent
    },
    imageContainer: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: theme.halfTransparent,
        marginBottom: 10
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 175,
        width: '80%',
        opacity: .09
    },
    title: {
        fontWeight: 'bold'
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
        backgroundColor: theme.submitFoodScreen.submitButton.backgroundColor,
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10
    },
    submitButtonText: {
        color: theme.submitFoodScreen.submitButton.textColor,
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});