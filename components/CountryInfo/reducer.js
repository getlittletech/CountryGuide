import {
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAILED,
  FETCH_COUNTRY_REQUEST
} from './constants'

const initialState = {
  info: {},
  isFetching: true, // note that we set it to true directly to show spinner
  error: ""
}

export default function countries(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: "",
        info: action.payload
      })
    case FETCH_COUNTRY_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case FETCH_COUNTRY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: ""
      })
    default:
      return state
  }
}
