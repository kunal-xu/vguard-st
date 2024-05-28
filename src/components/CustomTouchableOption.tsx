import React, { useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Popup from "./Popup";
import { CustomTouchableOptionsProps } from "../utils/interfaces";
import colors from "../utils/colors";
import { width } from "../utils/dimensions";

const CustomTouchableOption = ({
  text,
  iconSource,
  screenName,
  disabled = false,
}: CustomTouchableOptionsProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handlePress = () => {
    if (disabled == true) {
      setPopupVisible(true);
      setPopupContent("Coming Soon!");
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1.0,
          },
          styles.oval,
          disabled && styles.disabledOval,
        ]}
        onPress={handlePress}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={iconSource}
            style={styles.optionIcon}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: colors.lightYellow,
            height: responsiveHeight(4),
            justifyContent: "center",
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            padding: 2,
          }}
        >
          <Text style={[styles.nav, disabled && styles.disabledText]}>
            {t(text)}
          </Text>
        </View>
      </Pressable>
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        >
          {popupContent}
        </Popup>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  oval: {
    flex: 1,
    justifyContent: "space-between",
    height: responsiveHeight(16),
    width: responsiveWidth(24),
    maxWidth: responsiveWidth(24),
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 16,
  },
  optionIcon: {
    width: responsiveHeight(7),
    height: responsiveHeight(7),
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledOval: {
    opacity: 0.9,
  },
  disabledImage: {
    filter: "grayscale(100%)",
  },
  disabledText: {
    color: colors.grey,
  },
});

export default CustomTouchableOption;
