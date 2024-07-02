import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import { sendFile, updateProfile } from "../utils/apiservice";
import { useData } from "../hooks/useData";
import { showToast } from "../utils/showToast";
import Loader from "./Loader";
import NewPopUp from "./NewPopup";
import usePopup from "../hooks/usePopup";
import { useTranslation } from "react-i18next";
import * as FileSystem from "expo-file-system";

interface ImagePickerModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  type: string;
}

const ImagePickerModal = ({
  isVisible,
  toggleModal,
  type,
}: ImagePickerModalProps) => {
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const { state } = useData();
  const { dispatch } = useData();
  const {
    popUp,
    setPopUp,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    cleanupPopUp,
  } = usePopup();

  const fileUpload = async (
    type: string,
    fileExt: string | undefined,
    fileUri: string,
    mime: string | undefined
  ) => {
    showLoader(true);
    try {
      const body = {
        imageRelated: type === "profile" ? "PROFILE" : "TICKET",
        fileExtension: fileExt,
      };
      const fileStatus = await sendFile(body);
      const fileStatusData = fileStatus.data;
      const fileName = fileStatusData.entityUid;
      const signedUrl = fileStatusData.entity;
      const response = await FileSystem.uploadAsync(signedUrl, fileUri, {
        fieldName: "file",
        httpMethod: "PUT",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        headers: {
          "Content-Type": `${mime}`,
        },
      });
      if (response.status === 200) {
        if (type === "profile") {
          const data = {
            ...state,
            Selfie: fileName,
          };
          const response = await updateProfile(data);
          const responseData = response.data;
          showLoader(false);
          toggleModal();
          if (responseData.code == 200) {
            setPopUp(true);
            setPopUpIconType("Info");
            setPopUpTitle(t("Profile"));
            setPopupText(responseData.message);
          } else {
            showToast(responseData.message);
          }
        }
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error: any) {
      showLoader(false);
      toggleModal();
      showToast(`${error.message}` || "Something went wrong! Please try again");
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const fileExt = (result.assets[0].mimeType as string).split("/").pop();
      const fileUri = result.assets[0].uri;
      const mime = result.assets[0].mimeType;
      await fileUpload(type, fileExt, fileUri, mime);
      if (type === "profile") {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "Selfie",
            subfield: undefined,
            value: result.assets[0].uri,
          },
        });
      }
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const fileExt = (result.assets[0].mimeType as string).split("/").pop();
      const fileUri = result.assets[0].uri;
      const mime = result.assets[0].mimeType;
      await fileUpload(type, fileExt, fileUri, mime);
      if (type === "profile") {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "Selfie",
            subfield: undefined,
            value: result.assets[0].uri,
          },
        });
      }
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      {loader && <Loader isLoading={loader} />}
      <NewPopUp
        visible={popUp}
        button1Action={() => cleanupPopUp()}
        button1Text={"Dismiss"}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
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
                    <MaterialIcons
                      name="photo-library"
                      size={38}
                      color={colors.yellow}
                    />
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
