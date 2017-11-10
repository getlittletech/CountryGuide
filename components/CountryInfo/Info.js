import React, {Component} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, WebView, Dimensions, Platform} from 'react-native'
import {connect} from 'react-redux'
import SVGImage from 'react-native-svg-image';
import MapView from 'react-native-maps';

import * as actions from './actions'

const SCREEN_WIDTH = Dimensions.get('window').width

class Info extends Component {
  constructor(props) {
    super(props)
    this.props.fetchCountryDetails(props.country.name)
  }

  render() {
    const currentCountry = this.props.currentCountry
    console.log(currentCountry)
    if (currentCountry.isFetching) {
      return (
        <View style = {styles.container}>
          <ActivityIndicator
               animating
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>
        </View>
      )
    }

    if (!!currentCountry.error) {
      return (
        <View>
          <Text>Error: {currentCountry.error}</Text>
        </View>
      )
    }

    if (currentCountry.info.length > 0) {
      const country = currentCountry.info[0]
      let latitude = 0
      let longitude = 0
      if (!!country.latlng) {
        latitude = country.latlng[0]
        longitude = country.latlng[1]
      }
      return (
        <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 10}}>
          <View style={styles.imageWrapper}>
            <View style={styles.image}>
              <SVGImage
                style={{ width: SCREEN_WIDTH / 3, height: 120}}
                source={{uri: country.flag}}
              />
            </View>
            <View style={styles.image}>
              <MapView
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 7,
                  longitudeDelta: 15,
                }}
                scrollEnabled={false}
                style={{width: SCREEN_WIDTH / 3, height: 120}}
                cacheEnabled={Platform.OS === 'android'}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Info: {country.name}</Text>
            <Text style={styles.text}>Native name: {country.nativeName}</Text>
            <Text style={styles.text}>Region: {country.region}</Text>
            <Text style={styles.text}>Capital: {country.capital}</Text>
            <Text style={styles.text}>Languages: {this.listLanguages(country.languages)}</Text>
            <Text style={styles.text}>Translations: {this.listTranslations(country.translations)}</Text>
          </View>
        </View>
      )
    }
  }

  listLanguages = (languages) => {
    if (!languages) {
      return
    }

    let string = languages.splice(1).reduce((sum, lang) =>
       sum + ", " + lang.name, languages[0].name)

    return string
  }

  listTranslations = (translations) => {
    if (!translations) {
      return
    }

    const keys = Object.keys(translations)

    let string = keys.splice(1).reduce((sum, key) =>
       sum + ", " + translations[key] + "(" + key + ")", translations[keys[0]] + "(" + keys[0] + ")")

    return string
  }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   imageWrapper: {
     flex: 1,
     flexDirection: 'row',
     maxHeight: 120
   },
   image: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   text: {
     margin: 10
   }
})

function mapStateToProps({currentCountry}) {
  return {currentCountry}
}

export default connect(mapStateToProps, actions)(Info)
