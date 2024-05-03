import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "../../../../colors";
import { getFile, getUser } from "../../../utils/apiservice";

import { useTranslation } from "react-i18next";
import { getImages } from "../../../utils/FileUtils";
import { useData } from "../../../hooks/useData";

const Profile = ({ navigation }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useData();
  const baseURL = "https://www.vguardrishta.com/img/appImages/Profile/";
  const ecardURL = "https://www.vguardrishta.com/img/appImages/eCard/";
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showPanDetails, setShowPanDetails] = useState(false);
  const [showNomineeDetails, setShowNomineeDetails] = useState(false);

  // const [data, setData] = useState([]);
  // const [userData, setUserData] = useState({
  //   userName: "",
  //   userCode: "",
  //   pointsBalance: "",
  //   redeemedPoints: "",
  //   userImage: "",
  //   userRole: "",
  // });
  // const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getUser();
        const responseData = response.data;
        dispatch({
          type: "GET_ALL_FIELDS",
          payload: {
            value: responseData,
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const labels = [
    "Gender",
    "Date of Birth",
    "Contact",
    "Email",
    "Aadhar",
    "PAN",
    "Bank Details",
    "TDS Slab",
  ];
  const renderField = (fieldName) => {
    const fieldMap = {
      "Date of Birth": "DOB",
      Contact: "Contact",
      Gender: "Gender",
      Email: "EmailId",
      Aadhar: "Aadhar",
      PAN: "PAN",
      "Bank Details": "BankDetail",
      "TDS Slab": "TDSSlab",
    };

    // if (fieldName in fieldMap) {
    //   const mappedField = fieldMap[fieldName];
    //   if (mappedField in state) {
    //     const fieldValue = state[mappedField];
    //     return fieldValue === true
    //       ? "Yes"
    //       : fieldValue === false
    //       ? "No"
    //       : fieldValue;
    //   } else {
    //     return "";
    //   }
    // } else
    if (fieldName === "PAN") {
      const hasPanDetails = state.PAN;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasPanDetails ? state.PAN : "N/A"}
              </Text>
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
                  <Text style={styles.dataSmall}>{state.PAN}</Text>
                </View>
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName === "Email") {
      const hasPanDetails = state.EmailId;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasPanDetails ? state.EmailId : "N/A"}
              </Text>
            </View>
          </View>
        </>
      );
    } else if (fieldName === "Aadhar") {
      const hasPanDetails = state.Aadhar;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasPanDetails ? state.Aadhar : "N/A"}
              </Text>
            </View>
          </View>
        </>
      );
    }else if (fieldName === "Date of Birth") {
      const hasPanDetails = state.DOB;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasPanDetails ? state.DOB : "N/A"}
              </Text>
            </View>
          </View>
        </>
      );
    }
    else if (fieldName === "TDS Slab") {
      const hasPanDetails = state.TDSSlab;
      return (
        <>
          <View>
            <View style={styles.databox}>
              <Text style={styles.yesorno}>
                {hasPanDetails ? state.TDSSlab : "N/A"}
              </Text>
            </View>
          </View>
        </>
      );
    }
    else if (fieldName === "Bank Details") {
      const hasBankDetails = state.BankDetail && state.BankDetail.bankAccNo;
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
                    {state.BankDetail.bankAccNo}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Bank Acc Holder Name:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {state.BankDetail.bankAccHolderName}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>Bank Acc Type: </Text>
                  <Text style={styles.dataSmall}>
                    {state.BankDetail.bankAccType}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>
                    Bank Name and Branch:{" "}
                  </Text>
                  <Text style={styles.dataSmall}>
                    {state.BankDetail.bankNameAndBranch}
                  </Text>
                </View>
                <View style={styles.smallDataRow}>
                  <Text style={styles.dataSmallLabel}>IFSC code: </Text>
                  <Text style={styles.dataSmall}>
                    {state.BankDetail.bankIfsc}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName === "Nominee Details") {
      const hasNomineeDetails = () => {
        if (
          state.BankDetail.nomineeDob ||
          state.BankDetail.nomineeEmail ||
          state.BankDetail.nomineeMobileNo ||
          state.BankDetail.nomineeRelation
        )
          return true;
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
                {state.BankDetail?.nomineeAccNo && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>Nominee Acc No: </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeAccNo}
                    </Text>
                  </View>
                )}
                {state.BankDetail?.nomineeName && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>
                      Nominee Acc Holder Name:{" "}
                    </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeName}
                    </Text>
                  </View>
                )}
                {state.BankDetail?.nomineeDob && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>
                      Nominee Date of Birth:{" "}
                    </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeDob}
                    </Text>
                  </View>
                )}
                {state.BankDetail?.nomineeMobileNo && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>
                      Nominee Mobile Number:{" "}
                    </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeMobileNo}
                    </Text>
                  </View>
                )}
                {state.BankDetail?.nomineeEmail && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>
                      Nominee Email ID:{" "}
                    </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeEmail}
                    </Text>
                  </View>
                )}
                {state.BankDetail?.nomineeRelation && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>
                      Nominee Relation:{" "}
                    </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeRelation}
                    </Text>
                  </View>
                )}

                {state.BankDetail?.nomineeAdd && (
                  <View style={styles.smallDataRow}>
                    <Text style={styles.dataSmallLabel}>Nominee Address: </Text>
                    <Text style={styles.dataSmall}>
                      {state.BankDetail?.nomineeAdd}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </>
      );
    } else if (fieldName in state) {
      const fieldValue = state[fieldName];
      return fieldValue === true
        ? "Yes"
        : fieldValue === false
        ? "No"
        : fieldValue;
    } else {
      return "N/A";
    }
  };

  // const openEVisitingCard = () => {
  //   Linking.openURL(ecardURL);
  // };

  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>
        <View style={styles.ImageProfile}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp?pid=ImgGn",
            }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={styles.buttonText}>{t("strings:edit_profile")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileText}>
        <Text style={styles.textDetail}>{state.Name}</Text>
        <Text style={styles.textDetail}>{state.RishtaID}</Text>
        {/* <TouchableOpacity onPress={openEVisitingCard}>
          <Text style={styles.viewProfile}>{t("strings:view_e_card")}</Text>
        </TouchableOpacity> */}
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
    shadowColor: colors.lightYellow,
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
