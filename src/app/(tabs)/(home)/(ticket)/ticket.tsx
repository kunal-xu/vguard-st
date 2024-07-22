import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  Pressable,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "@/src/utils/colors";
import Buttons from "@/src/components/Buttons";
import { sendTicket, getTicketTypes, sendFile } from "@/src/utils/apiservice";
import { Picker } from "@react-native-picker/picker";
import Loader from "@/src/components/Loader";
import { useData } from "@/src/hooks/useData";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  FieldSectionProps,
  FooterSectionProps,
  PopupSectionInterface,
  ProfileHeader,
} from "@/src/utils/interfaces";
import NewPopUp from "@/src/components/NewPopup";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import usePopup from "@/src/hooks/usePopup";
import { showToast } from "@/src/utils/showToast";
import { height } from "@/src/utils/dimensions";
import { RaiseTicket, TicketType } from "@/src/utils/types";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

function Header({ profile, router }: ProfileHeader) {
  return (
    <View style={styles.profileImageContainer}>
      <Image
        source={{ uri: profile.Selfie as string }}
        placeholder={{
          uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
        }}
        transition={1000}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View>
        <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: "bold" }}>
          Rishta ID: {profile.RishtaID || "VGIL30000"}
        </Text>
      </View>
      <Buttons
        variant="filled"
        label="Ticket History"
        onPress={() => router.push("ticket-history")}
      />
    </View>
  );
}

const PopupSection = ({
  loader,
  popUp,
  cleanupPopUp,
  popupText,
  popUpIconType,
  popUpTitle,
}: PopupSectionInterface) => (
  <View>
    {loader && <Loader isLoading={loader} />}
    <NewPopUp
      visible={popUp}
      button1Action={cleanupPopUp}
      button1Text="Dismiss"
      text={popupText}
      iconType={popUpIconType}
      title={popUpTitle}
    />
  </View>
);

const FieldSection = ({
  t,
  isOptionsLoading,
  options,
  selectedOption,
  handleOptionChange,
  descriptionInput,
  setDescriptionInput,
  isImagePickerVisible,
  toggleModal,
  openCamera,
  openGallery,
  selectedImage,
  handleImageModalToggle,
  isImageModalVisible,
}: FieldSectionProps) => (
  <View>
    <Text style={[styles.blackText, { marginTop: responsiveFontSize(2) }]}>
      {t("strings:issue_type")}
    </Text>
    {isOptionsLoading ? (
      <Text style={styles.blackText}>Loading options...</Text>
    ) : options.length === 0 ? (
      <Text style={styles.blackText}>No options available.</Text>
    ) : (
      <View style={styles.inputContainer}>
        <Picker
          mode="dropdown"
          style={{
            color: "black",
            borderWidth: 2,
            borderColor: "black",
          }}
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}
        >
          <Picker.Item key={""} label={"Select Issue Type"} value={""} />
          {options.map((option: TicketType) => (
            <Picker.Item
              key={option.issueTypeId}
              value={option.issueTypeId}
              label={String(option.name)}
            />
          ))}
        </Picker>
      </View>
    )}
    <Modal
      visible={isImagePickerVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors.black,
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: "100%",
              }}
            >
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
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderColor: colors.black,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        position: "relative",
        marginBottom: 20,
      }}
      onPress={toggleModal}
    >
      <View style={[styles.labelContainer]}>
        <Text style={[styles.notfocusedLabel]}>
          {t("Upload picture (optional)")}
        </Text>
      </View>
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Text style={styles.imageName}>{t("Upload picture (optional)")}</Text>
          <TouchableOpacity onPress={handleImageModalToggle}>
            <ImageBackground
              source={require("@/src/assets/images/no_image.webp")}
              style={styles.image}
              resizeMode="cover"
            >
              <Image
                source={{ uri: selectedImage }}
                style={styles.image}
                contentFit="cover"
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <Text style={styles.label}>{t("Upload picture (optional)")}</Text>
          <Image
            source={require("@/src/assets/images/photo_camera.png")}
            style={styles.cameraImage}
            contentFit="contain"
          />
        </View>
      )}
    </TouchableOpacity>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={handleImageModalToggle}
      >
        <TouchableWithoutFeedback onPress={handleImageModalToggle}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: selectedImage as string }}
                style={{ width: "90%", height: "70%" }}
                contentFit="contain"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    <Text style={styles.blackText}>{t("strings:description_remarks")}</Text>
    <TextInput
      style={styles.descriptionInput}
      placeholder={t("strings:provide_description_in_the_box")}
      placeholderTextColor={colors.grey}
      multiline={true}
      textAlignVertical="top"
      value={descriptionInput}
      onChangeText={(text) => setDescriptionInput(text)}
    />
  </View>
);

