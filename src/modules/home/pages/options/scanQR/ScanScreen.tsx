import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Buttons from '../../../../../components/Buttons';
import { useTranslation } from 'react-i18next';
import cameraIcon from '../../../../../assets/images/ic_scan_code_camera.webp';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';
import getLocation from '../../../../../utils/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  captureSale,
  getBonusPoints,
  checkScanPopUp,
  sendCouponPin,
} from '../../../../../utils/apiservice';
import ScratchCard from '../../../../../components/ScratchCard';
import RewardBox from '../../../../../components/ScratchCard';
import PopupWithButton from '../../../../../components/PopupWithButton';
import { scanQR } from 'react-native-simple-qr-reader';
import Loader from '../../../../../components/Loader';

const ScanScreen = ({ navigation, route }) => {
  const type = null;
  const { t } = useTranslation();
  const [qrCode, setQrcode] = React.useState('');
  const [scratchCardProps, setscratchCardProps] = React.useState({ isVisible: false, rewardImage: null, rewardResultText: null, text1: null, text2: null, text3: null, button: null, textInput: false, scratchable: false });
  const [popupProps, setPopupProps] = React.useState({ buttonText: '', children: null, onConfirm: null, onClose: null, isVisible: false });
  const [loader, showLoader] = useState(false);
  const [PIN, setPIN] = React.useState(null);
  const [position, setPosition] = useState({
    latitude: '',
    longitude: ''
  })
  var USER = null;

  var CouponResponse;
  //var popupProps={}
  React.useEffect(() => {

    AsyncStorage.getItem('USER').then(r => {
      USER = JSON.parse(r);
      checkScanPopUp(USER.userCode).then(response => {
        const result = response.data;
        if (result.code == '1') {
          var d = {}
          d.buttonText = 'OK',
            d.children = (<Text style={{ color: colors.black, fontWeight: 700 }}>{result.message}</Text>)
          d.onConfirm = () => setPopupProps({ ...popupProps, isVisible: false })
          d.isVisible = true
          d.onClose = () => setPopupProps({ ...popupProps, isVisible: false })
          setPopupProps(d)
        }
      })
      getUserLocation()
    });
  }, []);


  const getUserLocation = () => {
    // showLoader(true);
    getLocation()
      .then(position => {
        if (position != null) {
          setPosition({
            latitude: position.latitude.toString(),
            longitude: position.longitude.toString()
          })
          showLoader(false);
        } else {
          console.error('Position is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  };

  async function scan() {


    scanQR()
      .then(result => setQrcode(result))
      .catch(e => console.error(e));
  }

  async function sendBarcode(pin = null) {
    setPopupProps({ ...popupProps, isVisible: false })
    if (qrCode.length != 16) {
      setPopupProps({
        buttonText: 'OK',
        children: (<Text style={{ fontWeight: 'bold' }}>Please enter valid 16 character barcode</Text>),
        onConfirm: () => setPopupProps({ ...popupProps, isVisible: false }),
        onClose: () => setPopupProps({ ...popupProps, isVisible: false }),
        isVisible: true
      })
      return
    }
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    const userRoleId = user && user.roleId ? user.roleId.toString() : '';
    var apiResponse;
    var apiResponse;
    var CouponData = {
      userMobileNumber: '',
      couponCode: '',
      pin: '',
      smsText: '',
      from: '',
      userType: userRoleId,
      userId: 0,
      apmID: 0,
      retailerCoupon: false,
      userCode: user.userCode,
      isAirCooler: 0,
      latitude: position?.latitude,
      longitude: position?.longitude,
      geolocation: '',
      category: '',
    };

    //console.log(position);
    CouponData.latitude = 99
    CouponData.longitude = 99
    pin ? CouponData.pin = pin : CouponData.pin = ''
    CouponData.couponCode = qrCode;
    CouponData.from = 'APP';
    CouponData.userMobileNumber = user.mobileNo1;
    CouponData.geolocation = null;

    showLoader(true)
    if (type == 'airCooler') {
      apiResponse = await isValidBarcode(CouponData, 1, '', 0, null);
      showLoader(false);
    } else {
      apiResponse = await isValidBarcode(CouponData, 0, '', 0, null);
      const r = apiResponse.data;
      showLoader(false);
      console.log(r);
      CouponResponse = r;
    }

    if (CouponResponse.errorCode == 1) {
      setQrcode('');
      var couponPoints = CouponResponse.couponPoints;
      var basePoints = CouponResponse.basePoints;
      basePoints ? (basePoints = `Base Points: ${basePoints}`) : null;

      let data = {
        rewardImage: {
          width: 100,
          height: 100,
          resourceLocation: require('../../../../../assets/images/ic_rewards_gift.png'),
        },
        rewardResultText: {
          color: 'black',
          fontSize: 16,
          textContent: 'YOU WON',
          fontWeight: '700',
        },
        text1: {
          color: 'black',
          fontSize: 16,
          textContent: couponPoints,
          fontWeight: '700',
        },
        text2: {
          color: 'black',
          fontSize: 16,
          textContent: 'POINTS',
          fontWeight: '700',
        },
        text3: {
          color: '#9c9c9c',
          fontSize: 12,
          textContent: basePoints,
          fontWeight: '700',
        },
        button: {
          buttonColor: '#F0C300',
          buttonTextColor: 'black',
          buttonText: '',
          buttonAction: () => setscratchCardProps({ ...scratchCardProps, isVisible: false }),
          fontWeight: '400',
        },
        textInput: false,
        scratchable: false,
        isVisible: true,
        onClose: () => checkBonusPoints()
      };
      setscratchCardProps(data)

    } else if (CouponResponse.errorCode == 3) {
      await AsyncStorage.setItem("CouponResponse", JSON.stringify(CouponResponse))
      setQrcode('');
      var couponPoints = CouponResponse.couponPoints;
      var basePoints = CouponResponse.basePoints;
      basePoints ? (basePoints = `Base Points: ${basePoints}`) : null;

      let data = {
        rewardImage: {
          width: 100,
          height: 100,
          resourceLocation: require('../../../../../assets/images/ic_rewards_gift.png'),
        },
        rewardResultText: {
          color: 'black',
          fontSize: 16,
          textContent: 'YOU WON',
          fontWeight: '700',
        },
        text1: {
          color: 'black',
          fontSize: 16,
          textContent: couponPoints,
          fontWeight: '700',
        },
        text2: {
          color: 'black',
          fontSize: 16,
          textContent: 'POINTS',
          fontWeight: '700',
        },
        text3: {
          color: '#9c9c9c',
          fontSize: 12,
          textContent: basePoints,
          fontWeight: '700',
        },
        button: {
          buttonColor: '#F0C300',
          buttonTextColor: 'black',
          buttonText: 'Register Warranty',
          buttonAction: () => navigation.navigate("ProductRegForm"),
          fontWeight: '400',
        },
        textInput: false,
        scratchable: false,
        isVisible: true,
        onClose: () => navigation.navigate("ProductRegForm")
      };
      setscratchCardProps(data)


    }
    else if (CouponResponse.errorCode == 2) {
      setPopupProps({
        buttonText: 'SUBMIT',
        children: (<TextInput onChangeText={(e) => setPIN(e)} value={PIN} style={{ borderBottomWidth: 2, borderBottomColor: 'black', textDecorationColor: 'black', width: '100%', height: 40 }} />),
        onConfirm: () => sendBarcode(PIN),
        isVisible: true,
        onClose: () => setPopupProps({ ...popupProps, isVisible: false })
      })

    } else {
      setPopupProps({
        buttonText: 'OK',
        children: (<Text style={{ fontWeight: 'bold', color: colors.black }}>{CouponResponse.errorMsg}</Text>),
        onConfirm: () => setPopupProps({ ...popupProps, isVisible: false }),
        onClose: () => setPopupProps({ ...popupProps, isVisible: false }),
        isVisible: true
      })

    }


  }

  function checkBonusPoints() {
    setscratchCardProps({ ...scratchCardProps, isVisible: false })
    if (CouponResponse.transactId && CouponResponse.bitEligibleScratchCard) {
      getBonusPoints(CouponResponse.transactId).then(response => response.data.then(result => {
        var couponPoints = result.promotionPoints;
        let data = {
          rewardImage: {
            width: 100,
            height: 100,
            resourceLocation: require('../../../../../assets/images/ic_rewards_gift.png'),
          },
          rewardResultText: {
            color: 'black',
            fontSize: 16,
            textContent: result.errorMsg,
            fontWeight: '700',
          },
          text1: {
            color: 'black',
            fontSize: 16,
            textContent: couponPoints,
            fontWeight: '700',
          },
          text2: {
            color: 'black',
            fontSize: 16,
            textContent: 'POINTS',
            fontWeight: '700',
          },
          text3: {
            color: '#9c9c9c',
            fontSize: 12,
            textContent: "",
            fontWeight: '700',
          },
          button: {
            buttonColor: '#F0C300',
            buttonTextColor: 'black',
            buttonText: '',
            buttonAction: setscratchCardProps({ ...scratchCardProps, isVisible: false }),
            fontWeight: '400',
          },
          textInput: false,
          scratchable: true,
          isVisible: true,
          onClose: () => setscratchCardProps({ ...scratchCardProps, isVisible: false }),
        };
        setscratchCardProps(data)
      }))

    }
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Loader isLoading={loader} />
      <View style={styles.mainWrapper}>
        {scratchCardProps.isVisible && (
          <RewardBox
            scratchCardProps={scratchCardProps}
            visible={scratchCardProps.isVisible}
            scratchable={scratchCardProps.scratchable}
            onClose={scratchCardProps.onClose}
          />
        )}


        <PopupWithButton onClose={popupProps.onClose} isVisible={popupProps.isVisible} buttonText={popupProps.buttonText} children={popupProps.children} onConfirm={popupProps.onConfirm} />

        <Pressable onPress={() => scan()} style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/ic_scan_code_2.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </Pressable>
        <Buttons
          style={styles.button}
          label={t('strings:click_here_to_scan_a_unique_code')}
          variant="blackButton"
          onPress={() => scan()}
          width="100%"
          iconHeight={30}
          iconWidth={30}
          iconGap={30}
          icon={cameraIcon}
        />
        <Text style={styles.text}>{t('strings:or')}</Text>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>{t('strings:enter_code')}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              onChangeText={e => setQrcode(e)}
              maxLength={16}
              keyboardType='number-pad'
              value={qrCode}
              style={styles.input}
              placeholder={t('strings:enter_code_here')}
              placeholderTextColor={colors.grey}
              textAlign="center"
              onSubmitEditing={async () => await sendBarcode()}
            />
          </View>
        </View>
        <Buttons
          style={styles.button}
          label={t('strings:proceed')}
          variant="filled"
          onPress={async () => await sendBarcode(qrCode)}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Unique Code History')}>
          <View style={styles.rightText}>
            <Text style={styles.smallText}>
              {t('strings:go_to_unique_code_history')}
            </Text>
            <View style={styles.scanImage}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../../../assets/images/ic_circle_right_arrow_yellow.webp')}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Buttons
          style={styles.button}
          label={t('strings:upload_scan_error_')}
          variant="blackButton"
          onPress={() => navigation.navigate('Upload Scanning Error')}
          width="100%"
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
    height: responsiveHeight(20),
  },
  text: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  smallText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  enterCode: {
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(10),
    display: 'flex',
    flexDirection: 'column',
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: responsiveHeight(5),
    flexGrow: 1,
  },
  bottomContainer: {
    flexGrow: 1,
    height: responsiveHeight(5),
  },
  input: {
    padding: 10,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: colors.black,
    fontWeight: 'bold',
  },
  rightText: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

function isValidBarcode(
  CouponData,
  isAirCooler,
  pinFourDigit,
  isPinRequired,
  dealerCategory,
) {
  CouponData.isAirCooler = isAirCooler;

  if (dealerCategory) {
    CouponData.dealerCategory = dealerCategory;
  }

  if (pinFourDigit == '') {
    return captureSale(CouponData)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } else {
    CouponData.pin = pinFourDigit;
    return sendCouponPin(CouponData)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}


export default ScanScreen;
