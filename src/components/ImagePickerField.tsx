import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ImageBackground,
} from "react-native";
import colors from "../utils/colors";
import Popup from "./Popup";
import { getImages } from "../utils/FileUtils";
import { height } from "../utils/dimensions";

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
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (initialImage) {
  //       try {
  //         // const image = await getFile(initialImage, imageRelated, "2");
  //         const image = await getImages(initialImage, getImageRelated);
  //         setIsImageSelected(true);
  //         setSelectedImage(image);
  //         setSelectedImageName(initialImage);
  //       } catch (error) {
  //         console.error("Error fetching image:", error);
  //       }
  //     }
  //   };

  //   fetchImage();
  // }, [initialImage]);

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
  return (
    <View style={styles.container}>
      <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}>
        {popupContent}
      </Popup>
      <TouchableOpacity
        style={[styles.input, isImageSelected && styles.selectedContainer]}
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
            <TouchableOpacity onPress={handleImageModalToggle}>
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
            </TouchableOpacity>
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
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showImageModal}
        onRequestClose={handleImageModalToggle}
      >
        <View style={styles.modalcontainer}>
          <TouchableOpacity onPress={handleImageModalToggle}>
            <Image
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
              source={require("../assets/images/ic_close.png")}
            />
          </TouchableOpacity>
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
        animationType="fade"
        transparent={true}
        visible={showImagePickerModal}
        hardwareAccelerated={true}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPressOut={() => setShowImagePickerModal(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "column", gap: 15, width: "90%" }}>
              <Text style={styles.blackHeading}>Select Action</Text>
              <TouchableOpacity onPress={() => handleCameraUpload()}>
                <Text style={styles.blackText}>Capture photo from camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGalleryUpload()}>
                <Text style={styles.blackText}>Select photo from gallery</Text>
              </TouchableOpacity>
            </View>
            {/* <Button mode="text" onPress={() => setShowImagePickerModal(false)}>
                            Close
                        </Button> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginTop: 4
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
    left: 10,
    right: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
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
});

export default ImagePickerField;
