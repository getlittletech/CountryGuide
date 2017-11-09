import React, {Component} from 'react'
import {View, TextInput, Text, StyleSheet, Keyboard, Button} from 'react-native'
import { Icon } from 'react-native-elements'
import { PropTypes } from 'prop-types';

import {darkGrey, inputHeight} from 'CountryGuide/styles/common'

class SearchBar extends Component {
  state = { text: "" }
  placeholderText = "Search for a country"

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Icon name='search' />
          <TextInput
            onChangeText={this.onChange}
            style={styles.input}
            value={this.state.text}
            placeholder={this.placeholderText}
          />
        </View>
        <Button
          title="Cancel"
          onPress={this.onCancel}
          style={styles.button}
        />
      </View>)
  }

  onChange = (text) => {
    this.setState({text})
    this.props.onSearch(text)
  }

  onCancel = () => {
    this.setState({text: ""})
    Keyboard.dismiss()
    this.props.onCancel()
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: darkGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: inputHeight,
    borderRadius: 5 ,
    margin: 10
  },
  input: {
    flex:1
  },
  button: {
    flex: 1
  }
})

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default SearchBar
