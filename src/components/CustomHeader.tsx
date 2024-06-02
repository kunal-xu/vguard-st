import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const CustomHeader = ({ title }) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.headerContainer, { height: headerHeight }]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFD700", // Custom background color
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18, // Adjust the font size as needed
  },
});

export default CustomHeader;
