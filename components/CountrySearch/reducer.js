import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILED,
  FETCH_COUNTRIES_REQUEST,
  RESET_SEARCH
} from './constants'

const initialState = {
  countries: [],
  isFetching: false,
  error: ""
}

export default function countries(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: "",
        countries: action.payload
      })
    case FETCH_COUNTRIES_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        countries: []
      })
    case FETCH_COUNTRIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: ""
      })
    case RESET_SEARCH:
      return initialState
    default:
      return state
  }
}
