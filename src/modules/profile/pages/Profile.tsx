import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "../../../../colors";
import { getFile, getUserProfile } from "../../../utils/apiservice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { getImages } from "../../../utils/FileUtils";

const Profile = ({ navigation }) => {
  const { t } = useTranslation();

  const baseURL = "https://www.vguardrishta.com/img/appImages/Profile/";
  const ecardURL = "https://www.vguardrishta.com/img/appImages/eCard/";
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showPanDetails, setShowPanDetails] = useState(false);
  const [showNomineeDetails, setShowNomineeDetails] = useState(false);

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    userCode: "",
    pointsBalance: "",
    redeemedPoints: "",
    userImage: "",
    userRole: "",
  });
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("USER").then((r) => {
      const user = JSON.parse(r as string);
      setData(r)
      
      // getUserProfile()
      //   .then((response) => response.data)
      //   .then((responseData) => {
      //     setData(responseData);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching data:", error);
      //   });
    });
  }, []);

  // useEffect(() => {
  //   if (userData.userRole && userData.userImage) {
  //     const setProfileImg = async () => {
  //       try {
  //         const profileImage =  getImages(
  //           userData.userImage,
  //           "PROFILE",
  //         );
  //         console.log(profileImage)
  //         setProfileImage(profileImage);
  //       } catch (error) {
  //         console.log("Error while fetching profile image:", error);
  //       }
  //     };

  //     setProfileImg();
  //   }
  // }, [userData.userRole, userData.userImage]);

  const labels = [
    "Gender",
    "Date of Birth",
    "Contact",
    "Email",
    "Aadhar",
    "PAN",
    "Bank Details",
  ];
  const renderField = (fieldName) => {
    const fieldMap = {
      "Date of Birth": "DOB",
      "Contact": "Contact",
      "Gender": "Gender",
      "Email": "EmailId",
      "Aadhar": "Aadhar",
      "PAN": "PAN",
      "Bank Details": "BankDetail"
    };

    if (fieldName in fieldMap) {
      const mappedField = fieldMap[fieldName];
      if (mappedField in data) {
        const fieldValue = data[mappedField];
        return fieldValue === true
          ? "Yes"
          : fieldValue === false
          ? "No"
          : fieldValue;
      } else {
        return "";
      }
    } else if (fieldName === "PAN") {
      const hasPanDetails = data.PAN;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>{hasPanDetails ? data.PAN : "N/A"}</Text>
              {hasPanDetails && (
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => setShowPanDetails(!showPanDetails)}
                >
                  <Image
                    source={require("../../../assets/images/ic_ticket_drop_down2.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {showPanDetails && (
              <View style={styles.smallDataBox}>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Pan Card No: </Text>
                  <Text style={styles.dataSmall}>
                    {data.PAN}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName === "Bank Details") {
      const hasBankDetails = data.BankDetail && data.BankDetail.bankAccNo;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasBankDetails ? "Yes" : "No"}
              </Text>
              {hasBankDetails && (
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => setShowBankDetails(!showBankDetails)}
                >
                  <Image
                    source={require("../../../assets/images/ic_ticket_drop_down2.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {showBankDetails && (
              <View style={styles.smallDataBox}>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Bank Acc No: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail.bankAccNo}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Bank Acc Holder Name:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail.bankAccHolderName}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Bank Acc Type: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail.bankAccType}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Bank Name and Branch:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail.bankNameAndBranch}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    IFSC code:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail.bankIfsc}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName === "Nominee Details") {
      const hasNomineeDetails = () => {
        if(data?.BankDetail?.nomineeDob || data?.BankDetail?.nomineeEmail || data?.BankDetail?.nomineeMobileNo ||  data?.BankDetail?.nomineeRelation)
        return true
       
      };
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasNomineeDetails ? "Yes" : "No"}
              </Text>
              {hasNomineeDetails && (
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => setShowNomineeDetails(!showNomineeDetails)}
                >
                  <Image
                    source={require("../../../assets/images/ic_ticket_drop_down2.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {showNomineeDetails && (
              <View style={styles.smallDataBox}>
                { data?.BankDetail?.nomineeAccNo && <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Nominee Acc No: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeAccNo}
                  </Text>
                </View>}
                { data?.BankDetail?.nomineeName && <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Nominee Acc Holder Name:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeName}
                  </Text>
                </View>}
                { data?.BankDetail?.nomineeDob && <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Nominee Date of Birth:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeDob}
                  </Text>
                </View>}
                { data?.BankDetail?.nomineeMobileNo && <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Nominee Mobile Number:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeMobileNo}
                  </Text>
                </View>}
                { data?.BankDetail?.nomineeEmail &&  <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Nominee Email ID: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeEmail}
                  </Text>
                </View>}
                { data?.BankDetail?.nomineeRelation &&  <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Nominee Relation: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeRelation}
                  </Text>
                </View>}

                { data?.BankDetail?.nomineeAdd &&  <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Nominee Address: </Text>
                  <Text style={styles.dataSmall}>
                    {data.BankDetail?.nomineeAdd}
                  </Text>
                </View>}
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName in data) {
      const fieldValue = data[fieldName];
      return fieldValue === true
        ? "Yes"
        : fieldValue === false
        ? "No"
        : fieldValue;
    } else {
      return "N/A";
    }
  };

  const openEVisitingCard = () => {
    Linking.openURL(ecardURL + data.ecardPath);
  };

  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>
        <View style={styles.ImageProfile}>
          <Image
            source={{ uri: profileImage }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        {/* <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={styles.buttonText}>{t("strings:edit_profile")}</Text>
        </TouchableHighlight> */}
      </View>
      <View style={styles.profileText}>
        <Text style={styles.textDetail}>{data.Name}</Text>
        <Text style={styles.textDetail}>{data.RishtaID}</Text>
        <TouchableOpacity onPress={openEVisitingCard}>
          <Text style={styles.viewProfile}>{t("strings:view_e_card")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        {labels.map((label, index) => (
          <View style={styles.labelDataContainer}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.data}>{renderField(label)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.white,
  },
  ImageProfile: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textName: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(2),
  },
  label: {
    color: colors.grey,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(3),
    fontWeight: "bold",
  },
  textDetail: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    fontWeight: "bold",
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
  },
  data: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(3),
    textAlign: "right",
    fontWeight: "bold",
  },
  dataSmall: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    textAlign: "right",
    fontWeight: "bold",
    maxWidth: responsiveWidth(50),
  },
  dataSmallLabel: {
    color: colors.grey,
    fontSize: responsiveFontSize(1.5),
    textAlign: "right",
    fontWeight: "bold",
  },
  smallDataBox: {
    backgroundColor: colors.lightYellow,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  smallDataRow: {
    flexDirection: "row",
    textAlign: "right",
    justifyContent: "flex-end",
    width: responsiveWidth(50),
    flexWrap: "wrap",
  },
  yesorno: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    textAlign: "right",
    alignSelf: "center",
    fontWeight: "bold",
  },
  databox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profileText: {
    marginTop: responsiveHeight(2),
  },
  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 5,
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.5),
  },
  detailsContainer: {
    flexDirection: "column",
    marginBottom: 50,
  },
  labelDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default Profile;
