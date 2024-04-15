import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import colors from '../../../../colors';
import {useTranslation} from 'react-i18next';
import AuthNavigator from '../../auth/stack/AuthNavigator';
import CustomTouchableOption from '../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NeedHelp from '../../../components/NeedHelp';
import {getFile, getUser} from '../../../utils/apiservice';
import { useFocusEffect } from '@react-navigation/native';
import { getImages } from '../../../utils/FileUtils';

const HomeScreen = ({navigation}) => {
  const baseURL = 'https://www.vguardrishta.com/img/appImages/Profile/';

  const {t} = useTranslation();
  const [profileImage, setProfileImage] = useState('');

  // const [userName, setUserName] = useState('');
  // const [userCode, setUserCode] = useState('');
  // const [pointsBalance, setPointsBalance] = useState('');
  // const [redeemedPoints, setRedeemedPoints] = useState('');
  // const [numberOfScan, setNumberOfScan] = useState('');
  // const [userImage, setUserImage] = useState('');
  const [userData, setUserData] = useState({
    userName: null,
    userCode: null,
    pointsBalance: 0,
    redeemedPoints: 0,
    numberOfScan: 0,
    userImage: null,
    userRole: 0,
  });
  const [LoggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (!LoggedInUser) {
      AsyncStorage.getItem('USER').then(r => {
        const value = JSON.parse(r);
        setLoggedInUser(value);
        const user = {
          userName: value.name,
          userCode: value.userCode,
          userImage: value.kycDetails.selfie,
          userRole: value.professionId,
        };
        setUserData(user);
      });
    }
  }, [LoggedInUser]);

  const getUser1 = () => {
    getUser().then((res) => {
      setUserData((prev) => ({
        ...prev,
        pointsBalance: res?.data?.pointsSummary?.pointsBalance,
        redeemedPoints: res?.data?.pointsSummary?.redeemedPoints,
        numberOfScan: res?.data?.pointsSummary?.numberOfScan,
      }));
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser1()
    }, [])
  );

  useEffect(() => {
    console.log(userData, 'userData=================');
    if (userData.userRole && userData.userImage) {
      const getImage = async () => {
        try {
          const profileImage = getImages(
            userData.userImage,
            'PROFILE',
          );
          setProfileImage(profileImage);
        } catch (error) {
          console.log('Error while fetching profile image:', error);
        }
      };

      getImage();
    }
  }, [userData.userRole, userData.userImage]);

  console.log(LoggedInUser);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}>
            <Image
              source={{uri: profileImage}}
              style={{width: '100%', height: '100%', borderRadius: 100}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userData.userName}</Text>
            <Text style={styles.textDetail}>{userData.userCode}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.viewProfile}>
                {t('strings:view_profile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.points}>
          <Pressable
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('strings:points_balance')}</Text>

            <Text style={styles.point}>
              {userData.pointsBalance ? userData.pointsBalance : 0}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Redemption History')}
            style={styles.middlePoint}>
            <Text style={styles.greyText}>{t('strings:points_redeemed')}</Text>
            <Text style={styles.point}>
              {userData.redeemedPoints ? userData.redeemedPoints : 0}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Unique Code History')}
            style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('strings:number_of_scans')}</Text>
            <Text style={styles.point}>{userData.numberOfScan}</Text>
          </Pressable>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:scan_code"
              iconSource={require('../../../assets/images/ic_scan_code.png')}
              screenName="Scan QR"
            />
            <CustomTouchableOption
              text="strings:redeem_points"
              iconSource={require('../../../assets/images/ic_redeem_points.webp')}
              screenName="Redeem Products"
            />
            <CustomTouchableOption
              text="strings:dashboard"
              iconSource={require('../../../assets/images/ic_dashboard.webp')}
              screenName="Dashboard"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:update_kyc"
              iconSource={require('../../../assets/images/ic_update_kyc.webp')}
              screenName="Update KYC"
            />
            <CustomTouchableOption
              text="strings:scheme_offers"
              iconSource={require('../../../assets/images/ic_scheme_offers.png')}
              screenName="schemes"
            />
            <CustomTouchableOption
              text="strings:info_desk"
              iconSource={require('../../../assets/images/ic_vguard_info.webp')}
              screenName="info"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:welfare"
              iconSource={require('../../../assets/images/ic_welfare.webp')}
              screenName="Welfare"
            />
            <CustomTouchableOption
              text="strings:what_s_new"
              iconSource={require('../../../assets/images/ic_whats_new.webp')}
              screenName="new"
            />
            <CustomTouchableOption
              text="strings:raise_ticket"
              iconSource={require('../../../assets/images/ic_raise_ticket.webp')}
              screenName="ticket"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:update_bank"
              iconSource={require('../../../assets/images/ic_raise_ticket.webp')}
              screenName="Update Bank"
            />
            <CustomTouchableOption
              text="strings:tds_certificate"
              iconSource={require('../../../assets/images/tds_ic.png')}
              screenName="TDS Certificate"
            />
            <CustomTouchableOption
              text="strings:engagement"
              iconSource={require('../../../assets/images/elink.png')}
              screenName="Engagement"
            />
          </View>
          <View style={styles.lastrow}>
            <TouchableOpacity
              style={[styles.oval]}
              onPress={() =>
                Linking.openURL(
                  'https://www.vguardrishta.com/img/appImages/Instructionmanual.pdf',
                )
              }>
              <View style={[styles.optionIcon]}>
                <Image
                  source={require('../../../assets/images/ic_instruction_manual.jpeg')}
                  style={[{flex: 1, width: '100%', height: '100%'}]}
                  resizeMode="contain"
                />
              </View>

              <Text style={[styles.nav]}>Instruction Manual</Text>
            </TouchableOpacity>
            {/* <CustomTouchableOption
              text="dashboard:options:manual"
              iconSource={require('../../../assets/images/ic_instruction_manual.jpeg')}
              screenName="manual"
            /> */}
          </View>
        </View>
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
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    fontSize: responsiveFontSize(1.7),
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7),
  },
  ImageProfile: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7),
  },
  points: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 30,
  },
  leftPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyText: {
    width: '80%',
    color: colors.grey,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    marginBottom: 10,
  },
  point: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    marginTop: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
  },
  lastrow: {
    marginLeft: 5,
  },
  oval: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(18),
    width: responsiveWidth(25),
    maxWidth: responsiveWidth(25),
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 100,
  },
  optionIcon: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    marginBottom: 20,
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
