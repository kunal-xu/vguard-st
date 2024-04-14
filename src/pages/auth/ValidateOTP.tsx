import React from "react";
import { View, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import ImageViewer from "../../components/ImageViewer";

const placeholderImageSource = require("../../../assets/rishta_retailer_logo.webp")

export default function ValidateOTP() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      OTP: "",
    },
  });
  return (
    <>
      <View>
        <ImageViewer placeholderImageSource={placeholderImageSource} selectedImage={undefined}/>
        <Text>
          Enter the otp
        </Text>
        <Controller
          name="OTP"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter the otp"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        ></Controller>
        <Button label='Submit' theme={undefined} onPress={undefined}/>
      </View>
    </>
  );
}
