import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
    Tag,
    AttributeList,
    LoadingSpinner,
    InputField,
    Button,
    ArrowAccordion,
    SearchInterface,
    ErrorText
} from '../../Components';
import { SearchBar, withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GetAllVotableAttributesAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest, ApiData, ApiOperation } from '../../Redux/Models';
import { GlobalFontName } from '../../Config';

interface SubmitFoodScreenProps {
    theme: ThemeProp,
    createNewFood: ApiOperation,
    flavors: ApiData<VotableAttribute[]>,
    textures: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// TODO: There seems to be rendering issues here with the lists; inconsistnet though. sometimes the list gets chopped off or whatnot
// TODO: Handle errors here, for if a name is already being used or something else...
// TODO: When the user finishes typing the name, call and endpoint to fetch foods with the same / similar names and ask if they meant that one instead
const SubmitFoodScreen = (props: SubmitFoodScreenProps) => {
    const { theme, createNewFood, flavors, textures, misc } = props;

    const [name, setName] = useState('');
    //const [searchText, setSearchText] = useState('');
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [selectedTextures, setSelectedTextures] = useState([]);
    const [selectedMisc, setSelectedMisc] = useState([]);

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

    const handleSearchTextChanged = (text: string) => {
        //setSearchText(text);
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
            content: (
                flavors.loading
                    ? <View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>
                    : <View style={styles.sectionContainer}>
                        <AttributeList
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='texture'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            items={flavors.data || []}
                            sortBy={'alphabetically'} /></View>
            )
        },
        {
            title: 'Texture',
            content: (
                textures.loading
                    ? <View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>
                    : <View style={styles.sectionContainer}>
                        <AttributeList
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='texture'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            items={textures.data || []}
                            sortBy={'alphabetically'} /></View>
            )
        },
        {
            title: 'Miscellaneous',
            content: (
                misc.loading
                    ? <View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>
                    : <View style={styles.sectionContainer}>
                        <AttributeList
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='miscellaneous'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            items={misc.data || []}
                            sortBy={'alphabetically'} /></View>
            )
        }
    ]

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.wrapper}>
                <InputField
                    style={styles.textInput}
                    placeholder={'Food Name'}
                    textPosition='center'
                    value={name}
                    onTextChange={setName} />
                {/*<InputField
                    style={styles.textInput}
                    placeholder={'Search Attributes...'}
                    textPosition='center'
                    value={searchText}
                onTextChange={handleSearchTextChanged} />*/}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ArrowAccordion sections={Sections} />
                </View>
                <View style={styles.submitButtonContainer}>
                    {createNewFood.error ? <ErrorText text={createNewFood.error.Message} style={{ marginBottom: 20 }} /> : null}
                    <Button
                        disabled={!canSubmit}
                        onPress={handleSubmitButtonPress}
                        text='Submit'
                        backgroundColor={theme.submitFoodScreen.submitButton.backgroundColor}
                        textColor={theme.submitFoodScreen.submitButton.textColor} />
                </View>
            </View>
        </ScrollView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        createNewFood: state.foods.createNewFood,
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
    textInput: {
        backgroundColor: 'white',
        textAlignVertical: 'center',
        marginBottom: 20,
        borderWidth: 1,
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
    sectionContainer: {
        width: '100%',
        alignItems: 'center'
    },
    attributeListContainer: {
        width: '100%',
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