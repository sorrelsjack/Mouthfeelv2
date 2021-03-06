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
import { ImagePickerResponse, ThemeProp } from '../../Models';
import { CreateFoodAction, GetAllVotableAttributesAction, GetCurrentUserAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest, ApiData, ApiOperation } from '../../Redux/Models';
import { GlobalFontName } from '../../Config';
import { launchImageLibrary } from 'react-native-image-picker'
import Carousel from 'react-native-snap-carousel';
import { IsIos } from '../../Common';

interface SubmitFoodScreenProps {
    theme: ThemeProp,
    userId: number,
    createNewFood: ApiOperation,
    flavors: ApiData<VotableAttribute[]>,
    textures: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// TODO: need error support for attributes not coming up
// TODO: Fix issue where collapsible completely gets rid of the rendered content if a tag is tapped
// TODO: need loading UX here -- fullscreen loading indicator while the food is being created
const SubmitFoodScreen = (props: SubmitFoodScreenProps) => {
    const { 
        theme, 
        userId,
        createNewFood, 
        flavors, 
        textures, 
        misc 
    } = props;

    const [name, setName] = useState('');
    const [usingPlaceholderImage, setUsingPlaceholderImage] = useState(true);
    const [image, setImage] = useState<ImagePickerResponse>({ base64: '', uri: '', width: 0, height: 0, fileSize: 0, type: '', fileName: '' });
    const [selectedFlavors, setSelectedFlavors] = useState<number[]>([]);
    const [selectedTextures, setSelectedTextures] = useState<number[]>([]);
    const [selectedMisc, setSelectedMisc] = useState<number[]>([]);

    const styles = createStyles(theme);
    const dispatch = useDispatch();

    const canSubmit = !!name && !createNewFood.error;

    useEffect(() => {
        if (!userId) dispatch(GetCurrentUserAction());
        dispatch(GetAllVotableAttributesAction());
    }, [])

    // TODO: On submit, be able to send the image to the server
    const handleSubmitButtonPress = () => {
        const request: CreateFoodRequest = {
            name: name,
            image: IsIos() ? image.uri.replace("file://", "") : image.uri,
            flavors: selectedFlavors,
            textures: selectedTextures,
            miscellaneous: selectedMisc
        }

        dispatch(CreateFoodAction(request));
        // Gather up name, imageUrl (or imageData?), flavor ids, texture ids, and misc ids, then pile them into an object and do a request
    }

    const handleImagePlaceholderPressed = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.uri) {
                setImage(response);
                setUsingPlaceholderImage(false);
            }
        });
    }

    const Sections = [
        {
            title: 'Flavors',
            content: (
                flavors.loading
                    ? <View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>
                    : <View style={styles.sectionContainer}>
                        <AttributeList
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            wrapperStyle={styles.attributeListWrapper}
                            listStyle={styles.attributeList}
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='flavor'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={(ids: number[]) => setSelectedFlavors(ids)}
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
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            wrapperStyle={styles.attributeListWrapper}
                            listStyle={styles.attributeList}
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='texture'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={(ids: number[]) => setSelectedTextures(ids)}
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
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            wrapperStyle={styles.attributeListWrapper}
                            listStyle={styles.attributeList}
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={2}
                            attributeType='miscellaneous'
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={(ids: number[]) => setSelectedMisc(ids)}
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
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={!usingPlaceholderImage ? {} : styles.imageContainer} onPress={handleImagePlaceholderPressed}>
                            {usingPlaceholderImage
                                ? <View>
                                    <Text style={styles.placeholderImageText}>Add An Image</Text>
                                    <Image source={require('../../Assets/plate.png')} style={styles.placeholderImage} />
                                </View>
                                : <Image source={{ uri: image.uri }} style={[styles.image, { height: image.height, width: image.width }]} />}
                        </TouchableOpacity>
                    </View>
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
        userId: state.user.profile.data?.id,
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
    },
    placeholderImageText: {
        alignSelf: 'center',
        opacity: .5,
        marginTop: 10
    },
    placeholderImage: {
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
        alignItems: 'center'
    },
    attributeList: {
        flexDirection: 'row',
        marginRight: 0
    },
    attributeListContainer: {
        flexDirection: 'column',
        paddingTop: 10
    },
    attributeListWrapper: {
        paddingBottom: 0
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