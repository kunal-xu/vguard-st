import React from "react";
import { View, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import ImageViewer from "../../components/ImageViewer";

const placeholderImageSource = require("../../../assets/rishta_retailer_logo.webp")

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
  });
  return (
    <>
      <View>
        <ImageViewer placeholderImageSource={placeholderImageSource} selectedImage={undefined}/>
        <Text>
          Login
        </Text>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter the username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter the password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Button label='Submit' theme={undefined} onPress={undefined}/>
      </View>
    </>
  );
}
