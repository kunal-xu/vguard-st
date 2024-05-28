import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/src/utils/colors";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import NeedHelp from "@/src/components/NeedHelp";
import { getSchemeImages } from "@/src/utils/apiservice";
import PagerView from "react-native-pager-view";

const Schemes = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const bannerUrl = "https://vguardrishta.com/";

  const fetchData = async () => {
    try {
      const response = await getSchemeImages();
      const result = await response.data;
      const imageArray = result.map((r) => ({
        imageUrl: bannerUrl + r.imgPath,
      }));
      setImageArray(imageArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [imageArray, setImageArray] = useState([]);

  return (
    <View style={styles.container}>
      <PagerView
        style={{
          flex: 1,
        }}
        initialPage={0}
        useNext={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="1"
        >
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="2"
        >
          <Text>Second page</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="3"
        >
          <Text>Third page</Text>
        </View>
      </PagerView>

      <View style={styles.mainWrapper}>
        <View style={styles.options}>
          <CustomTouchableOption
            text="Product-wise scan base points"
            iconSource={require("../../../../assets/images/ic_product_wise_offers.webp")}
            screenName="Product-wise scan base points"
            disabled={false}
          />
          <CustomTouchableOption
            text="Product based scheme offers"
            iconSource={require("../../../../assets/images/ic_active_offers.webp")}
            screenName="Product based scheme offers"
            disabled={true}
          />
          <CustomTouchableOption
            text="Special non-product offers"
            iconSource={require("../../../../assets/images/ic_special_combo_offers.webp")}
            screenName="Special non-product offers"
            disabled={true}
          />
        </View>
        <View style={styles.options}>
          <CustomTouchableOption
            text="Product-wise direct order base points"
            iconSource={require("../../../../assets/images/ic_product_wise_offers.webp")}
            screenName="Product-wise scan base points"
            disabled={true}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  mainWrapper: {
    padding: 15,
  },
});

export default Schemes;
