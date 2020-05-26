import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Colors, Routes } from './../../Common';
import { FoodList } from '../../Components';
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
        const items = [
            { icon: 'heart', text: 'Liked' },
            { icon: 'heart-broken', text: 'Disliked' },
            { icon: 'location-arrow', text: 'Recommended' },
            { icon: 'list-ul', text: 'To Try' },
            { icon: 'plus-circle', text: 'Submit New Food'}
        ]

        return (
            <View style={styles.wrapper}>
                <View style={{ padding: 15 }}>
                    <SearchBar
                        platform={Platform.OS}
                        placeholder={'Food name, ingredient, or attribute'}
                        onChangeText={this.updateSearch}
                        value={this.state.search} />
                </View>
                <FlatList
                    data={items}
                    ItemSeparatorComponent={this.renderItemSeparator}
                    renderItem={({item}) => <HomeListItem item={item} onPress={() => this.props.navigation.navigate(Routes.FoodDetails)} />}
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