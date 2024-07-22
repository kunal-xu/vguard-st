import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { CustomTouchableOptionsProps } from "../utils/interfaces";
import colors from "../utils/colors";
import { useNavigation } from "expo-router";
import usePopup from "../hooks/usePopup";
import NewPopUp from "./NewPopup";

const CustomTouchableOption = ({
  text,
  iconSource,
  screenName,
  disabled = false,
}: CustomTouchableOptionsProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    popUp,
    setPopUp,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    cleanupPopUp,
  } = usePopup();

  const handlePress = () => {
    if (disabled == true) {
      setPopUp(true);
      setPopUpIconType("Info");
      setPopUpTitle(t("Information"));
      setPopupText("Coming Soon!");
    } else {
      navigation.navigate(screenName as never);
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
            height: responsiveHeight(4.5),
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
      <NewPopUp
        visible={popUp}
        button1Action={() => cleanupPopUp()}
        button1Text={"Dismiss"}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
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
    width: responsiveHeight(6),
    height: responsiveHeight(5),
  },
  nav: {
    width: "100%",
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.5),
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
