import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILED,
  RESET_SEARCH
} from './constants'

const initialState = []

export default function countries(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return action.payload
    case FETCH_COUNTRIES_FAILED:
      return initialState
    case RESET_SEARCH:
      return initialState
    default:
      return state
  }
}
