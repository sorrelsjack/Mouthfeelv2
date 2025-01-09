import { isNil } from 'lodash/fp';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { withTheme } from 'react-native-elements';
import { Asset as ImagePickerAsset, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { FormatAsTitleCase, IsIos } from '../../Common';
import {
    AttributeList,
    Button,
    CustomText,
    ErrorText,
    InputField,
    LoadingSpinner
} from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { useAttributeState } from '../../Hooks/useAttributeState';
import { AttributeType, ThemeProp } from '../../Models';
import { CreateFoodAction, GetAllVotableAttributesAction, GetCurrentUserAction, ResetCreateFoodAction } from '../../Redux/Actions';
import { CreateFoodRequest } from '../../Redux/Models';

interface SubmitFoodScreenProps {
    theme: ThemeProp
}

// TODO: Prevent the attribute lists from re-rendering and losign their selections when an error happens
// TODO: if you add the Pizza Hut picture, its really big
// TODO: fix issue where the tag lists re-render their sizes once or twice on initial load
// TODO: fix issue where loading anim stutters
// TODO: Add error UX that's better than the current one. Also, fix issue where trying to add a food throws a 500
const SubmitFoodScreen = (props: SubmitFoodScreenProps) => {
    const {
        theme,
    } = props;

    const userId = useAppStore(s => s.user.profile.data?.id);
    const createNewFood = useAppStore(s => s.foods.createNewFood)

    const [name, setName] = useState('');
    const [usingPlaceholderImage, setUsingPlaceholderImage] = useState(true);
    const [image, setImage] = useState<ImagePickerAsset>({ base64: '', uri: '', width: 0, height: 0, fileSize: 0, type: '', fileName: '' });
    const [selectedFlavors, setSelectedFlavors] = useState<number[]>([]);
    const [selectedTextures, setSelectedTextures] = useState<number[]>([]);
    const [selectedMisc, setSelectedMisc] = useState<number[]>([]);

    const flavors = useAttributeState('flavor');
    const textures = useAttributeState('texture');
    const misc = useAttributeState('miscellaneous');

    const styles = createStyles(theme);
    const dispatch = useDispatch();

    const canSubmit = useMemo(() => !!name && !createNewFood.error && !createNewFood.loading, [name, createNewFood.error, createNewFood.loading]);

    useEffect(() => {
        if (!userId) dispatch(GetCurrentUserAction());
        dispatch(GetAllVotableAttributesAction());
        return () => { dispatch(ResetCreateFoodAction()) }
    }, [])

    const handleSubmitButtonPress = () => {
        if (isNil(image.uri)) {
            // TODO: need error UX here or to at least not allow them to submit if there is no uri
            return;
        }
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
            if (response?.assets?.[0]) {
                dispatch(ResetCreateFoodAction());
                setImage(response?.assets?.[0]);
                setUsingPlaceholderImage(false);
            }
        });
    }

    const handleTextChange = (text: string) => {
        dispatch(ResetCreateFoodAction());
        setName(text);
    }

    const ListOfAttributes = (props: {
        columnWrapperStyle: StyleProp<ViewStyle>,
        attributeType: AttributeType,
        onChange: (ids: number[]) => any,
        nominalForm?: string
    }) => {
        const { columnWrapperStyle, attributeType, onChange, nominalForm } = props;
        const pluralNoun = nominalForm || `${attributeType}s`;

        const attribute = useAttributeState(attributeType);

        return (
            <View style={{ marginTop: 20 }}>
                <CustomText style={styles.title}>{FormatAsTitleCase(pluralNoun)}</CustomText>
                {attribute?.loading
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
                            items={attribute?.data || []}
                            sortBy={'alphabetically'} /></View>}
                {attribute?.error ? <ErrorText style={{ textAlign: 'center' }} text={`There was an error fetching the ${pluralNoun}.`} /> : null}
            </View>
        )
    }

    const flavorsList = useMemo(() => {
        return (
            <ListOfAttributes
                attributeType={'flavor'}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                onChange={(ids: number[]) => setSelectedFlavors(ids)} />
        )
    }, [flavors])

    const texturesList = useMemo(() => {
        return (
            <ListOfAttributes
                attributeType={'texture'}
                columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                onChange={(ids: number[]) => setSelectedTextures(ids)} />
        )
    }, [textures])

    const miscList = useMemo(() => {
        return (
            <ListOfAttributes
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
                        : (<View style={{ marginHorizontal: -20 }}>
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

export default withTheme(SubmitFoodScreen);

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