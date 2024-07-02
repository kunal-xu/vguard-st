import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import colors from "@/src/utils/colors";
import {
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { Table, Row, Rows } from "react-native-table-component";
import {
  getProductListing,
} from "@/src/utils/apiservice";
import { ProductDetail, ProductRequest } from "@/src/utils/types";
import { showToast } from "@/src/utils/showToast";

const ProductWiseOfferTable = () => {
  const { t } = useTranslation();
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const payload = new ProductRequest();
        const response = await getProductListing(payload);
        const responseData: ProductDetail[] = response.data;
        setProductDetails(responseData);
      } catch (error) {
        showToast("Something went wrong. Please try again");
      }
    })();
  }, []);

  const data = productDetails.map((product, index) => [
    index + 1,
    product.points.toString(),
    product.productName,
  ]);

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
