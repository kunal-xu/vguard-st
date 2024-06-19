import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";

const END_POSITION = 200;

export default function App() {
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const scratchWidth = useSharedValue(0);
  const scratchHeight = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
      scratchWidth.value = e.translationX;
      scratchHeight.value = e.translationY;
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const maskStyle = useAnimatedStyle(() => ({
    width: scratchWidth.value,
    height: scratchHeight.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <MaskedView
          style={styles.maskContainer}
          maskElement={<Animated.View style={[styles.mask, maskStyle]} />}
        >
          <Image
            source={require("@/src/assets/images/ic_scratch_card_greeting_2.webp")}
            style={styles.scratchImage}
          />
        </MaskedView>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maskContainer: {
    height: "50%",
    width: "50%",
  },
  mask: {
    backgroundColor: "black",
  },
  scratchImage: {
    height: "100%",
    width: "100%",
  },
});
