import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  Linking,
} from "react-native";
import colors from "../utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NewPopUp {
  visible: boolean;
  numberOfButtons: number;
  button1Action: () => void;
  button2Action: () => void;
  button1Text: string;
  button2Text: string;
  text: string;
  iconType: string;
  title: string;
}

const NewPopUp = ({
  visible,
  numberOfButtons = 1,
  button1Action,
  button2Action,
  button1Text,
  button2Text,
  text,
  iconType,
  title,
}: NewPopUp) => {
  const replaceLinkWithComponent = (content) => {
    const textContent = String(content);
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = textContent.split(urlRegex);

    return (
      <Text style={styles.text}>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <Text
                key={index}
                style={styles.link}
                onPress={() => Linking.openURL(part)}
              >
                Play Store
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Alert":
        return (
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={56}
            color={colors.yellow}
          />
        );
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {getIcon(iconType)}
          </View>
          {replaceLinkWithComponent(text)}
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.3 : 1 },
                styles.button,
                styles.button1,
              ]}
              onPress={button1Action}
            >
              <Text style={[styles.buttonText, styles.button1Text]}>
                {button1Text}
              </Text>
            </Pressable>
            {numberOfButtons === 2 && (
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.3 : 1 },
                  styles.button,
                  styles.button2,
                ]}
                onPress={button2Action}
              >
                <Text style={styles.buttonText}>{button2Text}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  link: {
    fontSize: responsiveFontSize(2),
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    width: "80%",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 42,
    paddingTop: 32,
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: colors.black,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  button1: {
    backgroundColor: "white",
    borderColor: colors.yellow,
    borderWidth: 2,
  },
  button1Text: {
    color: colors.black,
  },
  button2: {
    backgroundColor: colors.yellow,
  },
  buttonText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
});

export default NewPopUp;
