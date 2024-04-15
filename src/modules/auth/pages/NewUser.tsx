import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import Buttons from "../../../components/Buttons";
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import { newUserFields } from '../fields/newUserFields';
import Field from '../../../components/Field';
import { NavigationProps } from '../../../utils/interfaces';
import React from 'react';

const NewUser = ({ navigation }: NavigationProps) => {
  // console.log('====================================');
  // console.log(route.params);
  // console.log('====================================');
  // const { passedNo, jobprofession, preferedLanguage } = route.params;
  //  setSelectedLanguage(route.params.preferedLanguage);
  //  console.log("====>>>>", preferedLanguage);
  // console.log("====>>>>", jobprofession);
  // const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState();
  // const [citylistpicker, setcitylistpicker] = useState([]);
  // const [districtid, setdistrictid] = useState('');
  // const [gender, setGender] = useState('Select Gender*');
  // const [email, setemail] = useState('');
  // const [number, setNumber] = useState();
  // const [whatapp, setwhatapp] = useState();
  // const [whatappyes, setwhatappyes] = useState('Select WhatApp contact same as above ?');
  // const [address, setaddress] = useState('');
  // const [street, setstreet] = useState('');
  // const [landmark, setlandmark] = useState('');
  // const [name, setname] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [serchedpinocode, setserchedpinocode] = useState()
  // const [selectedState, setSelectedState] = useState();
  // const [selectedDistrict, setSelectedDistrict] = useState('');
  // const [selectedCity, setSelectedCity] = useState('');
  // const [suggestions, setSuggestions] = useState([]);
  // const [pincodeid, setpincodeid] = useState('');
  // const [permananetsateid, setpermananetsatedid] = useState('');
  // const [permananetdistrictId, setpermananetdistrictId] = useState('');
  // const [permananetcityid, setpermananetcityid] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' }
  // ]);

  // const [otherCity, setOtherCity] = useState(null)

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState();

  // const [loading, setLoading] = useState(false);
  // const [selectedDate, setSelectedDate] = useState();
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const handleDateChange = (event, selectedDate) => {
  //   if (event.type === 'set') {
  //     setSelectedDate(selectedDate);
  //     //setShowDatePicker(false);
  //   }
  //   setShowDatePicker(false);
  // };

  // const handleShowDatePicker = () => {
  //   setShowDatePicker(true);
  //   ToastAndroid.show('Click on year to select year', ToastAndroid.SHORT);
  // };

  // function fetchDataForPinCode1(pincode) {
  //   let pincodeID = 0;
  //   setLoading(true);

  //   getPincodeList(pincode)
  //     .then(data => {
  //       const pincodeid = data[0].pinCodeId;
  //       pincodeID = pincodeid
  //       console.log('Pin Code Data:', pincodeid);
  //       return getDetailsByPinCode(pincodeid);
  //     })
  //     .then(secondData => {
  //       setdistrictid(secondData.distId);
  //       setSelectedState(secondData.stateName);
  //       setSelectedDistrict(secondData.distName);
  //       setpermananetdistrictId(secondData.distId);
  //       setpermananetsatedid(secondData.stateId);
  //       setpermananetcityid(secondData.cityId);
  //       setSelectedCity(secondData.cityName)

  //       return getCityDataForDistrict(pincodeID);
  //     })
  //     .then(cityData => {

  //       // setcitylistpicker([...cityData]);
  //       let updatedCity = [
  //         { id: 10000, cityName: "Select City" },
  //         ...cityData,
  //         { id: 0, cityName: "Other" },
  //       ];
  //       setcitylistpicker(updatedCity);
  //       console.log('Second API call:', cityData);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error in Page 1:', error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function getCityDataForDistrict(districtId) {
  //   try {
  //     setIsLoading(true);
  //     const cityData = await getCitiesByPincodeId(districtId);
  //     setIsLoading(false)
  //     return cityData;
  //   } catch (error) {
  //     console.error('Error fetching city data for district:', error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // function pinocdefeting(text) {
  //   if (text.length == 6) {
  //     fetchPincodeSuggestions(text);
  //     setOpen(true)
  //   }
  //   setPincode(text);
  // }

  // const fetchPincodeSuggestions = async (pincode) => {
  //   try {
  //     const suggestionData = await getPincodeList(pincode);
  //     console.log(suggestionData)
  //     if (Array.isArray(suggestionData.data) && suggestionData.data.length > 0) {

  //       const filteredSuggestions = suggestionData.data.filter((item) => (
  //         item.pinCode !== null
  //       ));
  //       setSuggestions(filteredSuggestions);
  //       if (pincode.length == 6) {
  //         fetchDataForPinCode1(pincode);
  //       }
  //     } else {
  //       setSuggestions([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching suggestions:', error);
  //   }
  //   finally {

  //     setLoading(false);
  //   }
  // };

  // const userData = {
  //   selectedLanguage,
  //   gender,
  //   selectedDate,
  //   email,
  //   number,
  //   whatapp,
  //   address,
  //   street,
  //   landmark,
  //   name,
  //   pincode,
  //   selectedState,
  //   selectedDistrict,
  //   selectedCity,
  //   permananetdistrictId,
  //   permananetsateid,
  //   permananetcityid,
  //   otherCity
  // };

  // async function validateFields() {

  //   if (!name) {
  //     ToastAndroid.show('Enter name', ToastAndroid.SHORT);
  //     return false;
  //   }

  //   if (!gender || gender === 'Select Gender*') {
  //     ToastAndroid.show('Select Gender', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!selectedDate) {
  //     ToastAndroid.show('Please fill date of birth', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!whatappyes || whatappyes === "Select WhatApp contact same as above ?") {
  //     ToastAndroid.show('Please specify your WhatsApp no same or not', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!address) {
  //     ToastAndroid.show('Address field is empty. Please fill it', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!street) {
  //     ToastAndroid.show('Street field is empty. Please fill it', ToastAndroid.SHORT);
  //     return false;
  //   }

  //   if (!pincode) {
  //     ToastAndroid.show('select a pincode to get state and district', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!selectedState) {
  //     ToastAndroid.show('State field is empty. Please fill it', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!selectedDistrict) {
  //     ToastAndroid.show('District field is empty. Please fill it', ToastAndroid.SHORT);
  //     return false;
  //   }
  //   if (!selectedCity) {
  //     ToastAndroid.show('City field is empty. Please fill it.', ToastAndroid.SHORT);
  //     return false;
  //   } else if (selectedCity === "Other" && !otherCity) {
  //     ToastAndroid.show('Please enter other city name', ToastAndroid.SHORT);
  //     return false;
  //   } else {
  //     setIsLoading(true)
  //     const userDataString = JSON.stringify(userData);
  //     console.log('Updated Value in AsyncStorage (previewSummaryData +++++++++++++++++):', updatedValue);
  //     navigation.navigate('NewUserKyc', { userData });
  //     setIsLoading(false)
  //   }
  //   return true;
  // }
  // const maximum_date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "transparent",
            height: height / 8,
            margin: 20,
            flexDirection: "row",
            width: width / 2.1,
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 20,
          }}
        >
          {isLoading == true ? (
            <View style={{ flex: 1 }}>
              <Loader isLoading={isLoading} />
            </View>
          ) : null}
          {isPopupVisible && (
            <Popup
              isVisible={isPopupVisible}
              onClose={() => setIsPopupVisible(false)}
            >
              <Text>{popupMessage}</Text>
              {/* // <Text>ICORRECT OTP</Text> */}
            </Popup>
          )}
          <Avatar.Image
            size={84}
            source={require("../../../assets/images/ac_icon.png")}
          />
          <View
            style={{
              margin: 20,
              flexDirection: "column",
              padding: 10,
              height: height / 10,
            }}
          >
            <Text style={{ color: "grey" }}>Contact</Text>
            <Text style={{ color: "grey" }}>Unique ID</Text>
          </View>
        </View>
        {newUserFields.map(field => (
          <Field
            id={field.id}
            key={field.id}
            type={field.type}
            data={field.data}
            label={field.label}
            items={field.items}
            properties={field.properties}
            rules={field.rules}
            links={field.links}
          />
        ))}
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Buttons
            label="Next"
            onPress={() => {
              // validateFields();
              navigation.navigate('Bank Details')
            }}
            variant="filled"
            width={350}
            icon={require("../../../assets/images/arrow.png")}
            iconWidth={50}
            iconHeight={20}
            iconGap={10}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  input: {
    padding: 5,
    height: height / 15,
    margin: 20,
    marginTop: 5,
    color: '#D3D3D3',
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#D3D3D3',
    borderWidth: 1.5,
    bottom: -5,
    // elevation: 1,
  },

  dropdownContainer: {
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyles: {
    backgroundColor: 'transparent',
    margin: 14,
    color: 'red',
    colorFocused: '#D3D3D3',
  },
});

export default NewUser;