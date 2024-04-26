import { StyleSheet } from "react-native";
import { height } from "../../../utils/dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    input: {
      padding: 5,
      height: height / 15,
      margin: 20,
      marginTop: 5,
      color: "#D3D3D3",
      borderRadius: 5,
      backgroundColor: "white",
      borderColor: "#D3D3D3",
      borderWidth: 1.5,
      bottom: -5,
      // elevation: 1,
    },
    labelStyles: {
      backgroundColor: "transparent",
      margin: 14,
      color: "red",
    },
  });