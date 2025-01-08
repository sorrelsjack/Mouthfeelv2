import React, { useState, useEffect } from 'react';
import { Keyboard, View, FlatList, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes, ConvertHexToRgba } from '../../Common';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { Button, EmptyView, ErrorView, FoodList, LoadingSpinner } from '../../Components';
import { SearchFoodsAction, ClearSearchAction } from '../../Redux/Actions';
import { ApiData, MouthfeelState } from '../../Redux/Models';
import { useNavigation } from '@react-navigation/native';
import { GlobalFontName } from '../CustomText/CustomText';

interface SearchInterfaceProps {
    theme: ThemeProp,
    onSearchStateChange?: (searchIsActive: boolean) => any;
}

const SearchInterface = (props: SearchInterfaceProps) => {
    const { theme, onSearchStateChange = () => { } } = props;

    const [searchIsActive, setSearchIsActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [nameChecked, setNameChecked] = useState(true);
    const [ingredientsChecked, setIngredientsChecked] = useState(true);
    const [attributesChecked, setAttributesChecked] = useState(true);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const all = useSelector((state: MouthfeelState) => state.foods.all);
    const searchResults = useSelector((state: MouthfeelState) => state.foods.searchResults);

    const updateSearch = (search: string) => setSearchQuery(search);

    const generateFilterArray = () =>
        [
            (nameChecked ? 'name' : ''),
            (ingredientsChecked ? 'ingredients' : ''),
            (attributesChecked ? 'attributes' : '')
        ];

    const handleSubmit = () => {
        Keyboard.dismiss();
        setSearchIsActive(true);
        onSearchStateChange(true);
        dispatch(SearchFoodsAction(searchQuery, generateFilterArray()));
    }

    const handleClear = () => {
        setSearchIsActive(false);
        onSearchStateChange(false);
        setSearchQuery('');
        dispatch(ClearSearchAction());
    }

    const handleClearFiltersPressed = () => {
        setNameChecked(false);
        setIngredientsChecked(false);
        setAttributesChecked(false);
    }

    const NoDataView = () => {
        if (searchResults.error) return (
            <ErrorView
                onButtonPress={() => { dispatch(SearchFoodsAction(searchQuery, generateFilterArray())) }}
                onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        )
        if (!searchResults.loading && !searchResults.data?.length) return <EmptyView text='No results found' />
        return null;
    }

    const SearchResults = () => {
        return (
            <View style={{ justifyContent: 'flex-start', marginTop: 15 }}>
                <NoDataView />
                {searchResults.loading
                    ? <LoadingSpinner />
                    : <View><FoodList items={searchResults.data ? all.filter(f => searchResults.data?.some(r => r === f.id)) : []} /></View>}
            </View>
        )
    }

    // Do not remove fontWeight, or font will not be Montserrat: https://github.com/react-native-elements/react-native-elements/issues/2191#issuecomment-557812813
    return (
        <View style={styles.wrapper}>
            <SearchBar
                platform={Platform.OS}
                clearIcon
                inputStyle={{ fontFamily: GlobalFontName }}
                placeholder={'Search'}
                onChangeText={updateSearch}
                value={searchQuery}
                onSubmitEditing={handleSubmit}
                onClear={handleClear} />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    fontFamily={GlobalFontName}
                    title='Name'
                    checked={nameChecked}
                    size={14}
                    onPress={() => setNameChecked(!nameChecked)}
                    checkedColor={theme.primaryThemeColor}
                    textStyle={styles.checkboxText}
                    containerStyle={{ flexShrink: 1, marginLeft: 0, marginRight: 0 }} />
                <CheckBox
                    fontFamily={GlobalFontName}
                    title='Ingredients'
                    checked={ingredientsChecked}
                    size={14}
                    onPress={() => setIngredientsChecked(!ingredientsChecked)}
                    checkedColor={theme.primaryThemeColor}
                    textStyle={styles.checkboxText}
                    containerStyle={{ flexShrink: 1, marginRight: 0 }} />
                <CheckBox
                    fontFamily={GlobalFontName}
                    title='Attributes'
                    checked={attributesChecked}
                    size={14}
                    onPress={() => setAttributesChecked(!attributesChecked)}
                    checkedColor={theme.primaryThemeColor}
                    textStyle={styles.checkboxText}
                    containerStyle={{ flexShrink: 1, marginRight: 0 }} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} textStyle={styles.buttonText} text='Search' onPress={handleSubmit} />
                <Button style={styles.button} textStyle={styles.buttonText} text='Clear Filters' onPress={handleClearFiltersPressed} />
            </View>
            {searchIsActive && <SearchResults />}
        </View>
    )
}

export default withTheme(SearchInterface);

const styles = StyleSheet.create({
    wrapper: {
        padding: 15
    },
    checkboxText: {
        fontWeight: 'normal'
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 0,
        marginTop: 5,
        marginBottom: -5
    },
    buttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        width: '40%'
    },
    buttonText: {
        fontSize: 14
    }
})