import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import ImageViewer from "../../components/ImageViewer";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";
import colors from "../../../colors";
import { router } from "expo-router";

export default function GenerateOTP() {
  // const { t, i18n } = useTranslation();
  // function setShowLanguagePicker(arg0: boolean) {
  //   throw new Error("Function not implemented.");
  // }
  // const handleLanguageButtonPress = () => {
  //   setShowLanguagePicker(true);
  // };

  function generateOTP() {
    console.log("Pressed");
    router.navigate("/LoginScreen");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      MobileNo: "",
    },
  });
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.registerUser}>
        <View>
          {/* <Button
            label=""
            theme="primary"
            onPress={handleLanguageButtonPress}
          /> */}
        </View>
        <View style={styles.mainWrapper}>
          <View style={styles.formContainer}>
            <Image
              source={require("../../../assets/group_907.png")}
              style={styles.imageSaathi}
            />
            <Controller
              name="MobileNo"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Mobile Number"
                  placeholder="10 digit mobile number"
                  keyboardType="number-pad"
                />
              )}
            ></Controller>
            <View>
              <Button
                // style={styles.button}
                label="Generate OTP"
                variant="filled"
                onPress={() => generateOTP}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={require("../../../assets/arrow.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <Text style={styles.footergreyText}>{"Powered by"}</Text>
            <Image
              source={require("../../../assets/group_910.png")}
              style={styles.imageVguard}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  registerUser: {
    height: "100%",
    backgroundColor: colors.white,
    display: "flex",
  },
  mainWrapper: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  textHeader: {
    textAlign: "center",
    width: "80%",
    color: colors.grey,
    fontSize: 14,
    fontWeight: "bold",
  },
  mainHeader: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10
  },
  imageSaathi: {
    width: 100,
    height: 98,
    marginBottom: 30,
  },
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: "100%",
    padding: 16,
    flex: 2,
  },
  input: {
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    color: colors.black,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
  },
  or: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 20,
    marginTop: 20,
  },
  tick: {
    height: 15,
    width: 15,
  },
  footergreyText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.grey,
    paddingBottom: 5,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    width: "100%",
    paddingVertical: 10,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  radioButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  containter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginBottom: 50,
  },
  phone: {
    height: 50,
    width: 50,
  },
  greyText: {
    fontSize: 14,
    color: colors.grey,
  },
  otpPhone: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 50,
    justifyContent: "center",
  },
});
