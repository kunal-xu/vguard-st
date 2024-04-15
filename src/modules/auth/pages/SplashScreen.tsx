import { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../../../colors';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationProps } from '../../../utils/interfaces';
import React from 'react';

const SplashScreen = ({ navigation }: NavigationProps) => {
  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('loginWithNumber');
      }, 1000);
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
          source={require('../../../assets/images/group_907.png')}
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
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
    width: '100%',
    gap: 100,
  },
  imageVguard: {
    width: 200,
    height: 73,
  },
  imageSaathi: {
    width: 200,
    height: 196,
  },
  startButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  languagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
    backgroundColor: colors.yellow,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  },
});

export default SplashScreen;
