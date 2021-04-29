import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
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
import { MouthfeelState, FoodDetails, ApiData, VotableAttribute, AddOrUpdateAttributeRequest, ApiOperation } from '../../Redux/Models';
import { FormatAsTitleCase } from '../../Common';

interface TagsScreenProps {
    userId: number,
    selected: {
        loading: boolean,
        data: FoodDetails
    },
    textures: ApiData<VotableAttribute[]>,
    flavors: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>,
    addOrUpdate: ApiOperation
}

// TODO: Fix issue where the 3rd column goes off screen
const TagsScreen = (props: TagsScreenProps) => {
    const { userId, selected, textures, flavors, misc, addOrUpdate } = props;
    const { id, name } = selected?.data ?? {};

    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    // TODO: Spread result of new attribute being added into the global state... Or maybe the API should return a response that is jsut the whole object
    const { attributeType, preselectedAttributes } = route.params;

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
    }, [navigation]);
    
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
        selectedAttributes.forEach(a => dispatch(AddOrUpdateAttributeAction(attributeType, { foodId: id, userId: userId, attributeId: a })));
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior='automatic'>
            <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'cyan', paddingTop: 20, paddingBottom: 20 }}>
                {getLoadingState() ? <LoadingSpinner fullScreen /> :
                    <>
                        <AttributeList
                            items={getAttributes()}
                            disabledItems={preselectedAttributes}
                            attributeType={attributeType}
                            horizontal={false}
                            numColumns={3}
                            sortBy={'alphabetically'}
                            includeAddButton={false}
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={setSelectedAttributes} />
                        <View style={{ padding: 15 }}>
                            <Button text='Submit' disabled={addOrUpdate.loading} onPress={handleSubmitPressed} />
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
        misc: state.miscellaneous.all,
        addOrUpdate: state.foods.addOrUpdateAttribute
    }
})(TagsScreen);

const styles = StyleSheet.create({
    attributeListContainer: {
        width: Dimensions.get('window').width,
        backgroundColor: 'yellow',
        flexDirection: 'column',
        marginTop: 10
    },
    tagStyle: {
        width: ((Dimensions.get('window').width / 3) - 10),
        marginTop: 10,
        marginRight: -5,
    },
});