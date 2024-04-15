import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Buttons from '../../../../../components/Buttons';
import { useTranslation } from 'react-i18next';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';
import ActionPickerModal from '../../../../../components/ActionPickerModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { sendImage } from '../../../../../utils/FileUtils';
import { processErrorCoupon } from '../../../../../utils/apiservice';
import Loader from '../../../../../components/Loader';
import Popup from '../../../../../components/Popup';
import { scanQR } from 'react-native-simple-qr-reader';

const UploadError = () => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = React.useState(false)
  const [couponImage, setCouponImage] = React.useState(null)
  const [barcode, setBarcode] = React.useState(null)
  const [remarks,setRemarks] = React.useState(null);
  const [isLoading,setIsLoading] = React.useState(false);
  const [popupProps,setPopupPros] = React.useState({isVisible:false,children:null})

  async function openCamera() {
    let options = { quality: 5, maxWidth: 500, maxHeight: 500, includeBase64: true, mediaType: 'photo', noData: true, };

    await launchCamera(options, response => { 
    if (response.didCancel) { 
    console.log('Cancelled');
    } else if (response.error) { 
    console.log('Error', response.errorMessage);
    } else { 
    console.log(response); 
    if (response.assets.length) { setCouponImage({ uri: response.assets[0].uri, type: response.assets[0].type, filename: response.assets[0].fileName })}
    } }) 
  
  setshowModal(false);
  }

  async function uploadScanError(){
    
   try {
     if(!couponImage) {ToastAndroid.show(t('strings:please_capture_or_upload_invalid_coupon_picture'),ToastAndroid.SHORT); return}
     if(!barcode){ ToastAndroid.show(t('strings:error_barcode'),ToastAndroid.SHORT);return}
     if(barcode.length<16) {ToastAndroid.show(t('strings:please_enter_valid_sixteen_digit'),ToastAndroid.SHORT); console.log(!barcode.length,barcode.length);return}
     if(!remarks) {ToastAndroid.show(t('strings:enter_remarks'),ToastAndroid.SHORT); return}
     //setIsLoading(true)
     const imagePath = await sendImage(couponImage,'ERROR_COUPON','1')
     const errorCoupon = {
       remarks:remarks,
       couponCode:barcode,
       errorCouponPath:imagePath
     }
     processErrorCoupon(errorCoupon).then(result=>{
       //setIsLoading(false);
       console.log(result);
       if(result.code==200){
        setPopupPros({isVisible:true,children:result.message})
       }else{
         ToastAndroid.show(result.message,ToastAndroid.SHORT);
       }
     }).catch(error=>{
       console.log(error);
       ToastAndroid.show(t('strings:problem_occurred'),ToastAndroid.SHORT);
     })
   } catch (error) {
    console.log(error);
    ToastAndroid.show('Something went wrong',ToastAndroid.SHORT);
   }
  }  

  async function openGallery() {
    let options = { quality: 5,  mediaType: 'photo', noData: true, };

    await launchImageLibrary(options, response => { 
    if (response.didCancel) { 
    console.log('Cancelled');
    } else if (response.error) { 
    console.log('Error', response.errorMessage);
    } else { 
    console.log(response); 
    if (response.assets.length) { setCouponImage({ uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName })}
    } }) 
  
  setshowModal(false);

  }

  function handlePopup() {
    setshowModal(false);
    setTimeout(() => {
      setshowModal(true);
    }, 1);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        {popupProps.isVisible && (
          <Popup
            isVisible={popupProps.isVisible}
            onClose={() => setPopupPros({ ...popupProps, isVisible: false })}
            children={popupProps.children}
          />
        )}
        {isLoading && <Loader isLoading={isLoading} />}
        {showModal && (
          <ActionPickerModal
            onCamera={() => openCamera()}
            onGallery={() => openGallery()}
          />
        )}
        <Pressable onPress={() => handlePopup()}>
          <View style={styles.imageContainer}>
            {couponImage ? (
              <Image
                source={{ uri: couponImage.uri }}
                style={{ flex: 1, width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../../../assets/images/camera.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            )}
          </View>
        </Pressable>
        <Buttons
          style={styles.button}
          label={t("strings:click_here_to_report_error_scan")}
          variant="blackButton"
          onPress={() =>handlePopup()}
          width="100%"
          height="10%"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={(t) => setBarcode(t)}
            maxLength={16}
            keyboardType="number-pad"
            placeholder={t("strings:enter_code_here")}
            placeholderTextColor={colors.grey}
          />
          <Pressable
            onPress={() => scanQR().then((r) => setBarcode(r))}
            style={styles.scanImage}
          >
            <Image
              source={require("../../../../../assets/images/ic_scan_code_2.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t("strings:description_remarks")}
          placeholderTextColor={colors.grey}
          multiline={true}
          textAlignVertical="top"
          value={remarks}
          onChangeText={(text) => {
            setRemarks(text);
          }}
        />
        <Buttons
          style={styles.button}
          label={t("strings:submit")}
          variant="filled"
          onPress={() => uploadScanError()}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
        <NeedHelp />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '100%',
    gap: 10,
  },
  header: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    height: responsiveHeight(15),
    width: responsiveHeight(15),
  },
  inputContainer: {
    borderColor: colors.lightGrey,
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
    fontWeight: 'bold',
  },
  descriptionInput: {
    width: '100%',
    height: responsiveHeight(15),
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
  },
  scanImage: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    marginRight: 5,
  },
});

export default UploadError;
