import { View, ImageBackground, StyleSheet } from 'react-native';
import {ScaledSize, useWindowDimensions} from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

const BottomTabLogo = () => {
  const {height, width}: ScaledSize = useWindowDimensions();
  return (
    <View style={{ height: "100%", width: "20%" }}>
      <ImageBackground
        style={{
          marginTop: 'auto',
          height: height / 12,
          width: width / 4,
        }}
        resizeMethod="resize"
        source={require('../assets/images/ic_home_logo_bg2.png')}>
        <View style={{ height: '100%', width: '100%', justifyContent: 'space-around' }}>
          <Image
            style={{ height: "50%", width: "50%", marginLeft: '10%' }}
            contentFit="contain"
            source={require('../assets/images/ic_rishta_logo_bottom_bar.jpg')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default BottomTabLogo;
