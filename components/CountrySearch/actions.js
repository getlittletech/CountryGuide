import axios from 'axios'

import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILED,
  RESET_SEARCH
} from './constants'

import {
  countriesSearchUrl
} from './countries_api'

export const fetchCountries = (query) => async dispatch => {
  const searchUrl = countriesSearchUrl(query)

  try {
    let {data} = await axios.get(searchUrl)
    dispatch({type: FETCH_COUNTRIES_SUCCESS, payload: data})
  } catch(error) {
    dispatch({type: FETCH_COUNTRIES_FAILED, error})
  }
}

export const resetSearch = () => {
  return {
    type: RESET_SEARCH
  }
}
