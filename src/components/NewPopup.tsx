import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import colors from "../utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePopup } from "../hooks/usePopup";

interface NewPopUp {
  visible?: boolean;
  numberOfButtons?: number;
  button2Action?: () => void;
  button2Text?: string;
  text?: string;
  iconType?: string;
  title?: string;
}

const NewPopUp = ({
  visible,
  numberOfButtons = 1,
  button2Action,
  button2Text,
  text,
  iconType,
  title,
}: NewPopUp) => {
  const { resetData: resetPopupData } = usePopup();
  const replaceLinkWithComponent = (content: string) => {
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
            color="red"
          />
        );
      case "Info":
        return (
          <MaterialCommunityIcons
            name="information-outline"
            size={56}
            color="blue"
          />
        );
      case "AccountCancel":
        return (
          <MaterialCommunityIcons name="cancel" size={56} color="orange" />
        );
      case "AccountVerified":
        return (
          <MaterialCommunityIcons
            name="account-check-outline"
            size={56}
            color={"green"}
          />
        );
      case "Check":
        return (
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={56}
            color="green"
          />
        );
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
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
            {getIcon(iconType as string)}
          </View>
          {replaceLinkWithComponent(text as string)}
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.3 : 1 },
                styles.button,
                styles.button1,
              ]}
              onPress={resetPopupData}
            >
              <Text style={[styles.buttonText, styles.button1Text]}>
                {"Dismiss"}
              </Text>
            </Pressable>
            {numberOfButtons === 2 && (
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.3 : 1 },
                  styles.button,
                  styles.button2,
                ]}
                onPress={() => {
                  if (button2Action) {
                    resetPopupData();
                    button2Action();
                  }
                }}
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
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 32,
    paddingTop: 32,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
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
    borderRadius: 2,
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
