import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { height, width } from "../utils/dimensions";
import { ActionPickerModalProps } from "../utils/interfaces";

const ActionPickerModal = ({ onCamera, onGallery }: ActionPickerModalProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      style={{ height: height / 2, width: width / 2 }}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        //Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Action!</Text>
          <Pressable
            style={{ height: 40, marginVertical: 15 }}
            onPress={onGallery}
          >
            <Text style={styles.textStyle}>Select photo from gallery</Text>
          </Pressable>
          <Pressable
            style={{ height: 40, marginVertical: 15 }}
            onPress={onCamera}
          >
            <Text style={styles.textStyle}>Capture photo from camera</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,

    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActionPickerModal;
