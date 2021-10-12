import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes, Colors, GetDeltaE, ConvertHexToRgbaArray } from '../../Common';
import { FoodList, SearchInterface, LoadingSpinner, EmptyView, ErrorView } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';
import { GetLikedFoodsAction, GetDislikedFoodsAction } from '../../Redux/Actions';
import { MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

interface HomeScreenProps {
    theme: ThemeProp,
    all: FoodDetails[]
}

// TODO: Analytics
const HomeScreen = (props: HomeScreenProps) => {
    const { theme, all } = props;

    const [searchIsActive, setSearchIsActive] = useState(false);

    const navigation = useNavigation();
    const styles = createStyles(theme);

    const renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    const items = [
        { icon: 'heart', text: 'Liked', route: Routes.Liked },
        { icon: 'heart-broken', text: 'Disliked', route: Routes.Disliked },
        { icon: 'location-arrow', text: 'Recommended Foods', route: Routes.Recommended },
        { icon: 'list-ul', text: 'Foods To Try', route: Routes.ToTry },
        { icon: 'plus-circle', text: 'Submit New Food', route: Routes.SubmitFood }
    ]

    return (
        <ScrollView style={styles.wrapper}>
            <SearchInterface
                onSearchStateChange={setSearchIsActive} />
            {!searchIsActive &&
                (<FlatList
                    data={items}
                    ItemSeparatorComponent={renderItemSeparator}
                    renderItem={({ item }) => <HomeListItem item={item} onPress={() => navigation.navigate(item.route || Routes.FoodDetails)} />}
                    keyExtractor={item => item.text} />)}
        </ScrollView>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        all: state.foods.all,
        searchResults: state.foods.searchResults
    }
})(HomeScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})