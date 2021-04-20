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
import {
    Tag,
    AttributeList,
    LoadingSpinner,
    InputField,
    Button,
    ArrowAccordion
} from '../../Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GetAllVotableAttributesAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest, ApiData } from '../../Redux/Models';

interface SubmitFoodScreenProps {
    theme: ThemeProp,
    flavors: ApiData<VotableAttribute[]>,
    textures: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// Put a touchable opacity with a stock image that you can tap to upload an image
// Selecting textures / flavors / misc will cause them to appear on the screen
// TODO: With ingredients, include prep time, if applicable
// TODO: Include "subtypes" of food - e.g., chicken nuggets, then chicken nuggets from wendy's, or chicken nuggets from a pinterest recipe. in the DB, this would be a string representing location. could be a URL or a location
// TODO: Add "parent food" input
// TODO: Handle errors here, for if a name is already being used or something else...
// TODO: When the user finishes typing the name, call and endpoint to fetch foods with the same / similar names and ask if they meant that one instead
// TODO: Also, allow for multiple images
const SubmitFoodScreen = (props: SubmitFoodScreenProps) => {
    const { theme, flavors, textures, misc } = props;

    const [name, setName] = useState('');
    const [flavorListVisible] = useState(false);
    const [miscListVisible] = useState(false);
    const [textureListVisible] = useState(false);
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [selectedTextures, setSelectedTextures] = useState([]);
    const [selectedMisc, setSelectedMisc] = useState([]);

    // TODO: The loading spinner flickers in a really gross way presumably because the state of these guys keeps updating. Can we fix?
    const loading = flavors.loading || textures.loading || misc.loading;
    const styles = createStyles(theme);
    const dispatch = useDispatch();

    const canSubmit = !!name;

    useEffect(() => {
        dispatch(GetAllVotableAttributesAction());
    }, [])

    const handleSubmitButtonPress = () => {
        const request: CreateFoodRequest = {
            name: name,
            //imageUrl: ,
            flavors: selectedFlavors,
            textures: selectedTextures,
            miscellaneous: selectedMisc
        }
        // Gather up name, imageUrl (or imageData?), flavor ids, texture ids, and misc ids, then pile them into an object and do a request
    }

    const Sections = [
        {
            title: 'Images',
            content: <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={require('../../Assets/plate.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
        },
        {
            title: 'Flavors',
            content: <AttributeList
                includeAddButton={false}
                horizontal={false}
                numColumns={2}
                attributeType='texture'
                contentContainerStyle={styles.attributeListContainer}
                tagStyle={styles.tagStyle}
                tagSize={'small'}
                items={flavors.data || []}
                sortBy={'alphabetically'} />
        },
        {
            title: 'Texture',
            content: <AttributeList
                includeAddButton={false}
                horizontal={false}
                numColumns={2}
                attributeType='texture'
                contentContainerStyle={styles.attributeListContainer}
                tagStyle={styles.tagStyle}
                tagSize={'small'}
                items={textures.data || []}
                sortBy={'alphabetically'} />
        },
        {
            title: 'Miscellaneous',
            content: <AttributeList
                includeAddButton={false}
                horizontal={false}
                numColumns={2}
                attributeType='miscellaneous'
                contentContainerStyle={styles.attributeListContainer}
                tagStyle={styles.tagStyle}
                tagSize={'small'}
                items={misc.data || []}
                sortBy={'alphabetically'} />
        }
    ]

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.wrapper}>
                {loading ?
                    <View style={styles.loadingSpinnerContainer}>
                        <LoadingSpinner fullScreen />
                    </View> :
                    <>
                        <InputField
                            style={styles.nameInput}
                            placeholder={'Food Name'}
                            value={name}
                            onTextChange={setName} />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ArrowAccordion sections={Sections} />
                        </View>
                        <View style={styles.submitButtonContainer}>
                            <Button
                                disabled={!canSubmit}
                                onPress={handleSubmitButtonPress}
                                text='Submit'
                                backgroundColor={theme.submitFoodScreen.submitButton.backgroundColor}
                                textColor={theme.submitFoodScreen.submitButton.textColor} />
                        </View>
                    </>}
            </View>
        </ScrollView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        flavors: state.flavors.all,
        textures: state.textures.all,
        misc: state.miscellaneous.all
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
        textAlignVertical: 'center',
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
        flexDirection: 'column',
        marginTop: 10
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