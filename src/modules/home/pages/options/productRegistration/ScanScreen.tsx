import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React from 'react';
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
    sendCouponPin,
  } from '../../../../../utils/apiservice';
  import ScratchCard from '../../../../../components/ScratchCard';
  // import {scanQR} from 'react-native-simple-qr-reader';
  
  const ScanScreen = ({ navigation, route }) => {
    const type = null;
    const { t } = useTranslation();
    const [qrCode, setQrcode] = React.useState('');
    const [scratchCard, showScratchCard] = React.useState(false);
    var USER = null;
  
    React.useEffect(() => {
  
      AsyncStorage.getItem("USER").then(r => {
        USER = JSON.parse(r);
      })

      const { productCode } = route.params;
      console.log('Product Code:', productCode);
  
  
    }, [route.params]);
  
    // async function scan() {
    //   scanQR()
    //     .then(result => setQrcode(result))
    //     .catch(e => console.error(e));
    // }
  
    async function sendBarcode() {
      const position = await getLocation();
      const user = await AsyncStorage.getItem('USER');
      var apiResponse;
      var CouponData = {
        userMobileNumber: '',
        couponCode: '',
        pin: '',
        smsText: '',
        from: '',
        userType: USER.roleId.toString(),
        userId: 0,
        apmID: 0,
        retailerCoupon: false,
        userCode: '',
        isAirCooler: 0,
        latitude: '',
        longitude: '',
        geolocation: '',
        category: '',
      };
  
      console.log(position);
      CouponData.latitude = 99;
      CouponData.longitude = 99;
  
      CouponData.couponCode = qrCode;
      CouponData.from = 'APP';
      CouponData.userMobileNumber = user.mobileNo1;
      CouponData.geolocation = null;
      if (type == 'airCooler') {
        apiResponse = await isValidBarcode(CouponData, 1, '', 0, null);
        console.log(apiResponse.data);
      } else {
        apiResponse = await isValidBarcode(CouponData, 0, '', 0, null);
  
        console.log(apiResponse);
        const r = await apiResponse.data;
        console.log(r);
      }
  
      if (apiResponse.errorCode == 1) {
        setQrcode('');
        showScratchCard(true);
      }
    }
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.mainWrapper}>
          {scratchCard && (
            <ScratchCard
              points={'40'}
              onPress={() => {
                showScratchCard(false);
                // if (
                //   apiResponse.transactId &&
                //   apiResponse.bitEligibleScratchCard
                // ) {
                //   getBonusPoints(apiResponse.transactId)
                //     .then(r => showScratchCard(true))
                //     .catch(e => console.log(e));
                // }
              }}
            />
          )}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../../assets/images/ic_scan_code_2.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
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
                value={qrCode}
                style={styles.input}
                placeholder={t('strings:enter_code_here')}
                placeholderTextColor={colors.grey}
                textAlign="center"
              />
            </View>
          </View>
          <Buttons
            style={styles.button}
            label={t('strings:proceed')}
            variant="filled"
            onPress={async () => await sendBarcode()}
            width="100%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
            icon={arrowIcon}
          />
          <View style={styles.rightText}>
            <Text style={styles.smallText}>
              {t('strings:go_to_unique_code_history')}
            </Text>
            <TouchableOpacity
              style={styles.scanImage}
              onPress={() => navigation.navigate('Unique Code History')}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../../../assets/images/ic_circle_right_arrow_yellow.webp')}
              />
            </TouchableOpacity>
          </View>
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
  
  async function isValidBarcode(
    CouponData,
    isAirCooler,
    pinFourDigit,
    isPinRequired,
    dealerCategory,
  ) {
    var result = null;
    CouponData.isAirCooler = isAirCooler;
    if (dealerCategory) {
      CouponData.dealerCategory = dealerCategory;
    }
    if (pinFourDigit == '') {
      result = await captureSale(CouponData);
      console.log(CouponData);
      return result;
    } else {
      CouponData.pin = pinFourDigit;
      result = await sendCouponPin(CouponData);
      return result;
    }
  }
  
  export default ScanScreen;
  