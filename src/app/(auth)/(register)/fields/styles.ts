import { StyleSheet } from "react-native";
import { height } from "@/src/utils/dimensions";
import { CustomLabelProps } from "react-native-floating-label-input";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    height: height / 16,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 6,
    margin: 18,
    marginTop: 4,
    borderCurve: "circular",
  },
  labelStyles: {
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  inputStyles: {
    color: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
  },
});

export const customLabelStyles: CustomLabelProps = {
  colorFocused: "black",
  colorBlurred: "black",
  fontSizeFocused: 16,
};
