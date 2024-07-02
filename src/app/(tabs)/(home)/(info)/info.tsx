import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/src/utils/colors";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import NeedHelp from "@/src/components/NeedHelp";
import { useTranslation } from "react-i18next";
import { getInfoDeskBanners } from "@/src/utils/apiservice";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";

const Info = () => {
  const { t } = useTranslation();
  const [imageArray, setImageArray] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);

  const imageUrl = "https://vguardrishta.com/";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getInfoDeskBanners();
      const result = await response.data;
      const ar = result.map((r) => ({ imageUrl: imageUrl + r.imgPath }));
      setImageArray(ar);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            text="strings:v_guard_info"
            iconSource={require("@/src/assets/images/ic_vguard_info.webp")}
            screenName="vguard-info"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:downloads_small"
            iconSource={require("@/src/assets/images/ic_downloads_.webp")}
            screenName="downloads"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:v_guard_product_catalog"
            iconSource={require("@/src/assets/images/ic_vguard_product_catalog.webp")}
            screenName="product-catalouge"
            disabled={false}
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

export default Info;
