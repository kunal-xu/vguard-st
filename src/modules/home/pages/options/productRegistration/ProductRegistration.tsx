import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { getRetailerCategories } from '../../../../../utils/apiservice';
import greyTickImage from '../../../../../assets/images/tick_1_notSelected.png';
import yellowTickImage from '../../../../../assets/images/tick_1.png';

const baseURL = 'https://www.vguardrishta.com/';

const ProductRegistration = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleCategorySelection = (productCode) => {
    console.log(productCode);
    setSelectedOption(productCode);
    console.log('productCode', productCode);
    navigation.navigate('scanScreen', {productCode});
  };

  useEffect(() => {
    getRetailerCategories()
      .then((response) => response.data)
      .then((responseData) => {
        console.log(responseData);
        const updatedData = responseData.map((category) => ({
          ...category,
          imageUrl: baseURL + category.imageUrl,
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
// data = [
//     {
//         "specs": null,
//         "pointsFormat": null,
//         "product": null,
//         "productName": "Water Heater",
//         "productCategory": null,
//         "productCode": "2",
//         "points": 0.0,
//         "imageUrl": "retimg\\appImages\\Category\\heater.png",
//         "userId": null,
//         "productId": null,
//         "paytmMobileNo": null
//     },
//     {
//         "specs": null,
//         "pointsFormat": null,
//         "product": null,
//         "productName": "Water Plus",
//         "productCategory": null,
//         "productCode": "3",
//         "points": 0.0,
//         "imageUrl": "retimg\\appImages\\Category\\heater.png",
//         "userId": null,
//         "productId": null,
//         "paytmMobileNo": null
//     }
// ]

  return (
    <ScrollView style={styles.mainWrapper}>
      <Text style={styles.heading}>Product Registration</Text>
      <View style={styles.categories}>
        {data.map((category) => (
          <TouchableOpacity
            key={category.productCode}
            style={styles.oval}
            onPress={() => handleCategorySelection(category.productCode)}
          >
            <Image style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="contain" source={{ uri: category.imageUrl }} />
            <Text style={[styles.categoryText, { flex: 2 }]}>{category.productName}</Text>
            <Image source={selectedOption === category.productCode ? yellowTickImage : greyTickImage} style={styles.tick} />
          </TouchableOpacity>
        ))}
        {/* <Text style={[{color: colors.black}]}>{selectedOption}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: colors.black,
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
  },
  categories: {
    marginTop: 10,
    alignItems: 'center',
  },
  oval: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 10,
    margin: 10,
    width: '80%',
    height: responsiveHeight(10),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 50,
  },
  categoryText: {
    color: colors.black,
    flex: 2,
  },
  tick: {
    height: 15,
    width: 15,
  },
});

export default ProductRegistration;
