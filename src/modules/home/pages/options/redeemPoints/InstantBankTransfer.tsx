import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../../../../../../colors'
import { useTranslation } from 'react-i18next';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import { bankTransfer, getany, getBanks, getFile, sendFile, updateBank } from '../../../../../utils/apiservice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import { Picker } from '@react-native-picker/picker';
import Popup from '../../../../../components/Popup';
import {  useNavigation } from '@react-navigation/native';
import { getImages, sendImage } from '../../../../../utils/FileUtils';
import InputField from '../../../../../components/InputField';
import PickerField from '../../../../../components/PickerField';
import { Colors } from 'react-native-paper';
import { height, width } from '../../../../../utils/dimensions';
import ImagePreview from '../../../../../components/ImagePreview';




const InstantBankTransfer = () => {

   
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [accNo, setAccNo] = React.useState("");
    const [accHolder, setAccHolder] = React.useState("");
    const [accType, setAccType] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("");
    const [entityUid, setEntityUid] = useState("");
    const [userRole, setUserRole] = useState('');
    const [availableBanks, setAvailableBanks] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [updateBank, setUpdateBank] = useState(false);
    const [fileData, setFileData] =  useState({uri:null,filename:null,type:null});
    const [redeemPayload,setRedeemPayload] = useState({});
    const [points,setPoints] = useState('')
    const [select, setselect] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [newImage,setNewImage] = useState(false)
    useEffect(() => {
      getBankDetailsAndCallFileUri();
      getBankList()
    }, []);


    const getUserRoleFromAsyncStorage = async () => {
      const userRole = await AsyncStorage.getItem("userRole");
      setUserRole(userRole);
      getBankDetailsAndCallFileUri();
      getBankDetail().then((result) => {
        if (result?.bankDataPresent == 1) {
          setUpdateBank(true);
          getBankDetailsAndCallFileUri();
        }
      });
    };

    const getBankDetailsAndCallFileUri = async () => {
      try {
        const response = await getBankDetail();
        if (response.status === 200) {
          const data = response.data;
          if (data.errorMessage && data.bankDataPresent == 1) {
            setPopupContent(data.errorMessage);
            setUpdateBank(true);
          } else {
            setAccHolder(data?.bankAccHolderName);
            setAccType(data?.bankAccType);
            setBankName(data?.bankNameAndBranch);
            setIfscCode(data?.bankIfsc);
            setAccNo(data?.bankAccNo);
            setSelectedImageName(data?.checkPhoto);
            setEntityUid(data?.checkPhoto);
            let imageUrl = getImages(data?.checkPhoto, "CHEQUE");
            setSelectedImage(imageUrl);
          }
        } else {
          throw new Error("Failed to get bank details");
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    const getBankList = () =>{
      getBanks()
      .then((response) => {
        const responses = response.data;
        if (Array.isArray(responses)) {
          const bankNames = responses.map((bank) => bank.bankNameAndBranch);
          if(bankNames?.length > 0){
            setAvailableBanks(bankNames);
          }else{
            setAvailableBanks([]);
          }
          
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
    }

  

    const acTypePickerItems = [
      { label: t('strings:account_type:saving'), value: 'saving' },
      { label: t('strings:account_type:current'), value: 'current' },
  ];

    const getFileUri = async (selectedImageName) => {
        try {
            const UserRole = await AsyncStorage.getItem('userRole');
            const response = await getFile(selectedImageName, 'CHEQUE', UserRole);
            setSelectedImage(response.url);
            return response;
        } catch (error) {
            console.error('Error getting file:', error);
            throw error;
        }
    };
    const handleImagePickerPress = () => {
        setShowImagePickerModal(true);
    };


    const handleCameraUpload = () => {
        setShowImagePickerModal(false);
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Camera was canceled');
                } else if (response.error) {
                    console.error('Camera error: ', response.error);
                } else {
                  setNewImage(true)
                    const fileData = {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        filename: response.assets[0].fileName,
                    };

                    setFileData(fileData)
                    setSelectedImage(response.assets[0].uri);
                    setSelectedImageName(response.assets[0].fileName);
                    // triggerApiWithImage(fileData);
                }
            }
        );
    };

    const handleGalleryUpload = () => {
        setShowImagePickerModal(false);
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Image picker was canceled');
                } else if (response.error) {
                    console.error('Image picker error: ', response.error);
                } else {
                  setNewImage(true)
                    const fileData = {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName,
                    };
                    setFileData(fileData)
                    setSelectedImage(response.assets[0].uri);
                    setSelectedImageName(response.assets[0].fileName);
                    // triggerApiWithImage(fileData);
                }
            }
        );
    };

    const triggerApiWithImage = async (fileData) => {
        const formData = new FormData();
        formData.append('userRole', userRole);
        formData.append('imageRelated', 'CHEQUE');
        formData.append('file', fileData);

        try {
            const response = await sendFile(formData);
            setEntityUid(response.data.entityUid);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const handleProceed = async () => {
      try {
        if (!points) {
          ToastAndroid.show("Enter Amount", ToastAndroid.SHORT);
        } else {
          let payload = {
            amount: points,
            bankAccNo: accNo,
            bankAccHolderName: accHolder,
            bankAccType: accType,
            bankNameAndBranch: bankName,
            bankIfsc: ifscCode,
            checkPhoto : entityUid
          };
          const redeemResult = await bankTransfer(payload);
          const redeemJson = redeemResult.data;
        
          if (redeemJson?.code === 200) {
            setPopupContent(redeemJson?.message);
            setPopupVisible(true);
          } else if (redeemJson?.code === 400) {
            setPopupVisible(true);
            setPopupContent(redeemJson?.message);

          } else {
            setPopupContent(redeemJson?.message || "Something went wrong, Please try again");
            setPopupVisible(true);
          }
        }
      } catch (btError) {
        console.log("Error: ", btError);
      }
    };

    const handleSubmit = async () => {
        const postData = {
            bankAccNo: accNo,
            bankAccHolderName: accHolder,
            bankAccType: accType,
            bankNameAndBranch: bankName,
            bankIfsc: ifscCode,
            // checkPhoto: entityUid,
        };
        postData.checkPhoto = await sendImage(fileData,"CHEQUE",userRole)
        updateBank(postData)
            .then(response => {
                console.log(postData, "---------------postdata",response)
                if (response.status === 200) {
                    const responses = response.data
                    return responses;
                } else {
                    throw new Error('Failed to create ticket');
                }
            })
            .then(data => {
                showSnackbar(data.message);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }
    const showSnackbar = (message) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
        });
    };

    const handleClose = () => {
        setUpdateBank(false)
        navigation.goBack();
    }

    const navigateToBank = () => {
      setUpdateBank(false)
      navigation.pop();
      navigation.navigate("Update Bank")
    }

    const handleImagePress = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

  
    
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainWrapper}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{t("strings:bank_details")}</Text>
            <Text style={styles.textSubHeader}>
              {t("strings:for_account_tranfer_only")}
            </Text>
          </View>
          <View style={styles.form}>
            {!updateBank && (
              <InputField
                label={t("strings:enter_points_to_be_redeemed")}
                value={points}
                onChangeText={(num) => setPoints(num)}
                keyboardType="number-pad"
              />
            )}

            <InputField
              label={t("strings:lbl_account_number")}
              value={accNo}
              disabled={true}
              onChangeText={(text) => setAccNo(text)}
            />

            <InputField
              label={t("strings:lbl_account_holder_name")}
              value={accHolder}
              disabled={true}
              onChangeText={(name) => setAccHolder(name)}
            />
            <PickerField
              label={t("strings:select_account_type")}
              disabled={true}
              selectedValue={accType}
              onValueChange={(itemValue) => setAccType(itemValue)}
              items={acTypePickerItems}
            />
            <PickerField
              label={t("strings:select_bank")}
              disabled={true}
              selectedValue={bankName}
              onValueChange={(itemValue) => setBankName(itemValue)}
              items={
                availableBanks.length > 0
                  ? availableBanks?.map((bank) => ({
                      value: bank,
                      label: bank,
                    }))
                  : []
              }
            />

            <InputField
              label={t("strings:ifsc")}
              disabled={true}
              value={ifscCode}
              onChangeText={(text) => setIfscCode(text)}
            />
            <Text
              style={{
                color: Colors.black,
                fontWeight: 700,
                marginLeft: 12,
                marginTop: -10,
              }}
            >
              {t("strings:cancelled_cheque_copy")}
            </Text>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={handleImagePickerPress}
              disabled={true}
            >
              {selectedImage ? (
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:cancelled_cheque_copy")}
                  placeholderTextColor={colors.grey}
                  editable={false}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:cancelled_cheque_copy")}
                  placeholderTextColor={colors.grey}
                  editable={false}
                />
              )}
              <View style={styles.inputImage}>
                {selectedImage ? (
                  <TouchableOpacity onPress={handleImagePress}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require("../../../../../assets/images/photo_camera.png")}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>

            <ImagePreview
              close={closeModal}
              imageUri={selectedImage}
              visible={isModalVisible}
            />

            {/* Modal for selecting camera or gallery */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showImagePickerModal}
              style={styles.modalcontainer}
              hardwareAccelerated={true}
              opacity={0.3}
            >
              <View
                style={{
                  width: width / 1.8,
                  borderRadius: 5,
                  alignSelf: "center",
                  height: height / 8,
                  top: height / 2.8,
                  margin: 20,
                  backgroundColor: "#D3D3D3",
                  borderRadius: 20,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 100,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Picker
                  mode="dropdown"
                  placeholder={"Update Your Selfie *"}
                  style={{ color: "black" }}
                  selectedValue={select}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue === "Open camera") {
                      handleCameraUpload();
                    } else if (itemValue === "Open Image picker") {
                      handleGalleryUpload();
                    }
                  }}
                >
                  <Picker.Item label="Select Action" value="" />
                  <Picker.Item
                    label="Select Photo from gallery"
                    value="Open Image picker"
                  />
                  <Picker.Item
                    label="Capture Photo from camera"
                    value="Open camera"
                  />
                </Picker>
                <Button
                  mode="text"
                  onPress={() => setShowImagePickerModal(false)}
                >
                  Close
                </Button>
              </View>
            </Modal>
          </View>

          <View style={styles.button}>
            {!updateBank && (
              <Buttons
                label={t("strings:proceed")}
                variant="filled"
                onPress={() => handleProceed()}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            )}

            {updateBank && (
              <Buttons
                label={t("strings:submit")}
                variant="filled"
                onPress={() => handleSubmit()}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            )}
          </View>
        </View>
        {isPopupVisible && (
          <Popup
            isVisible={isPopupVisible}
            onClose={() => setPopupVisible(false)}
          >
            {popupContent}
          </Popup>
        )}
        {updateBank && (
          <Popup
            isVisible={updateBank}
            acceptUpdate={ () => navigateToBank()}
            onClose={() => handleClose()}
          >
            {popupContent}
          </Popup>
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.white
    },
    mainWrapper: {
        padding: 15,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    inputImage: {
        height: responsiveHeight(2),
        width: responsiveHeight(2),
        marginRight: 5
    },
    textHeader: {
        fontSize: responsiveFontSize(2.5),
        color: colors.black,
        fontWeight: 'bold'
    },
    textSubHeader: {
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        fontWeight: 'bold'
    },
    container: {
        height: responsiveHeight(8)
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    buttonText: {
        color: colors.white,
        width: '100%',
        textAlign: 'center',
    },
    inputContainer: {
        borderColor: colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        height: responsiveHeight(5),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        width: '90%',
        padding: 10,
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        // fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        gap: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        alignItems: 'center'
    },
    picker: {
        width: '90%',
        color: colors.grey,
    },
    labelPicker: {
        color: colors.grey,
        fontWeight: 'bold'
    }
})
export default InstantBankTransfer