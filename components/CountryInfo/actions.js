import axios from 'axios'

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
    let {data} = await axios.get(detailsUrl)
    dispatch({type: FETCH_COUNTRY_SUCCESS, payload: data})
  } catch(error) {
    dispatch({type: FETCH_COUNTRY_FAILED, error: error.message})
  }
}
