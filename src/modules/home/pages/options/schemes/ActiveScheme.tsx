import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import colors from '../../../../../../colors';

import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { bannerUrl } from '../../../../../utils/constants';
import { getActiveSchemeOffers } from '../../../../../utils/apiservice';

const ActiveScheme = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    getActiveSchemeOffers()
      .then(response => response.data)
      .then(responseData => {
        setData(responseData);
        console.log('<><<><<><>><', responseData, '<><<<><><><><><><<><');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <ScrollView style={styles.mainWrapper}>
      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{t('strings:no_data')}</Text>
        </View>
      ) : (
        data.map((item, index) => (
          <View key={index} style={styles.messageItem}>
            <Image
              style={styles.image}
              source={require("../../../../../assets/images/ic_active_offers.webp")}
            />
            <View style={styles.messageContainer}>
              <Text style={styles.messageHeader}>{item.offerHeading}</Text>
              <ScrollView style={styles.messageTextContainer} horizontal={true}>
                <Text style={styles.messageText}>{item.description}</Text>
              </ScrollView>
              {item?.fileName && (
                <TouchableOpacity style = {styles.pdfViewContainer}
                  onPress={() => {Linking.openURL(bannerUrl + item?.fileName)}}
                >
                  <Image
                    style={styles.pdfView}
                    source={require("../../../../../assets/images/pdf.png")}
                  />
                  <Text style={styles.link}>View</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: responsiveFontSize(2),
    color: colors.grey,
    fontWeight: 'bold',
  },
  mainWrapper: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
  },  
  pdfView:{
    width:30,
    height:30
  },
  link:{
    color:"#fcba03",
    marginLeft:10,
    fontWeight:800
  },
  pdfViewContainer:{
    flexDirection:'row',
    alignItems:"center",
  },
  header: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
  },
  messageItem: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  messageHeader: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: colors.black,
  },
  messageText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.black,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: responsiveFontSize(8),
    width: responsiveFontSize(8),
  },
  messageTextContainer: {
    maxWidth: responsiveWidth(65),
    overflow: 'hidden',
  },
});

export default ActiveScheme;
