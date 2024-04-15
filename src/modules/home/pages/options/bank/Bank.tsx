
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import colors from '../../../../../../colors';
import { useTranslation } from 'react-i18next';
// import { TextInput } from 'react-native-paper';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import { getBanks, getFile, getany, sendFile, updateBank } from '../../../../../utils/apiservice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import { Picker } from '@react-native-picker/picker';
import { Colors, imageUrl } from '../../../../../utils/constants';
import { width, height } from '../../../../../utils/dimensions';
import Popup from '../../../../../components/Popup';
import InputField from '../../../../../components/InputField';
import PickerField from '../../../../../components/PickerField';
import ImagePreview from '../../../../../components/ImagePreview';
import { getImages, sendImage } from '../../../../../utils/FileUtils';

var filePayload = {}

const Bank = () => {
  const { t } = useTranslation();
  const [select, setselect] = useState();
  const [accNo, setAccNo] = React.useState('');
  const [accHolder, setAccHolder] = React.useState('');
  const [accType, setAccType] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [ifscCode, setIfscCode] = React.useState('');
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [entityUid, setEntityUid] = useState('');
  const [userRole, setUserRole] = useState('');
  const [availableBanks, setAvailableBanks] = useState([]);
  const [popupContent, setPopupContent] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
 

  const acTypePickerItems = [
    { label: t('strings:account_type:saving'), value: 'saving' },
    { label: t('strings:account_type:current'), value: 'current' },
];
  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {


    const getUserRoleFromAsyncStorage = async () => {
      const userRole = await AsyncStorage.getItem('userRole');
      setUserRole(userRole);
    };

   

    getBankDetailsAndCallFileUri();

    getBanks()
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Failed to get bank names');
        }
      })
      .then(responses => {
        if (Array.isArray(responses)) {
          const bankNames = responses.map(bank => bank.bankNameAndBranch);
          setAvailableBanks(bankNames);
        } else {
          //console.error('Invalid response format');
        }
      })
      .catch(error => {
        //console.error('API Error:', error);
      });
  }, []);
  const getBankDetailsAndCallFileUri = async () => {
    try {
      const response = await getany();
      if (response.status === 200) {
        const data = response.data;
        if (data.errorMessage) {
          setPopupContent(data.errorMessage);
          setPopupVisible(true);
        } else {
          setAccHolder(data.bankAccHolderName);
          setAccType(data.bankAccType);
          setBankName(data.bankNameAndBranch);
          setIfscCode(data.bankIfsc);
          setAccNo(data.bankAccNo);
          setSelectedImageName(data.checkPhoto);
          setEntityUid(data.checkPhoto)
          let imageUrl = getImages(data.checkPhoto,"CHEQUE")
          if (imageUrl) {
            setSelectedImage(imageUrl);
          }
        }
      } else {
        // throw new Error('Failed to get bank details');
        console.log("Api status code is not 200")
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const getFileUri = async selectedImageName => {
    try {
      const UserRole = await AsyncStorage.getItem('userRole');
      const response = await getFile(selectedImageName, 'CHEQUE', UserRole);
      //console.log(response, 'file');
      setSelectedImage(response.url);
      return response;
    } catch (error) {
      //console.error('Error getting file:', error);
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
      response => {
        if (response.didCancel) {
          //console.log('Camera was canceled');
        } else if (response.error) {
          //console.error('Camera error: ', response.error);
        } else {
          filePayload = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            filename: response.assets[0].fileName,
          };
          setSelectedImage(response?.assets?.[0]?.uri);
          setSelectedImageName(response?.assets?.[0]?.fileName);
          // triggerApiWithImage(fileData);
          
        }
      },
    );
  };

  const handleGalleryUpload = () => {
    setShowImagePickerModal(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          //console.log('Image picker was canceled');
        } else if (response.error) {
          //console.error('Image picker error: ', response.error);
        } else {
          filePayload = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            filename: response.assets[0].fileName,
          };
          setSelectedImage(response.assets[0].uri);
          setSelectedImageName(response.assets[0].fileName);
         
        }
      },
    );
  };


  const triggerApiWithImage = async (fileData) => {
    if (fileData?.name && fileData?.type && fileData?.uri) {
      const formData = new FormData();
      formData.append("userRole", 1);
      formData.append("imageRelated", "CHEQUE");
      formData.append("file", fileData);
      try {
        const response = await sendFile(formData);
        console.log(response?.status, response);
        if (response?.status === 200 && response?.data?.entityUid) {
          console.log(response?.data?.entityUid);
          ret
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    } else {
      return false;
    }
  };


  const handleProceed = () => {
    if (accNo == '' || accHolder == '' || accType == '' || bankName == '' || ifscCode == '' || entityUid == '') {
      showSnackbar('Enter all the details');
      return
    }
    else if (!/^[a-zA-Z\s]+$/.test(accHolder)) {
      showSnackbar('Account holder name should contain only alphabets');
      return;
    }


    sendImage(filePayload,"CHEQUE",1).then(res=>{
      let postData = {
        bankAccNo: accNo,
        bankAccHolderName: accHolder,
        bankAccType: accType,
        bankNameAndBranch: bankName,
        bankIfsc: ifscCode,
      };
      if(res){
        postData.checkPhoto = res
      }else{
        postData.checkPhoto = entityUid
      }
      filePayload = {}
      updateBank(postData).then((response) => {
        if (response.status === 200) {
          const responses = response.data;
          setPopupVisible(true)
          setPopupContent(responses?.message || "Something Went wrong, Please try again")
        }
        getBankDetailsAndCallFileUri()
      }).catch(err => {
        setPopupVisible(true)
        setPopupContent(err?.response.message || "Something Went wrong, Please try again")
      });
    })
   
  };
  const showSnackbar = message => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  const getList = () => {
    return availableBanks.length > 0 ? availableBanks?.map(bank=>({value:bank,label:bank})) : []
  }
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
          <InputField
            label={t("strings:lbl_account_number")}
            value={accNo}
            onChangeText={(accNo) => setAccNo(accNo)}
          />
          <InputField
            label={t("strings:lbl_account_holder_name")}
            value={accHolder}
            onChangeText={(accHolder) => setAccHolder(accHolder)}
          />
          <PickerField
            label={t("strings:select_account_type")}
            disabled={false}
            selectedValue={accType}
            onValueChange={(itemValue) => setAccType(itemValue)}
            items={acTypePickerItems}
          />
          <PickerField
            label={t("strings:select_bank")}
            disabled={false}
            selectedValue={bankName}
            onValueChange={(itemValue) => setBankName(itemValue)}
            items={getList()}
          />
          <InputField
            label={t("strings:ifsc")}
            value={ifscCode}
            onChangeText={(ifscCode) => setIfscCode(ifscCode)}
          />
          <View>
            <Text
              style={{ color: Colors.black, fontWeight: 700, marginLeft: 12 }}
            >
              {t("strings:cancelled_cheque_copy")}
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={handleImagePickerPress}
            >
              {selectedImage ? (
                <TextInput
                  style={styles.input}
                  placeholder={selectedImageName}
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

            <ImagePreview close={closeModal} imageUri={selectedImage} visible={isModalVisible}/>

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
        </View>
        <View style={styles.button}>
          <Buttons
            label={t("strings:submit")}
            variant="filled"
            onPress={() => handleProceed()}
            width="100%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
            icon={arrowIcon}
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
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
    gap: 5,
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5,
  },
  textHeader: {
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
    fontWeight: 'bold',
  },
  textSubHeader: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
  },
  container: {
    height: responsiveHeight(8),
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
    borderRadius: 5,
    height: responsiveHeight(5),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
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
    alignItems: 'center',
  },
  picker: {
    width: '90%',
    color: colors.grey,
  },
  labelPicker: {
    color: colors.grey,
    fontWeight: 'bold',
  },
  modalcontainer: { alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },

});
export default Bank;
