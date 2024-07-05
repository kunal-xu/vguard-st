import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  ImageBackground,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import Popup from "./Popup";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getImages } from "../utils/FileUtils";
import { height } from "../utils/dimensions";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { sendFile } from "../utils/apiservice";
import { useData } from "../hooks/useData";

interface ImagePickerFieldProps {
  label: string;
  onImageChange?: (
    image: string,
    type: string,
    imageName: string,
    label: string
  ) => void;
  imageRelated: string;
  initialImage?: string;
  getImageRelated?: string;
  editable?: boolean;
}

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  onImageChange,
  imageRelated,
  initialImage,
  getImageRelated,
  editable = true,
  isVisible,
  toggleModal,
  type
}) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  /*
  if (!permission?.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  */
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null
  );
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [select, setSelect] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [entityUid, setEntityUid] = useState<string>("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleImagePickerPress = () => {
    setShowImagePickerModal(true);
  };

  const handleImageModalToggle = () => {
    setShowImageModal(!showImageModal);
  };

  const handleCameraUpload = () => {
    setShowImagePickerModal(false);
    // launchCamera(
    //   {
    //     mediaType: "photo",
    //     includeBase64: false,
    //   },
    //   (response: ImagePickerResponse) => {
    //     handleImageResponse(response);
    //   }
    // );
  };

  const handleGalleryUpload = () => {
    setShowImagePickerModal(false);
    // launchImageLibrary(
    //   {
    //     mediaType: "photo",
    //     includeBase64: false,
    //   },
    //   (response: ImagePickerResponse) => {
    //     handleImageResponse(response);
    //   }
    // );
  };

  // const handleImageResponse = async (response: ImagePickerResponse) => {
  //   const fileData = {
  //     uri: response.assets[0].uri,
  //     type: response.assets[0].type,
  //     name: response.assets[0].fileName,
  //   };

  //   if (response.didCancel) {
  //     console.error("Image picker was canceled");
  //   } else if (response.error) {
  //     console.error("Image picker error: ", response.error);
  //   } else {
  //     setSelectedImage(response?.assets[0]?.uri);
  //     setSelectedImageName(response?.assets[0]?.fileName || "Image");
  //     setIsImageSelected(true);

  //     try {
  //       // const apiResponse = await triggerApiWithImage(fileData);
  //       onImageChange(
  //         response?.assets[0]?.uri,
  //         response?.assets[0]?.type,
  //         response?.assets[0]?.fileName,
  //         label
  //       );
  //     } catch (error) {
  //       console.error(
  //         "Error triggering API with image in ImagePickerField:",
  //         error
  //       );
  //       throw error;
  //     }
  //   }
  // };
  /*
<View style={styles.containerd}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
          </View>
        </CameraView>
      </View>
  */ const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState<string | null>(null);
  const { dispatch } = useData();
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "Selfie",
          subfield: undefined,
          value: result.assets[0].uri,
        },
      });
      try {
        const body = {
          imageRelated: type === "profile" ? "PROFILE" : "TICKET",
          fileExtension: "jpg",
        };
        const response = await sendFile(body);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "Selfie",
          subfield: undefined,
          value: result.assets[0].uri,
        },
      });
      try {
        const body = {
          imageRelated: type === "profile" ? "PROFILE" : "TICKET",
          fileExtension: "jpg",
        };
        const response = await sendFile(body);
        const responseData = response.data;
        const signedUrl = responseData.entity;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}>
        {popupContent}
      </Popup>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={showImageModal}
        onRequestClose={handleImageModalToggle}
      >
        <View style={styles.modalcontainer}>
          <Pressable onPress={handleImageModalToggle}>
            <Image
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
              source={require("../assets/images/ic_close.png")}
            />
          </Pressable>
          {/* <ImageBackground
                        source={require('../assets/images/no_image.webp')}
                        style={{ width: '100%', height: '70%' }}
                        resizeMode="contain"
                    > */}
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "70%" }}
            resizeMode="contain"
          />
          {/* </ImageBackground> */}
          {/* <Image source={{ uri: selectedImage }} style={{ width: '70%', height: '70%' }} resizeMode="contain" /> */}
        </View>
      </Modal>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginTop: 4,
  },
  iconStyle: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "white",
    padding: 8,
    borderRadius: 16,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    height: height / 16,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 14,
    position: "relative",
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "light",
    color: colors.black,
    width: "92%",
  },
  focusedLabel: {
    position: "absolute",
    top: -10,
    left: 0,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.black,
    // backgroundColor: colors.white,
    paddingHorizontal: 3,
  },
  notfocusedLabel: {
    display: "none",
  },
  cameraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraImage: {
    width: 25,
    height: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 25,
    height: 20,
    marginRight: 0,
    // backgroundColor: colors.lightGrey
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    width: "80%",
    alignSelf: "center",
    // height: height / 6,
    top: height / 2.8,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  imageName: {
    color: colors.black,
    fontSize: 15,
    width: "92%",
  },
  selectedContainer: {
    borderColor: colors.grey,
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImageContent: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  blackText: {
    color: colors.black,
    fontSize: 22,
    width: "100%",
  },
  blackHeading: {
    color: colors.black,
    fontSize: 23,
    fontWeight: "bold",
  },
  containerd: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButton: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#2196F3",
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

export default ImagePickerField;
