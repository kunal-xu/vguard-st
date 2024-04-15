import Geolocation from 'react-native-geolocation-service';

export default function getLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log("Position:", position.coords);
        resolve(position.coords);
      },
      error => {
        console.log(error.code, error.message);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
}
