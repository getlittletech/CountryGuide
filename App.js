/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native'

import SearchBar from 'CountryGuide/components/Search/SearchBar'

export default class App extends Component<{}> {
  render() {
    return (
      <View
        style={{flex: 1, paddingTop: 100}}>
        <SearchBar onSearch={this.onSearch} />
      </View>
    );
  }

  onSearch = (text) => {
    console.log(text)
  }
}
