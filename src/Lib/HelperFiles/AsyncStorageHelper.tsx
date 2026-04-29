import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AsyncStorageHelper {
 static async setData(key: string, val: any) {
  try {
   let tempValue = JSON.stringify(val)
   await AsyncStorage.setItem(key, tempValue)
  } catch (error) {
  }
 }

 static async getData(key: string) {
  try {
   let value = await AsyncStorage.getItem(key)
   if (value) {
    let newValue = JSON.parse(value)
    return newValue
   } else {
    return value
   }
  } catch (error) {
  }
 }

 static async removeItemValue(key: string) {
  try {
   await AsyncStorage.removeItem(key)
   return true
  } catch (exception) {
   return false
  }
 }
}
