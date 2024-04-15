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

const ProductWiseOfferTable = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const [productDetails, setProductDetails] = useState([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //   return  productData();
  //   }, [])
  // );

  useEffect(() => {
    getProductWiseOffersDetail(categoryId).then((productDataRaw) => {
      productDataRaw.data.then((productDataJson) => {
        console.log(productDataJson.length, productDataJson.length > 0);
        if (productDataJson?.length > 0) {
          console.log(productDataJson);
          setProductDetails(productDataJson);
        }
      });
    });
  }, []);

  const data = productDetails.map((product, index) => [
    (index + 1).toString(),
    product.points.toString(),
    product.materialDesc,
  ]);

  const widthArr = [140, 140, 140];
  const tableHead = ["Mat Code", "Points", "Description"];

  return (
    <ScrollView horizontal style={styles.container}>
      <Table borderStyle={{ borderWidth: 0, borderColor: "#C1C0B9" }}>
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
    backgroundColor: colors.lightGrey,
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
