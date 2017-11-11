import React, {Component} from 'react'
import {View, Text, StyleSheet, WebView, Dimensions, Platform} from 'react-native'
import {connect} from 'react-redux'
import MapView from 'react-native-maps';

import * as actions from './actions'

import Loading from 'CountryGuide/components/LoadingView/Loading'

const SCREEN_WIDTH = Dimensions.get('window').width

const flagDimensions = mapDimensions = { width: SCREEN_WIDTH / 3, height: 120}

class Info extends Component {
  constructor(props) {
    super(props)
    this.props.fetchCountryDetails(props.country.name, flagDimensions)
  }

  render() {
    const currentCountry = this.props.currentCountry

    if (currentCountry.isFetching) {
      return (
        <View style = {styles.container}>
          <Loading />
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

    if (!!currentCountry.info) {
      const country = currentCountry.info
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
              <WebView
                scalesPageToFit={false}
                source={{html: currentCountry.info.flagHtml}}
                style={{ width: flagDimensions.width, height: flagDimensions.height}}
                scrollEnabled={false}
              />
              <View style={styles.webViewBlock}></View>
            </View>
            <View style={styles.image}>
              <MapView
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 7,
                  longitudeDelta: 15,
                }}
                style={{width: mapDimensions.width, height: mapDimensions.height}}
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

    return (
      <View>
        <Text>Error: Did not get details for the country.</Text>
      </View>
    )
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
   },
   webViewBlock: {
     // to disable webview scroll on android
     position: 'absolute',
     bottom: 0,
     right: 0,
     width: flagDimensions.width * 1.5,
     height: flagDimensions.height,
     backgroundColor: 'rgba(0,0,0,0)'
   }
})

function mapStateToProps({currentCountry}) {
  return {currentCountry}
}

export default connect(mapStateToProps, actions)(Info)
