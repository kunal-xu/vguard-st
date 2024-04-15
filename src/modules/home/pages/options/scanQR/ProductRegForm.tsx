import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import colors from "../../../../../../colors";
import Popup from "../../../../../components/Popup";
import {  useState } from "react";
import { useTranslation } from "react-i18next";
import Buttons from "../../../../../components/Buttons";
import arrowIcon from "../../../../../assets/images/arrow.png";
// import arrow from "../../../../../assets/images/"
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { height, width } from '../../../../../utils/dimensions';
import { PincodedetailList, fetchPinCodeData, getCustDetByMobile, productgenerateOtp } from "../../../../../utils/apiservice";
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductRegistrationForm = ({navigation}) => {
  const { t } = useTranslation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [pincode, setPincode] = useState('');
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    email: "",
    altContactNo: "",
    landmark: "",
    pincode: "",
    state: "",
    district: "",
    city: "",
    address: "",
    category: "",
    dealerName: "",
    dealerAddress: "",
    dealerPincode: "",
    dealerState: "",
    dealerDistrict: "",
    dealerCity: "",
    dealerContactNo: "",
  });
  
  const getDetails = async () => {
    try {
      if (contactNo.length !== 10) {
        Snackbar.show({
          text: "Contact number must be 10 digits",
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      const response = await getCustDetByMobile(contactNo);
      const result = await response.data;

      if (result) {
        const customerDetails = result;

        setCustomerFormData((prevData) => ({
          ...prevData,
          name: customerDetails.name || "",
          email: customerDetails.email || "",
          altContactNo: customerDetails.alternateNo || "",
          landmark: customerDetails.landmark || "",
          pincode: customerDetails.pinCode || "",
          state: customerDetails.state || "",
          district: customerDetails.district || "",
          city: customerDetails.city || "",
          address: customerDetails.currAdd || "",
          category: customerDetails.dealerCategory || "",
          dealerName: customerDetails.dealerName || "",
          dealerAddress: customerDetails.dealerAdd || "",
          dealerPincode: customerDetails.dealerPinCode || "",
          dealerState: customerDetails.dealerState || "",
          dealerDistrict: customerDetails.dealerDist || "",
          dealerCity: customerDetails.dealerCity || "",
          dealerContactNo: customerDetails.dealerNumber || "",
        }));

        console.log("Customer details set:", customerDetails);
      } else {
        console.error("Invalid response structure:", result);
      }

      return result;
    } catch (error) {
      console.error("Error Fetching Customer Details:", error);
    }
  };

  function pinocdefeting(text) {

    if (text.length == 6) {


      fetchPincodeSuggestions(text);

      setOpen(true)
    }
    setPincode(text);
  }

  const fetchPincodeSuggestions = async (pincode) => {

    try {

      const suggestionData = await fetchPinCodeData(pincode);

      if (Array.isArray(suggestionData) && suggestionData.length > 0) {

        const filteredSuggestions = suggestionData.filter((item) => (
          item.pinCode !== null
        ));
        setSuggestions(filteredSuggestions);

        console.log("********IN FETCHPINCODESUGGESTION*************", pincode);
        // setPincode(pincode);
        //setIsLoading(true);
        if (pincode.length == 6) {
          fetchDataForPinCode1(pincode);
        }



      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    finally {

      setLoading(false);
    }
  };

  function fetchDataForPinCode1(pincode) {
    setLoading(true);

    fetchPinCodeData(pincode)
      .then(data => {
        const pincodeid = data[0].pinCodeId;
        console.log('Pin Code Data:', pincodeid);
        return PincodedetailList(pincodeid);
      })
      .then(secondData => {

        setCustomerFormData((prevData)=>({
            ...prevData,
            district:secondData.distName,
            city:secondData.cityName,
            state:secondData.stateName
        }))
      })
      .catch(error => {
        console.error('Error in Page 1:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handleProceed = async () => {
    try {
      let body = {
        mobile: contactNo,
        eventType: "Warranty",
      };

      let otpResponse = await productgenerateOtp(body);
      otpResponse = await otpResponse.data;
      await AsyncStorage.setItem(
        "registerWarrantyData",
        JSON.stringify(customerFormData)
      );
      navigation.navigate("Product Registration");
    } catch (submitError) {
      console.log("Internal Error: ", submitError);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:contact_number")}
              value={contactNo}
              placeholderTextColor={colors.grey}
              onChangeText={(value) => setContactNo(value)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonGetDetails}>
            <Buttons
              label={t("strings:get_details")}
              variant="filled"
              onPress={() => getDetails()}
              width="100%"
              iconHeight={10}
              iconWidth={30}
              iconGap={30}
              icon={arrowIcon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:lbl_name_mandatory")}
              placeholderTextColor={colors.grey}
              value={customerFormData.name}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  name: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:email")}
              value={customerFormData.email}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  email: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:alternate_contact_number")}
              value={customerFormData.altContactNo}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  altContactNo: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:lbl_landmark")}
              value={customerFormData.landmark}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  landmark: value,
                }))
              }
            />
          </View>
          <DropDownPicker
            mode="BADGE"
            showBadgeDot={true}
            searchable={true}
            searchPlaceholder="Enter Pin Code"
            loading={isLoading}
            label={value}
            placeholder={
              (pincode == '' ||pincode ===null || pincode === undefined )
                ? "Pin Code"
                : `${pincode}`
            }
            searchablePlaceholder="Search Pincode"
            translation={t("auth:newuser:Secondpagepincode")}
            // placeholder={value}
            searchTextInputProps={{
              maxLength: 6,
              keyboardType: "number-pad",
            }}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
              decelerationRate: "fast",
            }}
            open={open}
            items={suggestions.map((item) => ({
              label: item.pinCode,
              value: item.pinCode,
            }))}
            setOpen={setOpen}
            value={pincode}
            onChangeItem={(item) => {
              setPincode(item.value);
              // pinocdefeting(item.value);
              //console.log(value);
            }}
            onChangeSearchText={(text) => pinocdefeting(text)}
            dropDownContainerStyle={{
              width: width / 1.1,
              height: height / 5,
              // padding: 10,
              left: 3,
              top: 50,
              borderWidth: 2,
              borderTopWidth: 0,
              borderColor: "#d3d3d3",
              justifyContent: "center",
              elevation: 0,
              backgroundColor: "#ffffff",
            }}
            style={{
              backgroundColor: "white",

              elevation: 50,
              borderWidth: 2,
              width: width / 1.1,
              height: height/20,
              alignSelf: "center",
              elevation: 0,
              borderColor: "#D3D3D3",
            }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:lbl_state")}
              value={customerFormData.state}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  state: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:district")}
              value={customerFormData.district}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  district: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:lbl_city_mandatory")}
              value={customerFormData.city}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  city: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:address_mandatory")}
              value={customerFormData.address}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  address: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={customerFormData.category}
              onValueChange={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  category: value,
                }))
              }
              
              style={styles.picker}
            >
              <Picker.Item
                key={"Customer"}
                label={"Customer"}
                value={"Customer"}
              />
              <Picker.Item
                key={"Sub-Dealer"}
                label={"Sub-Dealer"}
                value={"Sub-Dealer"}
              />
            </Picker>
            <Image
              source={require("../../../../../assets/images/ic_ticket_drop_down2.png")}
              style={{ width: "5%", height: "100%", marginRight: 15 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_name")}
              value={customerFormData.dealerName}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerName: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_address")}
              value={customerFormData.dealerAddress}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerAddress: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_pincode")}
              value={customerFormData.dealerPincode}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerPincode: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_state")}
              value={customerFormData.dealerState}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerState: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_district")}
              value={customerFormData.dealerDistrict}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerDistrict: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_city")}
              value={customerFormData.dealerCity}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerCity: value,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:dealer_contact_no")}
              value={customerFormData.dealerContactNo}
              placeholderTextColor={colors.grey}
              onChangeText={(value) =>
                setCustomerFormData((prevData) => ({
                  ...prevData,
                  dealerContactNo: value,
                }))
              }
            />
          </View>
        </View>
        <View style={styles.button}>
          <Buttons
            label={t("strings:next")}
            variant="filled"
            onPress={() => handleProceed()}
            width="100%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
            icon={arrowIcon}
          />
        </View>
      </View>
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        >
          {popupContent}
        </Popup>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5,
  },
  textHeader: {
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
    fontWeight: "bold",
  },
  textSubHeader: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: "bold",
  },
  container: {
    height: responsiveHeight(8),
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.white,
    width: "100%",
    textAlign: "center",
  },
  inputContainer: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(5),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    // fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonGetDetails: {
    alignItems: "center",
  },
  picker: {
    width: "90%",
    color: colors.grey,
  },
  labelPicker: {
    color: colors.grey,
    fontWeight: "bold",
  },
  modalcontainer: { alignSelf: "center", backgroundColor: "rgba(0,0,0,0.7)" },
});

export default ProductRegistrationForm;
