import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import colors from "../../../../../../colors";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import Loader from "../../../../../components/Loader";
import { Table, Row, Rows } from "react-native-table-component";
import { useFocusEffect } from "@react-navigation/native";
import { getProductWiseOffersDetail } from "../../../../../utils/apiservice";

const ProductWiseOfferTable = () => {
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const [productDetails, setProductDetails] = useState([
    { slNo: 1, points: 250, materialDesc: "VNS 400 Digital" },
    { slNo: 2, points: 200, materialDesc: "VS 500" },
  ]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //   return  productData();
  //   }, [])
  // );

  // const getProductWiseOffersDetail = async () => {
  //   return {
  //     data: Promise.resolve([
  //       { slNo: 1, points: 250, materialDesc: "VNS 400 Digital" },
  //       { slNo: 2, points: 300, materialDesc: "VNS 500 Ultra" },
  //       // Add more mock products if needed
  //     ])
  //   };
  // };

  // useEffect(() => {
  //   // Simulate fetching data
  //   getProductWiseOffersDetail().then((productDataRaw) => {
  //     productDataRaw.data.then((productDataJson) => {
  //       console.log(productDataJson);
  //       if (productDataJson?.length > 0) {
  //         setProductDetails(productDataJson);
  //       }
  //     });
  //   });
  // }, []);

  const data = productDetails.map((product) => [
    product.slNo.toString(),
    product.points.toString(),
    product.materialDesc,
  ]);
  console.log(data);

  const widthArr = [140, 140, 140];
  const tableHead = ["Sl No", "Points", "Description"];

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{ borderWidth: 0, borderColor: colors.black }}>
        <Row
          widthArr={widthArr}
          data={tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        {data?.length > 0 ? (
          <Rows widthArr={widthArr} data={data} textStyle={styles.text2} />
        ) : (
          <>
            <Rows
              data={[["No Data"]]}
              textStyle={[styles.text, styles.emptyDataStyle]}
            />
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
    backgroundColor: "#000000",
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
    paddingBottom: 20,
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

export default ProductWiseOfferTable;
