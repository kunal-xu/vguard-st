import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const ImagePreview = ({ close, imageUri, visible }) => {
  // const closeModal = () => {
  //   setModalVisible(false);
  // };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={close}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/images/ic_close.png")}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: imageUri }}
          style={{
            width: responsiveWidth(80),
            height: responsiveHeight(80),
          }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});


export default ImagePreview