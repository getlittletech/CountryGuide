const COUNTRIES_ROOT_URL = 'https://restcountries.eu/rest/v2/'

const COUNTRIES_SEARCH_ENDPOINT = 'name/'
const COUNTRIES_SEARCH_FILTER = '?fields=name;alpha3Code'

export const countriesSearchUrl = (query) =>  {
  return COUNTRIES_ROOT_URL + COUNTRIES_SEARCH_ENDPOINT + query + COUNTRIES_SEARCH_FILTER
}
