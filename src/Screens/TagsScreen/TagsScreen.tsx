import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ThemeProp } from '../../Models';
import { AttributeList, Button } from '../../Components';
import {
    GetAllFlavorsAction,
    GetAllTexturesAction,
    GetAllMiscellaneousAction
} from '../../Redux/Actions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MouthfeelState, FoodDetails, ApiData, VotableAttribute } from '../../Redux/Models';
import { FormatAsTitleCase } from '../../Common';

interface TagsScreenProps {
    selected: {
        loading: boolean,
        data: FoodDetails
    },
    textures: ApiData<VotableAttribute[]>,
    flavors: ApiData<VotableAttribute[]>,
    misc: ApiData<VotableAttribute[]>
}

// TODO: Fix issue where taglist doesn't wrap to next line
const TagsScreen = (props: TagsScreenProps) => {
    const { selected, textures, flavors, misc } = props;
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

    const getAttributes = () => {
        switch (attributeType) {
            case 'flavor': return flavors.data ?? [];
            case 'texture': return textures.data ?? [];
            case 'miscellaneous': return misc.data ?? [];
            default: return []
        }
    }

    const handleSubmitPressed = () => {

    }

    return (
        <ScrollView
            contentContainerStyle={{ height: '100%' }}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic">
            <View style={{ height: '100%', justifyContent: 'space-between' }}>
                <AttributeList
                    items={getAttributes()}
                    attributeType={attributeType}
                    includeAddButton={false}
                    horizontal={false}
                    contentContainerStyle={styles.attributeListContainer}
                    tagStyle={styles.tagStyle}
                    tagSize={'small'} />
                <View style={{ padding: 15 }}>
                    <Button text='Submit' onPress={handleSubmitPressed} />
                </View>
            </View>
        </ScrollView>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        selected: state.foods.selected,
        flavors: state.flavors.all,
        textures: state.textures.all,
        misc: state.miscellaneous.all
    }
})(TagsScreen);

const styles = StyleSheet.create({
    attributeListContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tagStyle: {
        marginTop: 10
    },
});