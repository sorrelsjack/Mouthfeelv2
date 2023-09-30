import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ThemeProp } from '../../Models';
import { AttributeList, Button, ErrorText, LoadingSpinner } from '../../Components';
import {
    GetAllFlavorsAction,
    GetAllTexturesAction,
    GetAllMiscellaneousAction,
    AddOrUpdateAttributeAction
} from '../../Redux/Actions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MouthfeelState, FoodDetails, ApiData, VotableAttribute, AddOrUpdateAttributeRequest, ApiOperation } from '../../Redux/Models';
import { FormatAsTitleCase } from '../../Common';
import Toast from 'react-native-simple-toast';

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

// TODO: fix issue on this screen where if you tap on a tag after already having hit submit, it might throw an error
// TODO: fix an issue where sometimes the toast shows up erroneously
const TagsScreen = (props: TagsScreenProps) => {
    const { userId, selected, textures, flavors, misc, addOrUpdate } = props;
    const { id, name } = selected?.data ?? {};

    const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

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
            title: FormatAsTitleCase(`${FormatAsTitleCase(`${attributeType}${attributeType !== 'miscellaneous' ? `s` : ''} For ${name}`)}`),
        });
    }, [navigation]);

    useEffect(() => {
        if (addOrUpdate.success) Toast.show(`'${getAttributes().filter(a => selectedAttributes.some(s => s === a.id)).map(a => a.name).join(', ')}' added to ${FormatAsTitleCase(name)}!`);

    }, [addOrUpdate.success])

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
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior='automatic'>
            <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 }}>
                {getLoadingState() ? <LoadingSpinner fullScreen /> :
                    <>
                        <AttributeList
                            items={getAttributes()}
                            disabledItems={preselectedAttributes}
                            attributeType={attributeType}
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            wrapperStyle={styles.attributeListWrapper}
                            listStyle={styles.attributeList}
                            horizontal={false}
                            numColumns={3}
                            sortBy={'alphabetically'}
                            includeAddButton={false}
                            contentContainerStyle={styles.attributeListContainer}
                            tagStyle={styles.tagStyle}
                            tagSize={'small'}
                            onChange={(ids: number[]) => setSelectedAttributes(ids)} />
                        <View style={{ padding: 15 }}>
                            <Button text='Submit' disabled={addOrUpdate.loading} onPress={handleSubmitPressed} />
                        </View>
                    </>}
                {addOrUpdate.error ? <ErrorText style={{ textAlign: 'center' }} scheme='light' text='There was an error updating the attributes.' /> : null}
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
        flexDirection: 'column',
        marginTop: 10
    },
    tagStyle: {
        width: ((Dimensions.get('window').width / 3) - 10),
        marginTop: 10,
    },
    attributeList: {
        flexDirection: 'row',
        marginRight: 0
    },
    attributeListWrapper: {
        paddingBottom: 0
    },
});