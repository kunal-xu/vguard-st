import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import closeIcon from '../assets/images/ic_close.png';
import okIcon from '../assets/images/ic_accept_black2.png';
import colors from '../utils/colors';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void; 
  onOk: () => void;
  children: React.ReactNode;
}

const PopupWithOkAndCancel: React.FC<PopupProps> = ({ isVisible, onClose, onOk, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.popupText}>{children}</Text>
          <View style={styles.buttons}>
          <TouchableOpacity style={styles.okButton} onPress={onOk}>
            <Image
              source={okIcon as ImageSourcePropType}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={closeIcon as ImageSourcePropType}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '30%',
    width: '80%',
    padding: 30,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    // position: 'absolute',
    // bottom: 10,
    // right: 10,
    width: 80,
    height: 80,
  },
  okButton: {
    // position: 'absolute',
    // bottom: 10,
    // right: 100,
    width: 80,
    height: 80,
  },
  closeButtonText: {
    color: 'blue',
  },
  popupText: {
    color: colors.black,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 30,
    width: '90%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  }
});

export default PopupWithOkAndCancel;
