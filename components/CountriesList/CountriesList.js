import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  LayoutAnimation
} from 'react-native';

import CountryItem from './CountryItem'
import Loading from 'CountryGuide/components/LoadingView/Loading'

import { List } from 'react-native-elements'

import { PropTypes } from 'prop-types';

export default class CountriesList extends Component {

  componentWillUpdate() {
    //UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    //LayoutAnimation.spring();
  }

  render() {
    const {countries, error, isFetching} = this.props.countries
    // One could potentially use .slice(0, 50) to reduce the amount of rows and add LayoutAnimation

    if (!!countries && countries.length > 0) {
      return (
        <ScrollView
          keyboardShouldPersistTaps='always'>
          <List
            containerStyle={{
              marginTop: 0,
              borderTopWidth: 0
          }}>
            {countries.map(
              (country) => <CountryItem country={country} key={country.alpha3Code} onCountrySelected={this.props.onCountrySelected}/>)}
          </List>
        </ScrollView>
      )
    }

    if (isFetching && countries.length == 0) {
      return (
        <View style={{marginTop: 30}}>
          <Loading />
        </View>
      )
    }

    if (!!error) {
      <View style={{marginTop: 10}}>
        <Text>error</Text>
      </View>
    }

    return null
  }
}

CountriesList.propTypes = {
  countries: PropTypes.object,
  onCountrySelected: PropTypes.func.isRequired
}
