import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { FoodList } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';

interface HomeScreenProps {
    theme: ThemeProp,
    navigation: any // TODO: Fix
}

const HomeScreen = (props: HomeScreenProps) => {
    const { theme } = props;
    const [searchQuery, setSearchQuery] = useState('');

    const styles = createStyles(theme);

    const updateSearch = (search: string) => setSearchQuery(search);


    const renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    const items = [
        { icon: 'heart', text: 'Liked' },
        { icon: 'heart-broken', text: 'Disliked' },
        { icon: 'location-arrow', text: 'Recommended' },
        { icon: 'list-ul', text: 'To Try' },
        { icon: 'plus-circle', text: 'Submit New Food', route: Routes.SubmitFood }
    ]

    return (
        <View style={styles.wrapper}>
            <View style={{ padding: 15 }}>
                <SearchBar
                    platform={Platform.OS}
                    inputStyle={{ fontFamily: GlobalFontName }}
                    placeholder={'Food name, ingredient, or attribute'}
                    onChangeText={updateSearch}
                    value={searchQuery} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0, marginRight: -15, marginTop: 5, marginBottom: -5 }}>
                    <CheckBox title='Name' checked={true} size={16} checkedColor={theme.primaryThemeColor} containerStyle={{ marginLeft: 0, marginRight: 0 }} />
                    <CheckBox title='Ingredients' checked={true} size={16} checkedColor={theme.primaryThemeColor} containerStyle={{ marginRight: 0 }} />
                    <CheckBox title='Attributes' checked={true} size={16} checkedColor={theme.primaryThemeColor} />
                </View>
            </View>
            <FlatList
                data={items}
                ItemSeparatorComponent={renderItemSeparator}
                renderItem={({ item }) => <HomeListItem item={item} onPress={() => props.navigation.navigate(item.route || Routes.FoodDetails)} />}
                keyExtractor={item => item.text} />
        </View>
    )
}

export default withTheme(HomeScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})