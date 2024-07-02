import Buttons from "@/src/components/Buttons";
import colors from "@/src/utils/colors";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const SuccessPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { message } = useLocalSearchParams();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("@/src/assets/images/ic_rewards_gift.png")}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.stats}>
          <Text style={styles.statItem}>
            {(message as string).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.actionButtons}>
          <Buttons
            label={t("Go to Home")}
            variant="outlined"
            onPress={() => router.replace("/(tabs)/(home)/home-screen")}
            width="45%"
          />
          <View style={styles.spacer} />
          <Buttons
            label={t("Scan Again")}
            variant="filled"
            onPress={() => router.dismiss(2)}
            width="45%"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    elevation: 3,
    alignItems: "center",
    width: "90%",
  },
  timeTaken: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 10,
  },
  stats: {
    marginBottom: 10,
  },
  statItem: {
    fontSize: responsiveFontSize(2),
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  actionButtons: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  spacer: {
    width: "10%",
  },
});

export default SuccessPage;
