import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { ConvertHexToRgba, Routes } from '../../Common';
import { SearchInterface } from '../../Components';
import { ThemeProp } from '../../Models';
import { HomeListItem } from './Components';

interface HomeScreenProps {
    theme: ThemeProp
}

// TODO: Analytics
const HomeScreen = (props: HomeScreenProps) => {
    const { theme } = props;

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
        { icon: 'list-ul', text: 'Foods To Try', route: Routes.ToTry },
        { icon: 'plus-circle', text: 'Submit New Food', route: Routes.SubmitFood }
    ]

    return (
        <View style={styles.wrapper}>
            <SearchInterface
                onSearchStateChange={setSearchIsActive} />
            {!searchIsActive &&
                (<FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={items}
                    ItemSeparatorComponent={renderItemSeparator}
                    renderItem={({ item }) => <HomeListItem item={item} onPress={() => navigation.navigate(item.route || Routes.FoodDetails)} />}
                    keyExtractor={item => item.text} />)}
        </View>
    )
}

export default withTheme(HomeScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: ConvertHexToRgba(theme.primaryThemeColor, .6)
    },
    contentContainerStyle: {
        flex: 1,
        marginTop: 30
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})