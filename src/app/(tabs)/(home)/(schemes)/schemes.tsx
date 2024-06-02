import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/src/utils/colors";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import NeedHelp from "@/src/components/NeedHelp";
import { getSchemeImages } from "@/src/utils/apiservice";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
const Schemes = () => {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          height: "30%",
          marginTop: 20,
        }}
      >
        <PagerView
          style={{
            flex: 1,
          }}
          initialPage={0}
          useNext={false}
          onPageSelected={(e) => setSelectedPage(e.nativeEvent.position)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            key="0"
          >
            <Image
              source={require("../../../../assets/images/schemes-1.jpeg")}
              style={{ height: "100%", width: "90%" }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            key="1"
          >
            <Image
              source={require("../../../../assets/images/schemes-2.jpeg")}
              style={{ height: "100%", width: "90%" }}
            />
          </View>
        </PagerView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {[0, 1].map((_, index) => (
            <View
              key={index}
              style={[
                {
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: "#000",
                  marginHorizontal: 5,
                },
                { opacity: index === selectedPage ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.options}>
          <CustomTouchableOption
            text="Scan base points"
            iconSource={require("../../../../assets/images/ic_product_wise_offers.webp")}
            screenName="Product-wise scan base points"
            disabled={true}
          />
          <CustomTouchableOption
            text="Product based scheme offers"
            iconSource={require("../../../../assets/images/ic_active_offers.webp")}
            screenName="Product based scheme offers"
            disabled={true}
          />
          <CustomTouchableOption
            text="Non-product offers"
            iconSource={require("../../../../assets/images/ic_special_combo_offers.webp")}
            screenName="Special non-product offers"
            disabled={true}
          />
        </View>
        <View style={styles.options}>
          <CustomTouchableOption
            text="Direct order base points"
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
