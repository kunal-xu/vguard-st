import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import colors from "../utils/colors";
import { Image } from "expo-image";

function PointsCard({ points }: { points?: number }) {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal transparent={true} animationType="slide" visible={showModal}>
      <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Image
                source={require("@/src/assets/images/ic_rewards_gift.png")}
                style={styles.image}
                contentFit="contain"
              />
              <Text style={styles.title}>
                {points
                  ? `You have won ${points} bonus points.`
                  : "Better luck next time."}
              </Text>
            </View>
            <View style={styles.modalFooter}>
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Close</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

function ScratchView() {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <Image
          source={require("@/src/assets/images/scratch_foreground.png")}
          style={styles.image}
          contentFit="contain"
        />
      </View>
    </Modal>
  );
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get("screen");

export default function ScratchCard({ points }: { points?: number }) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, styles.box]}></Animated.View>

      </GestureDetector>
    </GestureHandlerRootView>
    // <MaskedView
    //   style={{ flex: 1, flexDirection: "row", height: "100%" }}
    //   maskElement={<PointsCard />}
    // >
    //   <ScratchView />
    // </MaskedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  box: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    elevation: 10,
  },
  modalBody: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    height: "35%",
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  modalFooter: {
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.yellow,
    borderRadius: 5,
    borderColor: colors.yellow,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});