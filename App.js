/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native'
import store from './store/store'
import {Provider} from 'react-redux'
import {StackNavigator} from 'react-navigation'

import SearchScreen from './screens/CountrySearch/SearchScreen'
import DetailsScreen from './screens/CountryDetails/DetailsScreen'

export default class App extends Component<{}> {
  render() {
    const MainNavigator = StackNavigator({
      search: {screen: SearchScreen},
      details: {screen: DetailsScreen}
    })

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
            <MainNavigator />
        </View>
      </Provider>
    );
  }
}
