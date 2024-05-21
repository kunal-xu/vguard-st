import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../../colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { ButtonsProps } from "../utils/interfaces";

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
    } else if (variant === "verifyBank") {
      return [styles.bankButton, { width }];
    } else if (variant === "disabled") {
      return [styles.disabledButton, { width }];
    } else if (variant === "blackButton") {
      return [styles.blackButton, { width }];
    } else if (variant === "reduceOpacity") {
      return [styles.disabledColor, { width }];
    } else {
      return [styles.defaultButton, { width }];
    }
  };
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), wrapperCustomStyle]}
      onPress={onPress}
      disabled={
        variant === "disabled" || variant === "reduceOpacity" || disabled
      }
    >
      <View style={[styles.buttonContent, { gap: iconGap }]}>
        <Text
          style={[
            styles.buttonText,
            (variant === "blackButton" || variant === "verifyBank" || variant === 'disabled') &&
              styles.whiteText,
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
    fontSize: responsiveFontSize(1.8),
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
    borderRadius: 5,
    paddingHorizontal: 8,
    borderWidth: 2,
    paddingVertical: 8,
    marginLeft: 10,
    color: "white",
  },
  filledButton: {
    backgroundColor: colors.yellow,
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  bankButton: {
    backgroundColor: "blue",
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
