import React, {Component} from 'react'
import {View, Text} from 'react-native'

import CountryInfo from 'CountryGuide/components/CountryInfo/Info'

class DetailsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.country.name
  })

  render() {
    return (
      <CountryInfo country={this.props.navigation.state.params.country}/>
    )
  }
}

export default DetailsScreen
