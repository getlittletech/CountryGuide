import axios from 'axios'
import * as countryCache from 'CountryGuide/utils/country_cache/cache'
import getFlagHtml from 'CountryGuide/utils/country_cache/flag'

import {
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAILED,
  FETCH_COUNTRY_REQUEST
} from './constants'

import {
  countryDetailsUrl
} from 'CountryGuide/utils/countries_api/config'

export const fetchCountryDetails = (query, flagDimensions) => async dispatch => {
  const detailsUrl = countryDetailsUrl(query)
  dispatch({type: FETCH_COUNTRY_REQUEST})
  try {
    let country = await countryCache.get(query)
    if (!!country) {
      console.log("Got country from cache: ", country.name)

      if (!country.flagHtml) {
        // no flag - get it, and save the country
        country.flagHtml = await getFlagHtml(country.flag, flagDimensions)
        countryCache.set(country)
      }

      dispatch({type: FETCH_COUNTRY_SUCCESS, payload: country})
    } else {
      console.log("Did not get country from cache, will fetch: ", query)
      const {data} = await axios.get(detailsUrl)
      if (!!data && data.length > 0) {
        const country = data[0]

        country.flagHtml = await getFlagHtml(country.flag, flagDimensions)

        dispatch({type: FETCH_COUNTRY_SUCCESS, payload: country})
        countryCache.set(country)
      } else {
        dispatch({type: FETCH_COUNTRY_FAILED, error: "Could not get details for " + query})
      }

    }
  } catch(error) {
    dispatch({type: FETCH_COUNTRY_FAILED, error: "error fetching country: " + error.message})
  }
}
