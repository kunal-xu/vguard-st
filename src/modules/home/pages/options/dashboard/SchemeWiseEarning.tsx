import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { getSchemeWiseEarning } from '../../../../../utils/apiservice';


const SchemeWiseEarning = () => {
  const [schemeDetails, setSchemeDetails] = useState([]);
  useEffect(() => {
    getSchemeWiseEarning()
      .then(response => response.data)
      .then(responseData => {
        setSchemeDetails(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const data = schemeDetails.map(product => [
    product.slNo.toString(),
    product.createdDate,
    product.partDesc,
  ]);

  const tableHead = ["Sl No.", "Created Date", "Material Description", "Coupon Code", "Extra Bonus Points", "Scheme Name", "Scheme Period"];

  return (
    <ScrollView style={styles.container} horizontal={true}>
      <Table borderStyle={{ borderWidth: 0 }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {data.length === 0 ? (
          <Rows data={[["No Data"]]} textStyle={[styles.text, styles.emptyDataStyle]} />
        ) : (
          <Rows data={data} textStyle={styles.text2} />
        )}
      </Table>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  head: {
    backgroundColor: colors.lightGrey,
    backgroundColor: '#000000',
  },
  text: {
    color: colors.white,
    paddingRight: 30,
    paddingBottom: 20,
    fontWeight: 700,
  },
  text2: {
    paddingLeft: 10,
    color: colors.black,
    fontWeight: 'bold'
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    marginBottom: 10,
    color: colors.black,
    fontWeight: 'bold'
  },
  emptyDataStyle: {
    color: colors.grey,
    fontWeight: "bold",
  },
});

export default SchemeWiseEarning;
