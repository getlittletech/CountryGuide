/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native'
import store from './store/store'
import {Provider} from 'react-redux'

import CountrySearch from 'CountryGuide/components/CountrySearch/CountrySearch'

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View
          style={{flex: 1, paddingTop: 100}}>
          <CountrySearch />
        </View>
      </Provider>
    );
  }
}
