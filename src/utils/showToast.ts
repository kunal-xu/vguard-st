import Toast from "react-native-root-toast";

export function showToast(message: string) {
  Toast.show(message, {
    containerStyle: {
      backgroundColor: "black",
      borderRadius: 20,
      paddingHorizontal: 24,
      paddingVertical: 12,
      marginHorizontal: 20,
      marginBottom: 50,
    },
    textStyle: {
      color: "#fff",
      fontSize: 14,
    },
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
