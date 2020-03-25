import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

class HomeScreen extends Component {
    state = {
        search: ''
    }

    updateSearch = search => {
        this.setState({ search })
    };

    render() {
        return(
            <View>
                <SearchBar
                    onChangeText={this.updateSearch}
                    value={this.state.search} />
            </View>
        )
    }
}

export default HomeScreen;