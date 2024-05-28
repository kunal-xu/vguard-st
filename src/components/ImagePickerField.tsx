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
} from "react-native";
import colors from "../utils/colors";
import Popup from "./Popup";
import { getImages } from "../utils/FileUtils";
import { height } from "../utils/dimensions";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";

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
  */  const [photo, setPhoto] = useState(null);

  const openCamera = async () => {
    setShowImagePickerModal(false);
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

      const pickImageFromGallery = async () => {
        setShowImagePickerModal(false);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPhoto(result.uri);
        }
      };
  return (
    <View style={styles.container}>
      <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}>
        {popupContent}
      </Popup>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.3 : 1.0,
          },
          styles.input,
          isImageSelected && styles.selectedContainer,
        ]}
        onPress={editable ? handleImagePickerPress : undefined}
      >
        <View
          style={[
            styles.labelContainer,
            !selectedImage && styles.notSelectedLabelContainer,
          ]}
        >
          <Text
            style={[
              styles.notfocusedLabel,
              isImageSelected && styles.focusedLabel,
            ]}
          >
            {label}
          </Text>
        </View>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Text style={styles.imageName}>{label}</Text>
            <Pressable onPress={handleImageModalToggle}>
              <ImageBackground
                source={require("../assets/images/no_image.webp")}
                style={styles.image}
                resizeMode="cover"
              >
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </ImageBackground>
              {/* <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="cover" /> */}
            </Pressable>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <Text style={styles.label}>{label}</Text>
            <Image
              source={require("../assets/images/photo_camera.png")}
              style={styles.cameraImage}
              resizeMode="contain"
            />
          </View>
        )}
      </Pressable>

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
        animationType="slide"
        transparent={true}
        visible={showImagePickerModal}
        hardwareAccelerated={true}
        onRequestClose={() => setShowImagePickerModal(false)}
      >
        {/* <Pressable
          style={styles.modalContainer}
          onPressOut={() => setShowImagePickerModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "column", gap: 15, width: "90%" }}>
              <Text style={styles.blackHeading}>Select Action</Text>
              <Pressable onPress={() => handleCameraUpload()}>
                <Text style={styles.blackText}>Capture photo from camera</Text>
              </Pressable>
              <Pressable onPress={() => handleGalleryUpload()}>
                <Text style={styles.blackText}>Select photo from gallery</Text>
              </Pressable>
            </View>
            {/* <Button mode="text" onPress={() => setShowImagePickerModal(false)}>
                            Close
                        </Button> */}
          {/* </View>
        </Pressable>  */}
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Choose an option</Text>
          <Pressable style={styles.modalButton} onPress={openCamera}>
            <Text style={styles.textStyle}>Take Photo</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={pickImageFromGallery}>
            <Text style={styles.textStyle}>Upload from Gallery</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => setShowImagePickerModal(false)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginTop: 4,
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
    color: 'white',
    textAlign: 'center',
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#2196F3',
  },
});

export default ImagePickerField;
