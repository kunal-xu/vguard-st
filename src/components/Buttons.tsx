import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ButtonsProps } from "../utils/interfaces";
import colors from "../utils/colors";

const Buttons = (props: ButtonsProps) => {
  const {
    label,
    onPress,
    disabled,
    variant,
    width,
    icon,
    iconWidth,
    iconHeight,
    iconGap,
    wrapperCustomStyle = {},
  } = props;
  const getButtonStyle = () => {
    if (variant === "outlined") {
      return [styles.outlinedButton, { width }];
    } else if (variant === "filled") {
      return [styles.filledButton, { width }];
    } else if (variant === "verify") {
      return [styles.verifyButton, { width }];
    } else {
      return [styles.defaultButton, { width }];
    }
  };
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), wrapperCustomStyle]}
      onPress={onPress}
    >
      <View style={[styles.buttonContent, { gap: iconGap }]}>
        <Text
          style={[
            styles.buttonText,
              variant === "verify" && styles.whiteText,
          ]}
        >
          {label}
        </Text>
        <Image
          source={icon}
          style={[styles.icon, { width: iconWidth, height: iconHeight }]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlignVertical: "top",
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },
  whiteText: {
    color: "white",
  },
  blueText: {
    color: "black",
  },
  yellowText: {
    color: colors.yellow,
  },
  outlinedButton: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.yellow
  },
  filledButton: {
    backgroundColor: colors.yellow,
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  verifyButton: {
    backgroundColor: "#336699",
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  disabledButton: {
    backgroundColor: "green",
  },
  disabledColor: {
    backgroundColor: "#ffe8ad",
  },
  blackButton: {
    backgroundColor: "black",
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    flex: 1,
  },
  defaultButton: {
    backgroundColor: colors.yellow,
  },
  icon: {
    marginLeft: 5,
  },
});

export default Buttons;
