import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ThemeProp } from '../../Models';
import { AttributeList, Button, LoadingSpinner } from '../../Components';
import {
    GetAllFlavorsAction,
    GetAllTexturesAction,
    GetAllMiscellaneousAction,
    AddOrUpdateAttributeAction
} from '../../Redux/Actions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MouthfeelState, FoodDetails, ApiData, VotableAttribute, AddOrUpdateAttributeRequest } from '../../Redux/Models';
import { FormatAsTitleCase } from '../../Common';

interface TagsScreenProps {
    userId: number,
    selected: {
        loading: boolean,
        data: FoodDetails
    },
    textures: ApiData<VotableAttribute[]>,
    flavors: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// TODO: Is it possible to arrange these by element size instead?
const TagsScreen = (props: TagsScreenProps) => {
    const { userId, selected, textures, flavors, misc } = props;
    const { id, name } = selected?.data ?? {};

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { attributeType } = route.params;

    useEffect(() => {

        switch (attributeType) {
            case 'flavor':
                dispatch(GetAllFlavorsAction());
                break;
            case 'texture':
                dispatch(GetAllTexturesAction());
                break;
            case 'miscellaneous':
                dispatch(GetAllMiscellaneousAction());
                break;
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: FormatAsTitleCase(`${FormatAsTitleCase(`${attributeType}s For ${name}`)}`),
        });
    }, [navigation])

    const getLoadingState = () => {
        switch (attributeType) {
            case 'flavor': return flavors.loading
            case 'texture': return textures.loading
            case 'miscellaneous': return misc.loading
            default: return false
        }
    }

    const getAttributes = () => {
        switch (attributeType) {
            case 'flavor': return flavors.data ?? [];
            case 'texture': return textures.data ?? [];
            case 'miscellaneous': return misc.data ?? [];
            default: return []
        }
    }

    const handleSubmitPressed = () => {
        const request: AddOrUpdateAttributeRequest = {
            foodId: id,
            userId: userId,
            attributeId: id // TODO: Fix this so we dispatch a bunch of requests, based on the tags we have selected
        };
        
        dispatch(AddOrUpdateAttributeAction(attributeType, request));
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic">
            <View style={{ height: '100%', justifyContent: 'space-between', padding: 20 }}>
                {getLoadingState() ? <LoadingSpinner fullScreen /> :
                    <>
                        <AttributeList
                            items={getAttributes()}
                            attributeType={attributeType}
                            horizontal={false}
                            numColumns={3}
                            sortBy={'alphabetically'}
                            includeAddButton={false}
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'} />
                        <View style={{ padding: 15 }}>
                            <Button text='Submit' onPress={handleSubmitPressed} />
                        </View>
                    </>}
            </View>
        </ScrollView>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        userId: state.user.profile.data?.id,
        selected: state.foods.selected,
        flavors: state.flavors.all,
        textures: state.textures.all,
        misc: state.miscellaneous.all
    }
})(TagsScreen);

const styles = StyleSheet.create({
    attributeListContainer: {
        flexDirection: "column",
        flexWrap: "wrap"
    },
    tagStyle: {
        marginTop: 10
    },
});