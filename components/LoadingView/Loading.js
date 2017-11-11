import React, { Component } from 'react'
import {
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { PropTypes } from 'prop-types';

export default class Loading extends Component {

  render() {
    return (
      <ActivityIndicator
           animating
           color = '#bc2b78'
           size = "large"
           style = {{flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
           height: 80}}/>
    )
  }
}
