import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';
import { SearchFoodsAction } from '../../Redux/Actions';

interface SearchInterfaceProps {
    theme: ThemeProp
}

// TODO: Create Redux action to clear search results
// TODO: Put search results in place of 'Home' screen stuff if we have results
const SearchInterface = (props: SearchInterfaceProps) => {
    const { theme } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [nameChecked, setNameChecked] = useState(false);
    const [ingredientsChecked, setIngredientsChecked] = useState(false);
    const [attributesChecked, setAttributesChecked] = useState(false);

    const dispatch = useDispatch();

    const updateSearch = (search: string) => setSearchQuery(search);

    const generateFilterArray = () => 
    [ 
        (nameChecked ? 'name' : ''), 
        (ingredientsChecked ? 'ingredients' :  ''), 
        (attributesChecked ? 'attributes' : '') 
    ];

    const handleSubmit = () => {
        dispatch(SearchFoodsAction(searchQuery, generateFilterArray()));
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
                onClear={() => setSearchQuery('')} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0, marginRight: -15, marginTop: 5, marginBottom: -5 }}>
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
        </View>
    )
}

export default withTheme(SearchInterface);