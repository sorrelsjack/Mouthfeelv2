import React, { useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
    StyleProp,
    ViewStyle
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
    ErrorText,
    CustomText
} from '../../Components';
import { SearchBar, withTheme } from 'react-native-elements';
import { AttributeType, ImagePickerResponse, ThemeProp } from '../../Models';
import { CreateFoodAction, GetAllVotableAttributesAction, GetCurrentUserAction, ResetCreateFoodAction } from '../../Redux/Actions';
import { VotableAttribute, MouthfeelState, CreateFoodRequest, ApiData, ApiOperation } from '../../Redux/Models';
import { launchImageLibrary } from 'react-native-image-picker'
import Carousel from 'react-native-snap-carousel';
import { FormatAsTitleCase, IsIos } from '../../Common';

interface SubmitFoodScreenProps {
    theme: ThemeProp,
    userId: number,
    createNewFood: ApiOperation,
    flavors: ApiData<VotableAttribute[]>,
    textures: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// TODO: Prevent the attribute lists from re-rendering and losign their selections when an error happens
// TODO: if you add the Pizza Hut picture, its really big
// TODO: fix issue where the tag lists re-render their sizes once or twice on initial load
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

    const canSubmit = !!name && !createNewFood.error && !createNewFood.loading;

    useEffect(() => {
        if (!userId) dispatch(GetCurrentUserAction());
        dispatch(GetAllVotableAttributesAction());
        return () => { dispatch(ResetCreateFoodAction()) }
    }, [])

    const handleSubmitButtonPress = () => {
        const request: CreateFoodRequest = {
            name: name,
            image: IsIos() ? image.uri.replace("file://", "") : image.uri,
            flavors: selectedFlavors,
            textures: selectedTextures,
            miscellaneous: selectedMisc
        }

        dispatch(CreateFoodAction(request));
    }

    const handleImagePlaceholderPressed = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.uri) {
                dispatch(ResetCreateFoodAction());
                setImage(response);
                setUsingPlaceholderImage(false);
            }
        });
    }

    const handleTextChange = (text: string) => {
        dispatch(ResetCreateFoodAction());
        setName(text);
    }

    const ListOfAttributes = (props: {
        attribute: ApiData<VotableAttribute[]>,
        columnWrapperStyle: StyleProp<ViewStyle>,
        attributeType: AttributeType,
        onChange: (ids: number[]) => any,
        nominalForm?: string
    }) => {
        const { attribute, columnWrapperStyle, attributeType, onChange, nominalForm } = props;
        const pluralNoun = nominalForm || `${attributeType}s`;

        return (
            <View>
                <CustomText style={styles.title}>{FormatAsTitleCase(pluralNoun)}</CustomText>
                {attribute.loading
                    ? <View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>
                    : <View style={styles.sectionContainer}>
                        <AttributeList
                            columnWrapperStyle={columnWrapperStyle}
                            wrapperStyle={styles.attributeListWrapper}
                            listStyle={styles.attributeList}
                            includeAddButton={false}
                            horizontal={false}
                            numColumns={3}
                            attributeType={attributeType}
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={(ids: number[]) => {
                                dispatch(ResetCreateFoodAction());
                                onChange(ids);
                            }}
                            items={attribute.data || []}
                            sortBy={'alphabetically'} /></View>}
                {attribute.error ? <ErrorText style={{ textAlign: 'center' }} text={`There was an error fetching the ${pluralNoun}.`} /> : null}
            </View>
        )
    }

    const flavorsList = useMemo(() => {
        return (
            <ListOfAttributes
                attribute={flavors}
                attributeType={'flavor'}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                onChange={(ids: number[]) => setSelectedFlavors(ids)} />
        )
    }, [flavors])

    const texturesList = useMemo(() => {
        return (
            <ListOfAttributes
                attribute={textures}
                attributeType={'texture'}
                columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                onChange={(ids: number[]) => setSelectedTextures(ids)} />
        )
    }, [textures])

    const miscList = useMemo(() => {
        return (
            <ListOfAttributes
                attribute={misc}
                attributeType={'miscellaneous'}
                columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                onChange={(ids: number[]) => setSelectedMisc(ids)}
                nominalForm='miscellaneous attributes' />
        )
    }, [misc])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.wrapper}>
                <InputField
                    style={styles.textInput}
                    placeholder={'Food Name'}
                    textPosition='center'
                    value={name}
                    onTextChange={handleTextChange}
                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            style={!usingPlaceholderImage ? {} : styles.imageContainer}
                            onPress={handleImagePlaceholderPressed}
                            disabled={createNewFood.loading}>
                            {usingPlaceholderImage
                                ? <View>
                                    <CustomText style={styles.placeholderImageText}>Add An Image</CustomText>
                                    <Image source={require('../../Assets/plate.png')} style={styles.placeholderImage} />
                                </View>
                                : <Image source={{ uri: image.uri }} style={[styles.image, { height: image.height, width: image.width }]} />}
                        </TouchableOpacity>
                    </View>
                    {createNewFood.loading
                        ? <LoadingSpinner fullScreen={false} />
                        : (<View>
                            {flavorsList}
                            {texturesList}
                            {miscList}
                        </View>)}
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
        minHeight: 60,
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
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    sectionContainer: {

    },
    attributeList: {
        flexDirection: 'row',
        marginRight: 0
    },
    attributeListContainer: {
        width: '100%',
        flexDirection: 'column',
        paddingTop: 10
    },
    attributeListWrapper: {
        width: '100%',
        alignItems: 'center',
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