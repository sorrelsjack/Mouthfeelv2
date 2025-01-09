import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { FormatAsTitleCase } from '../../Common';
import { AttributeList, Button, ErrorText, LoadingSpinner } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { useAttributeState } from '../../Hooks/useAttributeState';
import {
    AddOrUpdateAttributeAction,
    GetAllFlavorsAction,
    GetAllMiscellaneousAction,
    GetAllTexturesAction
} from '../../Redux/Actions';

// TODO: fix issue on this screen where if you tap on a tag after already having hit submit, it might throw an error
// TODO: fix an issue where sometimes the toast shows up erroneously
const TagsScreen = () => {
    const userId = useAppStore(s => s.user.profile.data?.id)
    const selected = useAppStore(s => s.foods.selected)
    const addOrUpdate = useAppStore(s => s.foods.addOrUpdateAttribute)

    const { id, name = '' } = selected?.data ?? {};

    const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { attributeType, preselectedAttributes } = route.params;

    const attribute = useAttributeState(attributeType);

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
        if (!attribute?.data?.length) return;
        if (addOrUpdate.success) Toast.show(`'${attribute.data.filter(a => selectedAttributes.some(s => s === a.id)).map(a => a.name).join(', ')}' added to ${FormatAsTitleCase(name)}!`);

    }, [addOrUpdate.success])

    if (!userId || !id) return;

    const handleSubmitPressed = () => {
        selectedAttributes.forEach(a => dispatch(AddOrUpdateAttributeAction(attributeType, { foodId: id, userId, attributeId: a })));
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior='automatic'>
            <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 }}>
                {attribute?.loading ? <LoadingSpinner fullScreen /> :
                    <>
                        <AttributeList
                            items={attribute?.data ?? []}
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
                        <View style={styles.submitButtonContainer}>
                            <Button text='Submit' disabled={addOrUpdate.loading} onPress={handleSubmitPressed} />
                        </View>
                    </>}
                {addOrUpdate.error ? <ErrorText style={styles.errorText} scheme='light' text='There was an error updating the attributes.' /> : null}
            </View>
        </ScrollView>
    )
}

export default TagsScreen;

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
    submitButtonContainer: {
        padding: 15
    },
    errorText: {
        textAlign: 'center'
    }
});