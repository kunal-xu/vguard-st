import { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../../../colors';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationProps } from '../../../utils/interfaces';
import React from 'react';
import { height, width } from '../../../utils/dimensions';

const SplashScreen = ({ navigation }: NavigationProps) => {
  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('loginWithNumber');
      }, 1500);
      return () => clearTimeout(timeoutId);
    }, [])
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/group_910.png')}
          style={styles.imageVguard}
        />
        <Image
          source={require("../../../assets/images/ic_rishta_logo.jpg")}
          style={styles.imageSaathi}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    padding: 25,
    backgroundColor: colors.white,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-evenly",
    height: '75%',
    width: '100%',
  },
  imageVguard: {
    width: width / 2,
    height: height / 12,
  },
  imageSaathi: {
    width: width,
    height: height / 3,
    
  },
});

export default SplashScreen;