const FooterSection = ({ t, openTnC, openFaqS }: FooterSectionProps) => (
  <View style={styles.footerRow}>
    <View style={styles.hyperlinks}>
      <TouchableOpacity style={styles.link} onPress={openTnC}>
        <Image
          style={{
            height: 30,
            width: 30,
          }}
          contentFit="contain"
          source={require("@/src/assets/images/ic_tand_c.png")}
        />
        <Text style={styles.linkText}>{t("strings:terms_and_conditions")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={openFaqS}>
        <Image
          style={{
            height: 30,
            width: 30,
          }}
          contentFit="contain"
          source={require("@/src/assets/images/ic_faq.png")}
        />
        <Text style={styles.linkText}>
          {t("strings:frequently_asked_quetions_faq")}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Ticket = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<TicketType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionsLoading, setIsOptionsLoading] = useState<boolean>(true);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [loader, showLoader] = useState(true);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageExt, setSelectedImageExt] = useState<string | undefined>(
    undefined
  );
  const [selectedImageMime, setSelectedImageMime] = useState<
    string | undefined
  >(undefined);
  const router = useRouter();
  const { state } = useData();
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

  const data = [
    { type: "header" },
    { type: "popup" },
    { type: "field" },
    { type: "submit" },
    { type: "footer" },
  ];

  useEffect(() => {
    (async () => {
      try {
        showLoader(true);
        const response = await getTicketTypes();
        showLoader(false);
        const responseData: TicketType[] = response.data;
        setOptions(responseData);
        setIsOptionsLoading(false);
      } catch (error) {
        showLoader(false);
      }
    })();
  }, []);

  const handleOptionChange = (key: string) => {
    setSelectedOption(key);
  };

  const openTnC = () => {
    Linking.openURL("https://vguardrishta.com/tnc_retailer.html");
  };

  const openFaqS = () => {
    Linking.openURL(
      "https://vguardrishta.com/frequently-questions-retailer.html"
    );
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
      setSelectedImageExt(fileExt);
      setSelectedImageMime(mime);
      setSelectedImage(fileUri);
      setIsImagePickerVisible(!isImagePickerVisible);
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
      setSelectedImageExt(fileExt);
      setSelectedImageMime(mime);
      setSelectedImage(fileUri);
      setIsImagePickerVisible(!isImagePickerVisible);
    }
  };

  const handleSubmission = async () => {
    if (!selectedOption) {
      showToast("Please select a issue type");
      return;
    }
    showLoader(true);
    try {
      let fileName = "";
      if (selectedImage) {
        const body = {
          imageRelated: "TICKET",
          fileExtension: selectedImageExt,
        };
        const fileStatus = await sendFile(body);
        const fileStatusData = fileStatus.data;
        fileName = fileStatusData.entityUid;
        const signedUrl = fileStatusData.entity;
        const response = await FileSystem.uploadAsync(
          signedUrl,
          selectedImage,
          {
            fieldName: "file",
            httpMethod: "PUT",
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
            headers: {
              "Content-Type": `${selectedImageMime}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error();
        }
      }
      const payload = new RaiseTicket();
      payload.issueTypeId = selectedOption;
      payload.imagePath = fileName;
      payload.description = descriptionInput;
      const response = await sendTicket(payload);
      const responseData = response.data;
      showLoader(false);
      setPopUp(true);
      setPopUpIconType("Info");
      setPopUpTitle(t("Ticket"));
      setPopupText(responseData.message);
    } catch (error) {
      showLoader(false);
      console.log(error);
      showToast("Failed to create ticket. Please try again");
    }
  };

  const renderItem: ListRenderItem<(typeof data)[0]> = ({ item }) => {
    switch (item.type) {
      case "header":
        return <Header profile={state} router={router} />;
      case "popup":
        return (
          <PopupSection
            loader={loader}
            popUp={popUp}
            cleanupPopUp={cleanupPopUp}
            popupText={popupText}
            popUpIconType={popUpIconType}
            popUpTitle={popUpTitle}
          />
        );
      case "field":
        return (
          <FieldSection
            t={t}
            isOptionsLoading={isOptionsLoading}
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            descriptionInput={descriptionInput}
            setDescriptionInput={setDescriptionInput}
            isImagePickerVisible={isImagePickerVisible}
            toggleModal={() => setIsImagePickerVisible(!isImagePickerVisible)}
            openCamera={openCamera}
            openGallery={openGallery}
            selectedImage={selectedImage}
            isImageModalVisible={isImageModalVisible}
            handleImageModalToggle={() =>
              setIsImageModalVisible(!isImageModalVisible)
            }
          />
        );
      case "submit":
        return (
          <View
            style={{
              padding: 15,
            }}
          >
            <Buttons
              label={t("strings:submit")}
              variant="filled"
              onPress={handleSubmission}
              width="100%"
            />
          </View>
        );
      case "footer":
        return <FooterSection t={t} openTnC={openTnC} openFaqS={openFaqS} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginBottom: 40,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  picker: {
    color: colors.black,
    // backgroundColor: colors.grey,
    height: responsiveHeight(5),
    width: "100%",
    fontSize: responsiveFontSize(1.5),
  },
  mainWrapper: {
    padding: 15,
    flexGrow: 1,
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: responsiveFontSize(1.7),
  },
  ImageProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.5),
  },
  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: height / 17,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "column",

    borderWidth: 1.5,
    borderColor: "black",
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: "bold",
  },
  descriptionInput: {
    width: "100%",
    height: responsiveHeight(20),
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: "bold",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5,
  },
  blackText: {
    color: colors.black,
    fontWeight: "bold",
  },
  hyperlinks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginRight: 25,
    marginTop: responsiveHeight(5),
  },
  footerRow: {
    flexDirection: "row",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: responsiveFontSize(1.7),
  },
  link: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  iconStyle: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "white",
    padding: 8,
    borderRadius: 16,
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
  cameraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraImage: {
    width: 25,
    height: 20,
  },
  image: {
    width: 25,
    height: 35,

    // backgroundColor: colors.lightGrey
  },
  label: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: "bold",
    color: colors.black,
    width: "92%",
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  notfocusedLabel: {
    display: "none",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  imageName: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    width: "92%",
  },
  selectedContainer: {
    borderColor: colors.grey,
  },
  focusedLabel: {
    position: "absolute",
    top: -10,
    left: 0,
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    color: colors.black,
    // backgroundColor: colors.white,
    paddingHorizontal: 3,
  },
});

export default Ticket;
