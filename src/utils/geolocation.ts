import * as Location from "expo-location";

export async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if(status !== 'granted') {
    return false;
  }
  const location = await Location.getCurrentPositionAsync({});
  return location;
}
