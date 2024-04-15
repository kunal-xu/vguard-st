import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../../../../../colors';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import NeedHelp from '../../../../../components/NeedHelp';
import { useTranslation } from 'react-i18next';
import { getInfoDeskBanners } from '../../../../../utils/apiservice';
import ReusableUrlCarousel from '../../../../../components/ReusableUrlCarousel';

const Info = () => {
  const { t } = useTranslation();
  const [imageArray, setImageArray] = useState(null);

  const imageUrl = "https://vguardrishta.com/";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getInfoDeskBanners();
      const result = await response.data;
      const ar = result.map((r) => ({ imageUrl: imageUrl + r.imgPath }));
      setImageArray(ar);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        {imageArray &&
          <ReusableUrlCarousel data={imageArray} />
        }
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.options}>
          <CustomTouchableOption
            text="strings:v_guard_info"
            iconSource={require('../../../../../assets/images/ic_vguard_info.webp')}
            screenName="V-Guard Info"
          />
          <CustomTouchableOption
            text="strings:downloads_small"
            iconSource={require('../../../../../assets/images/ic_downloads_.webp')}
            screenName="Downloads"
          />
          <CustomTouchableOption
            text="strings:v_guard_product_catalog"
            iconSource={require('../../../../../assets/images/ic_vguard_product_catalog.webp')}
            screenName="Product Catalogue"
          />
        </View>
        <NeedHelp />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  carousel: {
    backgroundColor: colors.white
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30
  },
  mainWrapper: {
    padding: 15
  }
});

export default Info