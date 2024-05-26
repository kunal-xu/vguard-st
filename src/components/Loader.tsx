import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { LoaderProps } from '../utils/interfaces';

const Loader = (props: LoaderProps) => {
  const { isLoading } = props;
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => { }}
    >
      <View style={styles.container}>
        <View style={styles.loaderBackground}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loaderBackground: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
  },
});

export default Loader;
