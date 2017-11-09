import React, { Component } from 'react'

import { ListItem } from 'react-native-elements'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import { PropTypes } from 'prop-types';

export default class CountryItem extends Component {

  render() {
    const {country} = this.props
    return (
      <ListItem
        title={country.name}
        onPress={() => {this.props.onCountrySelected(country)}}
      />
    )
  }
}

CountryItem.propTypes = {
  country: PropTypes.object.isRequired,
  onCountrySelected: PropTypes.func.isRequired
}
