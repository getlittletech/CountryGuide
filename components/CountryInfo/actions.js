import axios from 'axios'
import * as countryCache from 'CountryGuide/utils/country_cache/cache'

import {
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAILED,
  FETCH_COUNTRY_REQUEST
} from './constants'

import {
  countryDetailsUrl
} from 'CountryGuide/countries_api/config'

export const fetchCountryDetails = (query) => async dispatch => {
  const detailsUrl = countryDetailsUrl(query)
  dispatch({type: FETCH_COUNTRY_REQUEST})
  try {
    let country = await countryCache.get(query)
    if (!!country) {
      console.log("Got country from cache: ", country)
      dispatch({type: FETCH_COUNTRY_SUCCESS, payload: JSON.parse(country)})
    } else {
      console.log("Did not get country from cache, get from url")
      const {data} = await axios.get(detailsUrl)
      if (!!data && data.length > 0) {
        const country = data[0]
        dispatch({type: FETCH_COUNTRY_SUCCESS, payload: country})
        countryCache.set(country)
      } else {
        dispatch({type: FETCH_COUNTRY_FAILED, error: "Could not get details for " + query})
      }

    }
  } catch(error) {
    dispatch({type: FETCH_COUNTRY_FAILED, error: error.message})
  }
}
