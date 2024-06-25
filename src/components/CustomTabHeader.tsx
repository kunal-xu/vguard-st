import { useTranslation } from "react-i18next";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LanguagePicker from "./LanguagePicker";

export default function CustomTabHeader() {
  const { t, i18n } = useTranslation();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleLanguageButtonPress = () => {
    setShowLanguagePicker(true);
  };

  const handleCloseLanguagePicker = () => {
    setShowLanguagePicker(false);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 32,
        marginTop: 16,
        marginRight: 32,
      }}
    >
      <View
        style={{
          height: responsiveHeight(3),
          flexDirection: "row",
        }}
      >
        <Pressable
          style={styles.languageContainer}
          onPress={handleLanguageButtonPress}
        >
          <Ionicons name="language" size={responsiveHeight(3)} color="black" />
          <Text
            style={{
              color: colors.black,
              borderBottomWidth: 2,
              fontSize: responsiveFontSize(1.7),
              marginLeft: 4,
            }}
          >
            {t("strings:language")}
          </Text>
        </Pressable>
      </View>
      <Image
        source={require("../assets/images/group_910.png")}
        contentFit="contain"
        contentPosition={"right"}
        style={{
          flex: 1,
          height: responsiveHeight(4),
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLanguagePicker}
        onRequestClose={handleCloseLanguagePicker}
      >
        <View style={styles.languagePickerContainer}>
          <LanguagePicker onCloseModal={handleCloseLanguagePicker} />
          <TouchableOpacity onPress={handleCloseLanguagePicker}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languagePickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
    backgroundColor: colors.yellow,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});
