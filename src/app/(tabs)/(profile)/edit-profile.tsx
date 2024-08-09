import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { width } from "../../../utils/dimensions";
import Buttons from "../../../components/Buttons";
import { useTranslation } from "react-i18next";
import { updateProfile } from "../../../utils/apiservice";
import Field from "../../../components/Field";
import Loader from "../../../components/Loader";
import { z } from "zod";
import { RegistrationSchema } from "../../../utils/schemas/Registration";
import colors from "@/src/utils/colors";
import { editProfileFields } from "./fields/editProfileFields";
import { showToast } from "@/src/utils/showToast";
import { Image } from "expo-image";
import NewPopUp from "@/src/components/NewPopup";
import { Ionicons } from "@expo/vector-icons";
import ImagePickerModal from "@/src/components/ImagePicker";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import {
  ImagePickerSectionInterface,
  PopupSectionInterface,
  SubmitButtonSectionInterface,
} from "@/src/utils/interfaces";
import { STUser } from "@/src/utils/types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { usePopup } from "@/src/hooks/usePopup";

const ImagePickerSection = ({
  profile,
  isImagePickerVisible,
  toggleModal,
}: ImagePickerSectionInterface) => (
  <View style={styles.profileContainer}>
    <View style={{ position: "relative", marginBottom: 16, marginTop: 8 }}>
      <Image
        source={{ uri: profile.Selfie as string }}
        placeholder={{
          uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
        }}
        transition={1000}
        style={styles.profileImage}
        contentFit="cover"
      />
      <TouchableOpacity style={styles.editIconContainer} onPress={toggleModal}>
        <Ionicons name="camera" size={18} color="white" />
      </TouchableOpacity>
      <ImagePickerModal
        isVisible={isImagePickerVisible}
        toggleModal={toggleModal}
        type="profile"
      />
    </View>
  </View>
);

const PopupSection = ({ loader, popup }: PopupSectionInterface) => (
  <View>
    {loader && <Loader isLoading={loader} />}
    <NewPopUp {...popup} />
  </View>
);

const FieldsSection = ({ fields }: any) => (
  <View>
    {fields.map((field: any) => (
      <Field
        id={field.id}
        key={field.id}
        type={field.type}
        data={field.data}
        label={field.label}
        properties={field.properties}
      />
    ))}
  </View>
);

const SubmitButtonSection = ({ onPress }: SubmitButtonSectionInterface) => (
  <View style={styles.submitButtonContainer}>
    <Buttons
      label="Submit"
      onPress={onPress}
      variant="filled"
      width={width / 1.1}
      icon={require("../../../assets/images/arrow.png")}
      iconWidth={50}
      iconHeight={20}
      iconGap={10}
    />
  </View>
);

const EditProfile = () => {
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const { data: popup, setData: setPopup } = usePopup();
  const queryClient = useQueryClient();
  const { data: state } = useQuery({
    queryKey: ["profile"],
    initialData: () => {
      return queryClient.getQueryData(["profile"]) as STUser;
    },
  });

  const toggleModal = () => {
    setIsImagePickerVisible(!isImagePickerVisible);
  };

  const data = [
    { type: "imagePicker" },
    { type: "popup" },
    { type: "fields" },
    { type: "submit" },
  ];

  const renderItem: ListRenderItem<(typeof data)[0]> = ({ item }) => {
    switch (item.type) {
      case "imagePicker":
        return (
          <ImagePickerSection
            profile={state}
            isImagePickerVisible={isImagePickerVisible}
            toggleModal={toggleModal}
          />
        );
      case "popup":
        return <PopupSection loader={loader} popup={popup} />;
      case "fields":
        return <FieldsSection fields={editProfileFields} />;
      case "submit":
        return <SubmitButtonSection onPress={updateuseprofile} />;
      default:
        return null;
    }
  };

  const updateuseprofile = async () => {
    try {
      RegistrationSchema.parse(state);
      showLoader(true);
      const payload = { ...state, Selfie: null };
      const response = await updateProfile(payload);
      const responseData = response.data;
      showLoader(false);
      if (responseData.code === 200) {
        setPopup({
          visible: true,
          numberOfButtons: 1,
          iconType: "Info",
          title: "Profile",
          text: responseData.message,
        });
      } else {
        showToast(responseData.message);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        showToast(`${error.errors[0].message}`);
      } else {
        showLoader(false);
        showToast("Error in updating profile. Please try again");
      }
    } finally {
      showLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 15,
    marginTop: -20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#e91e63",
    borderRadius: 15,
    padding: 5,
  },
  submitButtonContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default EditProfile;
