import React, {Component} from 'react'
import {View, Text, Keyboard} from 'react-native'

import CountrySearch from 'CountryGuide/components/CountrySearch/CountrySearch'

class SearchScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Country Search",
    headerBackTitle: "Back"
  })

  render() {
    return (
      <CountrySearch onCountrySelected={this.onCountrySelected}/>
    )
  }

  onCountrySelected = (country) => {
    Keyboard.dismiss()
    this.props.navigation.navigate('details', {country})
  }
}

export default SearchScreen
