import {View, Text} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VguardRishtaUser from '../modals/VguardRishtaUser';

const VguardRishtaUserService = {
  getCurrent: async () => {
    return AsyncStorage.getItem('VguardRishtaUser')
      .then(result => JSON.parse(result))
      .catch(e => null);
  },
  newVguardRishtaUser: () => VguardRishtaUser,
  setCurrent: async vguardUser => {
    AsyncStorage.setItem('VguardRishtaUser', JSON.stringify(vguardUser));
  },
  clearCurrent: () =>
    AsyncStorage.removeItem('VguardRishtaUser').then(r => true),
};

export default VguardRishtaUserService;
