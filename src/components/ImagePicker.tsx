import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const ImagePickerModal = ({ isVisible, toggleModal }) => {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.option} onPress={openCamera}>
                  <View style={styles.iconStyle}>
                    <Ionicons name="camera" size={38} color={colors.yellow} />
                  </View>
                  <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={openGallery}>
                  <View style={styles.iconStyle}>
                    <MaterialIcons name="photo-library" size={38} color={colors.yellow} />
                  </View>
                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "white",
    padding: 8,
    borderRadius: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.black,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  option: {
    alignItems: "center",
  },
  optionText: {
    color: "white",
    marginTop: 5,
  },
});

export default ImagePickerModal;
