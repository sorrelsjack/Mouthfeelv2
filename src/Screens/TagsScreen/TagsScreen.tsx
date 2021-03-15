import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemeProp } from '../../Models';
import { AttributeList, Button } from '../../Components';
import {
    GetAllFlavorsAction,
    GetAllTexturesAction,
    GetAllMiscellaneousAction
} from '../../Redux/Actions';

// TODO: Get a nav param that says if flavors, textures, or misc should be fetched. Then, looking at the selected food in the store, highlight the ones that are already selected
// TODO: Change title to say something like Flavors For X
const TagsScreen = () => {
    const experience = ['cheesy', 'salty', 'firm', 'layered', 'crispy', 'chewy', 'savory'].map(i => ({ id: 1, name: i, description: 'test' }));

    useEffect(() => {

    }, [])

    return (
        <ScrollView
            contentContainerStyle={{ height: '100%' }}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic">
            <View style={{ height: '100%', justifyContent: 'space-between' }}>
                <AttributeList
                    items={experience}
                    includeAddButton={false}
                    horizontal={false}
                    contentContainerStyle={styles.attributeListContainer}
                    tagStyle={styles.tagStyle}
                    tagSize={'small'} />
                <View style={{ padding: 15 }}>
                    <Button text='Submit' onPress={() => { }} />
                </View>
            </View>
        </ScrollView>
    )
}

export default TagsScreen;

const styles = StyleSheet.create({
    attributeListContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tagStyle: {
        marginTop: 10
    },
});