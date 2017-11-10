import {combineReducers} from 'redux'
import countries from 'CountryGuide/components/CountrySearch/reducer'
import currentCountry from 'CountryGuide/components/CountryInfo/reducer'

export default combineReducers(
  {
    countries,
    currentCountry
  }
)
