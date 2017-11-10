import React, {Component} from 'react'
import {View, Text} from 'react-native'

class DetailsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.country.name
  })

  render() {
    return (
      <View><Text>DETAILS!</Text></View>
    )
  }
}

export default DetailsScreen
