import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Colors } from './../../Common';
import { HomeListItem } from './Components';

class HomeScreen extends Component {
    state = {
        search: ''
    }

    updateSearch = search => {
        this.setState({ search })
    };

    renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    render() {
        const items = ['Liked', 'Recommended', 'To Try']

        return (
            <View style={styles.wrapper}>
                <SearchBar
                    placeholder={'Food name, ingredient, or attribute'}
                    onChangeText={this.updateSearch}
                    value={this.state.search} />
                <FlatList
                    data={items}
                    ItemSeparatorComponent={this.renderItemSeparator}
                    renderItem={({item}) => <HomeListItem item={item} />}
                    keyExtractor={item => item} />
            </View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.homeScreenList.itemSeparator.backgroundColor
    }
})