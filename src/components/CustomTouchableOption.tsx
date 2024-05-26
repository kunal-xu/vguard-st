import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import colors from "../utils/colors";
import Popup from "./Popup";
import { CustomTouchableOptionsProps } from "../utils/interfaces";
import { height, width } from "../utils/dimensions";

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
        style={[styles.oval, disabled && styles.disabledOval]}
        onPress={handlePress}
      >
        <View
          style={[styles.optionIcon, disabled && styles.disabledOptionIcon]}
        >
          <Image
            source={iconSource}
            style={[
              { flex: 1, width: undefined, height: undefined },
              disabled && styles.disabledImage,
            ]}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.nav, disabled && styles.disabledText]}>
          {t(text)}
        </Text>
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
    padding: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: height / 12,
    width: width / 8,
    maxWidth: width / 8,
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 6,
  },
  optionIcon: {
    width: 5,
    height: 5,
    marginBottom: 20,
  },
  nav: {
    color: colors.black,
    fontSize: 15,
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
