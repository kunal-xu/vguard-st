import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../../../colors';
import {useTranslation} from 'react-i18next';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NeedHelp from '../../../../../components/NeedHelp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReusableCarousel from '../../../../../components/ReusableCarousel';
import { getUser } from '../../../../../utils/apiservice';
import { useFocusEffect } from '@react-navigation/native';

const RedeemPoints = ({navigation}) => {
  const {t} = useTranslation();
  const carouselData = [
    {
      imageUrl: require('../../../../../assets/images/banner_redeem_ppoints.webp'),
    },
    {imageUrl: require('../../../../../assets/images/banner.webp')},
    {
      imageUrl: require('../../../../../assets/images/banner_redeem_ppoints.webp'),
    },
  ];
  const [pointData, setPointData] = useState({
    pointsBalance: '',
    redeemedPoints: '',
    numberOfScan: '',
  });

  const getUser1 = () => {
    getUser().then((res) => {
      setPointData({
        pointsBalance: res?.data?.pointsSummary?.pointsBalance,
        redeemedPoints: res?.data?.pointsSummary?.redeemedPoints,
        numberOfScan: res?.data?.pointsSummary?.numberOfScan,
      });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser1()
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.carousel}>
          <ReusableCarousel data={carouselData} />
        </View>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('strings:points_balance')}</Text>

            <Text style={styles.point}>
              {pointData.pointsBalance ? pointData.pointsBalance : 0}
            </Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.greyText}>{t('strings:points_redeemed')}</Text>
            <Text style={styles.point}>
              {pointData.redeemedPoints ? pointData.redeemedPoints : 0}
            </Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('strings:number_of_scans')}</Text>
            <Text style={styles.point}>{pointData.numberOfScan}</Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:bank_transfer"
              iconSource={require('../../../../../assets/images/ic_bank_transfer.webp')}
              screenName="Bank Transfer"
            />
            <CustomTouchableOption
              text="strings:paytm_transfer"
              iconSource={require('../../../../../assets/images/ic_paytm_transfer.webp')}
              screenName="Paytm Transfer"
            />
            <CustomTouchableOption
              text="UPI Transfer"
              iconSource={require('../../../../../assets/images/upi_transfer.webp')}
              screenName="UPI Transfer"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:e_gift_cards"
              iconSource={require('../../../../../assets/images/ic_egift_cards.webp')}
              screenName="Gift Voucher"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:track_your_redemption"
              iconSource={require('../../../../../assets/images/ic_track_your_redemption.webp')}
              screenName="Track Redemption"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:redemption_history"
              iconSource={require('../../../../../assets/images/ic_redemption_history.webp')}
              screenName="Redemption History"
            />
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
  },
  carousel: {
    backgroundColor: colors.white,
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
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPoint: {
    width: responsiveWidth(30),
    height: 100,
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
});

export default RedeemPoints;
