import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCarousel from '../../../../../components/ReusableCarousel';
import colors from '../../../../../../colors';
import image from '../../../../../assets/images/banner_redeem_ppoints.webp';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import NeedHelp from '../../../../../components/NeedHelp';
import {getSchemeImages} from '../../../../../utils/apiservice';
import {bannerUrl} from '../../../../../utils/constants';
import ReusableUrlCarousel from '../../../../../components/ReusableUrlCarousel';

const Schemes = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const bannerUrl = "https://vguardrishta.com/";

  const fetchData = async () => {
    try {
      const response = await getSchemeImages();
      const result = await response.data;
      const imageArray = result.map((r) => ({ imageUrl: bannerUrl + r.imgPath }));
      setImageArray(imageArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const [imageArray, setImageArray] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        {imageArray &&
        <ReusableUrlCarousel data={imageArray} />}
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.options}>
          <CustomTouchableOption
            text="strings:product_wise_offers"
            iconSource={require('../../../../../assets/images/ic_product_wise_offers.webp')}
            screenName="Product Wise Offers"
          />
          <CustomTouchableOption
            text="strings:active_scheme_offers"
            iconSource={require('../../../../../assets/images/ic_active_offers.webp')}
            screenName="Active Schemes/Offers"
          />
          <CustomTouchableOption
            text="strings:special_combo_offers"
            iconSource={require('../../../../../assets/images/ic_special_combo_offers.webp')}
            screenName="Special Combo Offers"
          />
        </View>
        <NeedHelp />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  carousel: {
    backgroundColor: colors.white,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  mainWrapper: {
    padding: 15,
  },
});

export default Schemes;
