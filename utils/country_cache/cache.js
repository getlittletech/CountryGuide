import {AsyncStorage} from 'react-native'

export const get = async (name) => {
  let country = await AsyncStorage.getItem(name)
  return JSON.parse(country)
}

export const set = (country) => {
  AsyncStorage.setItem(country.name, JSON.stringify(country))
}
