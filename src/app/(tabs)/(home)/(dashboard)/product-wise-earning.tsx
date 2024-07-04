import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import colors from "@/src/utils/colors";
import {
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { getProdWiseEarning } from "@/src/utils/apiservice";

const ProductWiseEarning = () => {
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getProdWiseEarning();
        const responseData = response.data;
        setProductDetails(responseData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let data: any = [];

  if (productDetails?.length > 0) {
    data = productDetails.map((product) => [
      product.slNo.toString(),
      product.partDesc,
      product.points.toString(),
      product.bonusPoints,
      product.couponCode,
      product.createdDate,
    ]);
  }

  const tableHead = [
    "Sl No.",
    "Product Description",
    "Points",
    "Bonus Points",
    "Coupon Code",
    "Created Date",
  ];
  const widthArr = [80, 160, 100, 130, 160, 120];

  return (
    <ScrollView horizontal style={styles.container}>
      <Table borderStyle={{ borderWidth: 0, borderColor: "black" }}>
        <Row
          widthArr={widthArr}
          data={tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        {data.length === 0 ? (
          <Rows
            data={[["No Data"]]}
            textStyle={[styles.text, styles.emptyDataStyle]}
          />
        ) : (
          <>
            <Rows widthArr={widthArr} data={data} textStyle={styles.text2} />
          </>
        )}
      </Table>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  head: {
    backgroundColor: colors.black,
  },
  text: {
    color: colors.white,
    paddingLeft: 10,
    paddingBottom: 20,
    fontWeight: 700,
  },
  text2: {
    paddingLeft: 10,
    color: colors.black,
    fontWeight: "bold",
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
    marginBottom: 10,
    color: colors.black,
    fontWeight: "bold",
  },
  emptyDataStyle: {
    color: colors.grey,
    fontWeight: "bold",
  },
});

export default ProductWiseEarning;