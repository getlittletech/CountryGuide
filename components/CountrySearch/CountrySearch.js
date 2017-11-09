import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux'

import {darkGrey, inputHeight} from 'CountryGuide/styles/common'

import SearchBar from '../Search/SearchBar'
import CountriesList from '../CountriesList/CountriesList'

import * as actions from './actions'

class CountrySearch extends Component {
  state = { text: "" }
  placeholderText = "Search for a country"

  render() {
    return (
      <View style={styles.container}>
        <SearchBar onSearch={this.onSearch} onCancel={this.onCancel} />
        <CountriesList countries={this.props.countries} onCountrySelected={(country) => {console.log("selected ", country)}}/>
      </View>)
  }

  onSearch = (text) => {
    if (text.length > 0) {
      this.props.fetchCountries(text)
    } else {
      this.props.resetSearch()
    }
  }

  onCancel = () => {
    this.props.resetSearch()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

function mapStateToProps({countries}) {
  return {countries}
}

export default connect(mapStateToProps, actions)(CountrySearch)
