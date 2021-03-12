import React, { useState, useEffect } from 'react';
import { Keyboard, View, FlatList, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';
import { Button } from '../../Components';
import { SearchFoodsAction, ClearSearchAction } from '../../Redux/Actions';

interface SearchInterfaceProps {
    theme: ThemeProp,
    onSearchStateChange: (searchIsActive: boolean) => any;
}

const SearchInterface = (props: SearchInterfaceProps) => {
    const { theme, onSearchStateChange } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [nameChecked, setNameChecked] = useState(true);
    const [ingredientsChecked, setIngredientsChecked] = useState(true);
    const [attributesChecked, setAttributesChecked] = useState(true);

    const dispatch = useDispatch();

    const updateSearch = (search: string) => setSearchQuery(search);

    const generateFilterArray = () => 
    [ 
        (nameChecked ? 'name' : ''), 
        (ingredientsChecked ? 'ingredients' :  ''), 
        (attributesChecked ? 'attributes' : '') 
    ];

    const handleSubmit = () => {
        Keyboard.dismiss();
        onSearchStateChange(true);
        dispatch(SearchFoodsAction(searchQuery, generateFilterArray()));
    }

    const handleClear = () => {
        onSearchStateChange(false);
        setSearchQuery('');
        dispatch(ClearSearchAction());
    }

    const handleClearFiltersPressed = () => {
        setNameChecked(false);
        setIngredientsChecked(false);
        setAttributesChecked(false);
    }

    return (
        <View style={{ padding: 15 }}>
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
                    title='Name' 
                    checked={nameChecked} 
                    size={14}
                    onPress={() => setNameChecked(!nameChecked)}
                    checkedColor={theme.primaryThemeColor} 
                    containerStyle={{ marginLeft: 0, marginRight: 0 }} />
                <CheckBox 
                    title='Ingredients' 
                    checked={ingredientsChecked} 
                    size={14}
                    onPress={() => setIngredientsChecked(!ingredientsChecked)}
                    checkedColor={theme.primaryThemeColor} 
                    containerStyle={{ marginRight: 0 }} />
                <CheckBox 
                    title='Attributes' 
                    checked={attributesChecked} 
                    size={14}
                    onPress={() => setAttributesChecked(!attributesChecked)}
                    checkedColor={theme.primaryThemeColor}
                    containerStyle={{ marginRight: 0 }} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} textStyle={styles.buttonText} text='Search' onPress={handleSubmit} />
                <Button style={styles.button} textStyle={styles.buttonText} text='Clear Filters' onPress={handleClearFiltersPressed} />
            </View>
        </View>
    )
}

export default withTheme(SearchInterface);

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginLeft: 0, 
        marginRight: -15, 
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