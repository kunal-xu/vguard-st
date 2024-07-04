import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Modal,
} from "react-native";

import colors from "@/src/utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useData } from "../hooks/useData";

const OpenPopupOnOpeningApp = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { state } = useData();

  useEffect(() => {
    if (state.firstLogin === 1) {
      setModalVisible(true);
    }
  }, []);

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require("@/src/assets/images/welcomepopup.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.viewTouchable}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.viewText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 2,
    width: "80%",
    borderRadius: 1,
  },
  image: {
    width: "100%",
    height: 400, // Adjust height as needed
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  closeButtonImage: {
    width: "100%",
    height: "100%",
  },
  viewText: {
    color: colors.black,
    fontWeight: "bold",
  },
  viewTouchable: {
    backgroundColor: colors.yellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});

export default OpenPopupOnOpeningApp;
