import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { width } from '../../../../../utils/dimensions';
import { getProdWiseEarning } from '../../../../../utils/apiservice';


const ProductWiseEarning = () => {
    const [productDetails, setProductDetails] = useState([]);
    useEffect(() => {
        getProdWiseEarning()
            .then(response => response.data)
            .then(responseData => {
                console.log(responseData);
                setProductDetails(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const data = productDetails.map(product => [
        product.slNo.toString(),
        product.partDesc,
        product.points.toString(),
        product.bonusPoints,
        product.couponCode,
        product.createdDate
    ]);

    const tableHead = ["Sl No.", "Product Description", "Points","Bonus Points","Coupon Code","Created Date"];
    const widthArr = [80, 160, 100, 130, 160, 120]

    return (
        <ScrollView horizontal style={styles.container}>
            <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }}>
            <Row widthArr={widthArr} data={tableHead} style={styles.head} textStyle={styles.text} />
                {data.length === 0 ? (
                    <Rows data={[['No Data']]} textStyle={[styles.text,styles.emptyDataStyle]} />
                ) : (
                    <>
                        <Rows widthArr={widthArr} data={data} textStyle={styles.text2} />
                    </>
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
        backgroundColor:'#000000',
    },
    text: {
        color: colors.white,
        paddingLeft:10,
        paddingBottom:20,
        fontWeight:700,

    },
    text2:{
        paddingLeft:10,
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

export default ProductWiseEarning;
