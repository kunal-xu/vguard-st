import {
  View,
  Pressable,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "../../../../colors";
import { height, width } from "../../../utils/dimensions";
import Buttons from "../../../components/Buttons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "react-native-paper";
import Loader from "../../../components/Loader";
import Popup from "../../../components/Popup";
import { useTranslation } from "react-i18next";
import {
  fetchPinCodeData,
  PincodedetailList,
  GetProfession,
  Citylist,
  Getsubprofession,
  getUserProfile,
  sendFile,
  getFile,
  UpdateUserProfile,
  getKycIdTypes,
} from "../../../utils/apiservice";
import InputField from "../../../components/InputField";
import PickerField from "../../../components/PickerField";
import DatePickerField from "../../../components/DatePickerField";
import ImagePickerField from "../../../components/ImagePickerField";
import DatePicker from "../../../components/DatePicker";
import ImageWithModal from "../../../components/ImageWithModal";
import { Picker } from "@react-native-picker/picker";
import { Avatar, Button } from "react-native-paper";
import { imageUrl } from "../../../utils/constants";
import ActionPickerModal from "../../../components/ActionPickerModal";
import DropDownPicker from "react-native-dropdown-picker";
import { editProfileFields } from "../fields/editProfileFields";
import Field from "../../../components/Field";

var filesToUpload = [];
const EditProfile = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  //   const [gender, setGender] = useState(" ");
  //   const [selectedDate, setSelectedDate] = useState();
  //   const [selectedDate1, setSelectedDate1] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  //   const [pincode, setpincode] = useState("");

  //   const [SelfieData, setSelfieData] = useState(null);
  //   const [selfieuuidnew, setselfieuuidnew] = useState(null);
  //   const [Idcardfront, setIdcardfront] = useState(null);
  //   const [Idcardback, setIdcardback] = useState(null);
  //   const [pancarddata, setpancarddata] = useState(null);
  //   const [maritialstatusId, setmaritialstatusId] = useState("");

  //   const [selfieemodal, setselfieemodal] = useState({
  //     isVisible: false,
  //     documentType: null,
  //   });
  //   const [professiondata, setprofessiondata] = useState([]);
  //   const [professiondatanames, setprofessiondatanames] = useState([]);
  //   const [suggestions, setSuggestions] = useState([]);
  //   const [citylistpicker, setcitylistpicker] = useState(null);
  //   const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState();
  //   const [select, setselect] = useState();
  //   const [data, setData] = useState();
  //   const [userName, setUserName] = useState("");
  //   const [userCode, setUserCode] = useState("");
  //   const [userImage, setUserImage] = useState("");
  //   const [loyalty, setloyalty] = useState("Select");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  //   const [kycTypes, setKycTypes] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  //   const [newImage, setNewImage] = useState(false);
  //   const [form1, setform1] = useState({
  //     preferedLanguage: "",
  //     name: "",
  //     dateofbirth: "",
  //     number: "",
  //     WhatappNo: "",
  //     email: "",
  //     parmanentaddress: "",
  //     permanantStreet: "",
  //     permanantlandmark: "",
  //     permanantcity: "",
  //     permanentdistrict: "",
  //     permanentstate: "",
  //     permanentpincode: "",
  //     permananetcityid: "",
  //     permanantdistrictId: "",
  //     permanantstateId: "",
  //     pincode: "",
  //     gender: "",
  //     genderPos: "",
  //   });

  //   const [form2, setform2] = useState({
  //     currentaddressselections: "",
  //     curremtaddress: "",
  //     curretnstreet: "",
  //     currentlandmark: "",
  //     currentpincode: "",
  //     currentCity: "",
  //     currentdistrict: "",
  //     currentstate: "",
  //     currentcityid: "",
  //     currentdistrictId: "",
  //     cuurentstateid: "",
  //     profession: "",
  //     professionId: "",
  //     martialStatus: "",
  //     alreadyenrolled: "",
  //     annualbusiness: "",
  //     IdProoftype: "",
  //     idproofnumber: "",
  //     pancard: "",
  //     userprofession: "",
  //   });

  //   const [nominee, setnominee] = useState({
  //     nomineename: "",
  //     nomineemail: "",
  //     nomineenumber: "",
  //     nomineedateofbirth: "",
  //     nomineeaddress: "",
  //     nomineerealtionship: "",
  //   });
  //   const handleFieldChange = (fieldName, value) => {
  //     setform1((prevForm1) => ({
  //       ...prevForm1,
  //       [fieldName]: value,
  //     }));
  //   };

  //   const handlefiledChangeform2 = (fieldName, value) => {
  //     setform2((prevFrom2) => ({
  //       ...prevFrom2,
  //       [fieldName]: value,
  //     }));
  //   };

  //   const handlefiledchnage3 = (fieldName, value) => {
  //     setnominee((prevform3) => ({
  //       ...prevform3,
  //       [fieldName]: value,
  //     }));
  //   };

  //   const getGenderPos = (gender) => {
  //     if (gender.trim() == "Male") {
  //       return 1;
  //     } else if (gender == "Female") {
  //       return 2;
  //     } else if (gender == "Others") {
  //       return 3;
  //     } else {
  //       return 0;
  //     }
  //   };
  //   const [schemes, setSchemes] = useState([
  //     { schmename: "", resonforlikingschme: "" },
  //   ]);
  //   const [schemeData, setSchemeData] = useState({
  //     1: { otherSchemeBrand: "", abtOtherSchemeLiked: "" },
  //     2: { otherSchemeBrand: "", abtOtherSchemeLiked: "" },
  //     3: { otherSchemeBrand: "", abtOtherSchemeLiked: "" },
  //     4: { otherSchemeBrand: "", abtOtherSchemeLiked: "" },
  //     5: { otherSchemeBrand: "", abtOtherSchemeLiked: "" },
  //   });

  //   const handleInputChangeschemes = (schemeNumber, field, value) => {
  //     setSchemeData((prevData) => ({
  //       ...prevData,
  //       [schemeNumber]: {
  //         ...prevData[schemeNumber],
  //         [field]: value,
  //       },
  //     }));
  //   };
  const openImagePicker = async (documentType, onCapture) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        mediaType: "photo",
        quality: 0.5,
        cameraType: "back",
        saveToPhotos: true,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log("User cancelled image picker");
      } else if (result.error) {
        console.log("ImagePicker Error: ", result.error);
      } else {
        const photo = result.assets[0];
        const newPhoto = {
          uri: photo.uri,
          type: photo.type,
          name: photo.fileName,
        };

        switch (documentType) {
          case "SELFIE":
            filesToUpload.push({ imageRelated: "PROFILE", file: newPhoto });
            setSelfieData(newPhoto.uri);
            setNewImage(true);
            break;

          default:
            console.log("Unknown document type");
        }

        // Call the provided callback function to further process the data
        if (typeof onCapture === "function") {
          onCapture(documentType, newPhoto);
        }
      }
    }
  };
  const openCamera = async (documentType, onCapture) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    const granted1 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      const photo = result.assets[0];
      const newPhoto = {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName,
      };

      // Handle the captured data based on the document type
      switch (documentType) {
        case "SELFIE":
          filesToUpload.push({ imageRelated: "PROFILE", file: newPhoto });
          setSelfieData(newPhoto.uri);
          setNewImage(true);
          break;
        default:
          console.log("Unknown document type");
      }

      // Call the provided callback function to further process the data
      if (typeof onCapture === "function") {
        onCapture(documentType, newPhoto);
      }
    }
  };
  const handleIconButtonPress = () => {
    // Add a new set of text inputs
    if (schemes.length < 5) {
      setSchemes([...schemes, { schmename: "", resonforlikingschme: "" }]);
    }
  };
  //   async function Gettingprofession(params) {
  //     try {
  //       const professionfromapi = await GetProfession();
  //       const professions = professionfromapi.slice(0, 3); // Take the first 3 professions
  //       setprofessiondata(professions);
  //       const professionDataNames = professions.map((item) => ({
  //         label: item.professionName,
  //         value: item.professionName,
  //       }));
  //       setprofessiondatanames(professionDataNames);
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //     } finally {
  //       // After the API call (whether it succeeds or fails), hide the loader
  //       // setLoading(false);
  //     }
  //   }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      //   handleFieldChange("dateofbirth", selectedDate);
      setShowDatePicker(false);
    }
    setShowDatePicker(false);
  };

  const handleDateChange2 = (event, selectedDate1) => {
    if (event.type === "set") {
      handlefiledchnage3("nomineedateofbirth", selectedDate1);
      setShowDatePicker1(false);
    }
    setShowDatePicker1(false);
  };
  let options = {
    saveToPhotoes: true,
    mediaType: "photo",
    saveToPhotos: true,
    selectionLimit: 1,
    quality: 0.5,
    includeBase64: false,
    storageOption: {
      skipbackup: true,
      path: "images",
    },
  };

  async function fetchDataForPinCode1(pincode) {
    setIsLoading(true);
    try {
      const data = await fetchPinCodeData(pincode);
      const pincodeid = data[0].pinCodeId; // Declare the variable using 'const'
      const secondData = await PincodedetailList(pincodeid);
      handlefiledChangeform2("currentcityid", secondData.cityId);
      handlefiledChangeform2("cuurentstateid", secondData.stateId);
      const cityData = await getCityDataForDistrict(secondData.distId);
      setcitylistpicker(cityData);
      handlefiledChangeform2("currentstate", secondData.stateName);
      handlefiledChangeform2("currentdistrict", secondData.distName);
      handlefiledChangeform2("currentdistrictId", secondData.distId);
    } catch (error) {
      console.error("Error in Page 1:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCityDataForDistrict(districtId) {
    try {
      const cityData = await Citylist(districtId);
      return cityData;
    } catch (error) {
      console.error("Error fetching city data for district:", error);
      throw error;
    }
  }
  //========================eND OF FUNCTION========GETTTING DISTRICT AND STATE NAME WITH PINCODEID ========================//

  // ===============================================GETTING SUGGESTION=====/// FOR PINCODE======================//
  const fetchPincodeSuggestions = async (pincode) => {
    try {
      // setIsLoading(true);
      const suggestionData = await fetchPinCodeData(pincode);

      if (Array.isArray(suggestionData) && suggestionData.length > 0) {
        const filteredSuggestions = suggestionData.filter(
          (item) => item.pinCode !== null
        );
        setSuggestions(filteredSuggestions);
        fetchDataForPinCode1(pincode);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  function pincodefunction(text) {
    if (text.length >= 2) {
      setpincode(text);
      handlefiledChangeform2("currentpincode", text);

      fetchPincodeSuggestions(text);
      setOpen(true);
    }
  }

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleShowDatePicker1 = () => {
    setShowDatePicker1(true);
  };

  // useEffect(() => {

  //     Gettingprofession();
  //     AsyncStorage.getItem('userImage').then((userimage) => {
  //         setUserImage(userimage);
  //     });
  //     AsyncStorage.getItem('name').then((name) => {
  //         setUserName(name);
  //     });
  //     AsyncStorage.getItem('userCode').then((code) => {
  //         setUserCode(code);
  //     });
  //     getKycIdTypes()
  //         .then(response => response.data)
  //         .then(responseData => {
  //             const kycIdTypes = responseData.map(item => ({ label: item.kycIdName, value: item.kycId }));
  //             setKycTypes(kycIdTypes);
  //         })
  //     getUserProfile()
  //         .then(response => response.data)
  //         .then(responseData => {
  //             setData(responseData);
  //             setUserName(responseData.name);
  //             setUserCode(responseData.userCode);
  //             setGender(responseData.gender);
  //             const parseDate = (dateString) => {
  //                 const months = {
  //                     Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  //                     Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  //                 };

  //                 const [day, month, year] = dateString.split(' ');
  //                 return new Date(year, months[month], day);
  //             };

  //             const nomineeDate = responseData.bankDetail.nomineeDob ? parseDate(responseData.bankDetail.nomineeDob) : ""
  //             const dobDate = parseDate(responseData.dob);
  //             setSelectedDate(dobDate);

  //             if (responseData.bankDetail.nomineeDob === "" || responseData.bankDetail.nomineeDob === undefined) {
  //                 setSelectedDate1("");
  //             } else {
  //                 console.log("valid date")
  //                 setSelectedDate1(nomineeDate);
  //             }

  //             if (
  //               responseData.currPinCode == responseData.pinCode &&
  //               responseData.currentAddress == responseData.permanentAddress &&
  //               responseData.landmark == responseData.currLandmark &&
  //               responseData.currStreetAndLocality == responseData.streetAndLocality
  //             ) {
  //               setform2((prevForm2) => ({
  //                 ...prevForm2,
  //                 currentaddressselections: "Yes",
  //               }));
  //             } else {
  //               setform2((prevForm2) => ({
  //                 ...prevForm2,
  //                 currentaddressselections: "No",
  //               }));
  //             }
  //             setform1(prevForm1 => ({
  //                 ...prevForm1,
  //                 preferedLanguage: responseData.preferredLanguage || "",
  //                 name: responseData.name || "",
  //                 gender: responseData.gender || "",
  //                 dateofbirth: dobDate || "",
  //                 email:responseData?.emailId || "",
  //                 number: responseData.contactNo || "",
  //                 WhatappNo: responseData.whatsappNo || "",
  //                 parmanentaddress: responseData.permanentAddress || "",
  //                 permanantStreet: responseData.streetAndLocality || "",
  //                 permanantlandmark: responseData.landmark || "",
  //                 permanantcity: responseData.city || "",
  //                 permanentdistrict: responseData.dist || "",
  //                 permanentstate: responseData.state || "",
  //                 permanantcity: responseData.city || "",
  //                 pincode: responseData?.pinCode?.toString() || "",
  //                 permananetcityid: responseData.cityId || "",
  //                 permanantdistrictId: responseData.distId || "",
  //                 permanantstateId: responseData.stateId || "",
  //                 genderPos:getGenderPos(responseData?.gender)
  //             }));
  //             setform2(prevform2 => ({
  //                 ...prevform2,
  //                 curremtaddress: responseData.currentAddress || "",
  //                 curretnstreet: responseData.currStreetAndLocality || "",
  //                 currentlandmark: responseData.currLandmark || "",
  //                 currentpincode: responseData.currPinCode?.toString() || "",
  //                 currentCity: responseData.currCity || "",
  //                 currentdistrict: responseData.currDist || "",
  //                 currentstate: responseData.currState || "",
  //                 currentcityid: responseData.currCityId || "",
  //                 currentdistrictId: responseData.currDistId || "",
  //                 cuurentstateid: responseData.currStateId || "",
  //                 profession: responseData.profession || "",
  //                 martialStatus: responseData.maritalStatus || "",
  //                 alreadyenrolled: responseData.enrolledOtherSchemeYesNo || "",
  //                 annualbusiness: responseData.annualBusinessPotential || "",
  //                 IdProoftype: responseData.kycDetails.kycId || "",
  //                 pancard: responseData.kycDetails.panCardNo || "",
  //                 userprofession: responseData.userProfession || "",
  //                 idproofnumber: responseData.kycDetails.aadharOrVoterOrDlNo || "",

  //             }))

  //             setloyalty(responseData.enrolledOtherSchemeYesNo == "Yes" ? "Yes" : "No")

  //             setnominee(nomineform => ({
  //                 ...nomineform,
  //                 nomineename: responseData.bankDetail.nomineeName || "",
  //                 nomineemail: responseData.bankDetail.nomineeEmail || "",
  //                 nomineenumber: responseData.bankDetail.nomineeMobileNo || "",
  //                 nomineedateofbirth: nomineeDate || "",
  //                 nomineeaddress: responseData.bankDetail.nomineeAdd || "",
  //                 nomineerealtionship: responseData.bankDetail.nomineeRelation || "",
  //             }))
  //             fetchAndSetImageData(responseData.kycDetails.selfie, 'PROFILE', 1);
  //             fetchAndSetImageData(responseData.kycDetails.aadharOrVoterOrDLFront, 'ID_CARD_FRONT', 1);
  //             fetchAndSetImageData(responseData.kycDetails.aadharOrVoterOrDlBack, 'ID_CARD_BACK', 1);
  //             fetchAndSetImageData(responseData.kycDetails.panCardFront, 'PAN_CARD_FRONT', 1);
  //         })
  //         .catch(error => {
  //             console.error('Error fetching data:', error);
  //             console.log('Error fetching data:', error);
  //         });

  //     Gettingprofession();

  // }, [])
  const fetchAndSetImageData = async (uuid, imageRelated, userRole) => {
    try {
      //const response = await getFile(uuid, imageRelated, userRole);

      switch (imageRelated) {
        case "ID_CARD_FRONT":
          setIdcardfront(`${imageUrl}IdCard/${uuid}`);
          break;
        case "ID_CARD_BACK":
          setIdcardback(`${imageUrl}IdCard/${uuid}`);
          break;
        case "PAN_CARD_FRONT":
          setpancarddata(`${imageUrl}PanCard/${uuid}`);
          break;
        case "PROFILE":
          console.log(`${imageUrl}Profile/${uuid}`);
          setSelfieData(`${imageUrl}Profile/${uuid}`);
          break;

        default:
          console.warn(`Unhandled imageRelated value: ${imageRelated}`);
      }

      //return response;
    } catch (error) {
      console.error(`Error getting file for ${imageRelated} (${uuid}):`, error);
      throw error;
    } finally {
    }
  };
  const uploadFiles = async (fileDataArray) => {
    try {
      let responses = {};
      for (const fileData of fileDataArray) {
        const { imageRelated, file } = fileData;

        if (file) {
          const formData = new FormData();

          formData.append("file", {
            uri: file.uri,
            type: file.type,
            name: file.name,
          });
          formData.append("imageRelated", imageRelated);
          formData.append("userRole", "1");

          const response = await sendFile(formData);
          responses = response.data;
        }
      }

      return responses;
    } catch (error) {
      console.error("Error sending files:", error);
      throw error;
    }
  };

  function pinocdefeting(text) {
    if (text.length == 6) {
      fetchPincodeSuggestions(text);
      setOpen(true);
    }
    handlefiledChangeform2("currentpincode", text);
  }

  const getParsedDate = (param) => {
    let date = new Date(param).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return date;
  };

  const triggerupdateprofile = async () => {
    try {
      await setEntityUid();
      await updateuseprofile();
      setIsLoading(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setEntityUid = async () => {
    try {
      if (newImage) {
        let imageUrl = await uploadFiles(filesToUpload);
        setselfieuuidnew(imageUrl?.entityUid);
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const updateuseprofile = async () => {
    const profilebody = {
      appVersionCode: "",
      retailerAppVersionCode: "",
      egvEnabled: "",
      otpType: "",
      welcomePointsMsg: "0",
      ecardPath: "E-Card_Unavailable.pdf",
      userId: "1",
      password: "",
      inAllow: "",
      userCode: userCode,
      emailId: form1.email,
      maritalStatusId: form2.martialStatus,
      distId: form1.permanantdistrictId,
      cityId: form1.permananetcityid,
      addDiff: "",
      houseFlatNo: form1.parmanentaddress,
      userProfession: form2.userprofession,
      professionId: form2.professionId,
      subProfessionId: "",
      profession: form2.profession,
      loginOtpUserName: "",
      mobileNo: form1.number,
      otp: "",
      preferredLanguage: form1.preferedLanguage,
      preferredLanguagePos: "",
      referralCode: "",
      nameOfReferee: "",
      name: form1.name,
      gender: form1.gender,
      genderPos: form1.genderPos,
      dob: form1.dateofbirth ? getParsedDate(form1.dateofbirth) : "",
      contactNo: form1.number,
      whatsappNo: form1.WhatappNo,
      permanentAddress: form1.parmanentaddress,
      streetAndLocality: form1.permanantStreet,
      landmark: form1.permanantlandmark,
      city: form1.permanantcity,
      dist: form1.permanentdistrict,
      state: form1.permanentstate,
      stateId: form1.permanantstateId,
      pinCode: form1.pincode,
      currentAddress: form2.curremtaddress,
      currStreetAndLocality: form2.curretnstreet,
      currLandmark: form2.currentlandmark,
      currCity: form2.currentCity,
      currCityId: form2.currentcityid,
      currDistId: form2.currentdistrictId,
      currDist: form2.currentdistrict,
      currState: form2.currentstate,
      currStateId: form2.cuurentstateid,
      currPinCode: form2.currentpincode,
      otherCity: "",
      otherCurrCity: "",
      annualBusinessPotential: form2.annualbusiness,

      bankDetail: {
        errorMessage: "",
        bankId: "",
        bankAccNo: "",
        bankAccHolderName: "",
        bankAccType: "",
        bankAccTypePos: "",
        bankNameAndBranch: "",
        branchAddress: "",
        bankIfsc: "",
        nomineeName: nominee.nomineename,
        nomineeDob: nominee.nomineedateofbirth,
        checkPhoto: "",
        nomineeMobileNo: nominee.nomineenumber,
        nomineeEmail: nominee.nomineemail,
        nomineeAdd: nominee.nomineeaddress,
        nomineeRelation: nominee.nomineerealtionship,
        nomineeAccNo: "",
        bankDataPresent: "",
      },

      pointsSummary: {
        pointsBalance: "",
        redeemedPoints: "",
        numberOfScan: "",
        tdsPoints: "",
        schemePoints: "",
        totalPointsRedeemed: "",
        totalPointsEarned: "",
      },

      kycDetails: {
        kycFlag: "",
        userId: "",
        kycIdName: "",
        kycId: data.kycDetails.kycId,
        selfie: selfieuuidnew,
        aadharOrVoterOrDLFront: data.kycDetails.aadharOrVoterOrDLFront,
        aadharOrVoterOrDlBack: data.kycDetails.aadharOrVoterOrDlBack,
        aadharOrVoterOrDlNo: data.kycDetails.aadharOrVoterOrDlNo,
        panCardFront: data.kycDetails.panCardFront,
        panCardBack: "",
        panCardNo: data.kycDetails.panCardNo,
        gstFront: "",
        gstNo: "",
        gstYesNo: "",
      },

      rejectedReasonsStr: "",
      roleId: "",
      gstNo: "",
      gstYesNo: "",
      gstPic: "",
      categoryDealInID: "",
      categoryDealIn: "",
      aspireGift: "",
      firmName: "",
      tierFlag: "",
      fcmToken: "",
      active: "",
      airCoolerEnabled: "",

      welcomeBanner: {
        code: "",
        textMessage: "",
        videoPath: "",
        imgPath: "",
        vdoText: "",
      },

      updateAccount: "",
      islead: "",
      diffAcc: "",
    };

    if (form2.alreadyenrolled == "Yes") {
      profilebody.enrolledOtherScheme = 1;
      profilebody.enrolledOtherSchemeYesNo = "Yes";
      profilebody.otherSchemeBrand = schemeData[1].otherSchemeBrand;
      profilebody.abtOtherSchemeLiked = schemeData[1].abtOtherSchemeLiked;
      profilebody.otherSchemeBrand2 = schemeData[2].otherSchemeBrand;
      profilebody.abtOtherSchemeLiked2 = schemeData[2].abtOtherSchemeLiked;
      profilebody.otherSchemeBrand3 = schemeData[3].otherSchemeBrand;
      profilebody.abtOtherSchemeLiked3 = schemeData[3].abtOtherSchemeLiked;
      profilebody.otherSchemeBrand4 = schemeData[4].otherSchemeBrand;
      profilebody.abtOtherSchemeLiked4 = schemeData[4].abtOtherSchemeLiked;
      profilebody.otherSchemeBrand5 = schemeData[5].otherSchemeBrand;
      profilebody.abtOtherSchemeLiked5 = schemeData[5].abtOtherSchemeLiked;
    } else {
      profilebody.enrolledOtherScheme = 0;
      profilebody.enrolledOtherSchemeYesNo = "No";
      profilebody.otherSchemeBrand = "";
      profilebody.abtOtherSchemeLiked = "";
      profilebody.otherSchemeBrand2 = "";
      profilebody.abtOtherSchemeLiked2 = "";
      profilebody.otherSchemeBrand3 = "";
      profilebody.abtOtherSchemeLiked3 = "";
      profilebody.otherSchemeBrand4 = "";
      profilebody.abtOtherSchemeLiked4 = "";
      profilebody.otherSchemeBrand5 = "";
      profilebody.abtOtherSchemeLiked5 = "";
    }

    console.log(profilebody, ">>>>>payoadf", form2.professionId);

    try {
      setIsLoading(true);
      const resposne = await UpdateUserProfile(profilebody);
      if (resposne.code == 200) {
        setIsPopupVisible(true);
        setPopupMessage(resposne.message);
      } else {
      }
      setIsPopupVisible(true);
      setPopupMessage(resposne.message);
    } catch (error) {
      console.log("Error in updating user profile ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value, label) => {
    setPostData((prevData) => {
      let updatedValue = value;
      return {
        ...prevData,
        [label]: updatedValue,
      };
    });
  };

  const genderpickerItems = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Others", value: 3 },
  ];

  const selectYesorNo = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const maritalStatusData = [
    { label: "Married", value: "1" },
    { label: "Unmarried", value: "2" },
  ];

  const handleImageChange = async (image, imageName, apiResponse, label) => {
    try {
      if (label == "Id Proof* (Front)") {
        setIdFrontUid(apiResponse.data.entityUid);
      } else if (label == "Id Proof* (Back)") {
        setIdBackUid(apiResponse.data.entityUid);
      } else if (label == "Selfie") {
        setSelfie(apiResponse.data.entityUid);
      }
    } catch (error) {
      console.error("Error handling image change in EditProfile:", error);
    }
  };
  const maximum_date = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate()
  );
  const curr_date = new Date();

  return (
    <>
      <ScrollView style={styles.mainWrapper}>
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
            </Popup>
          )}
          <View style={styles.ImageProfile}>
            <Image
              source={{ uri: "" }}
              style={{ width: "100%", height: "100%", borderRadius: 50 }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              margin: 20,
              flexDirection: "column",
              padding: 10,
              height: height / 10,
            }}
          >
            <Text style={{ color: "grey" }}>Contact:</Text>
            <Text style={{ color: "grey" }}>Unique ID:</Text>
          </View>
        </View>
        {editProfileFields.map((field) => (
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
        {/* <InputField
            label={t("strings:lbl_preferred_language")}
            value={form1.preferedLanguage}
            disabled={true}
          /> */}
        {/* <InputField
            label={t("strings:name")}
            value={form1.name}
            disabled={true}
          /> */}
        {/* <PickerField
            label={t("strings:lbl_gender_mandatory")}
            disabled={false}
            selectedValue={form1.genderPos}
            onValueChange={(text) => handleFieldChange("gender", text)}
            items={genderpickerItems}
            setIndex={(t) =>
              setform1((prevForm1) => ({
                ...prevForm1,
                genderPos: t,
              }))
            }
          /> */}
        {/* <Text
            style={{
              color: colors.black,
              marginLeft: 2,
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: responsiveFontSize(1.5),
            }}
          >
            {t("strings:lbl_date_of_birth_mandatory")}
          </Text> */}
        {/* <View style={styles.datepickerview}>
            <DatePicker
              maximum_date={maximum_date}
              date={form1.dateofbirth}
              onDateChange={handleDateChange}
              showDatePicker={showDatePicker}
              onShowDatePicker={handleShowDatePicker}
            />
            <Icon
              name="keyboard-o"
              size={20}
              color="grey"
              style={{ left: width / 2, postion: "relative" }}
            />
          </View> */}
        {/* <InputField
            label={t("strings:lbl_contact_number_mandatory")}
            value={form1.number}
            keyboardType="numeric"
            disabled={true}
            onChangeText={(text) => handleFieldChange("number", text)}
          />

          <InputField
            label={t("strings:whatsapp_no")}
            value={form1.WhatappNo}
            keyboardType="numeric"
            onChangeText={(text) => handleFieldChange("WhatappNo", text)}
          />
          <InputField
            label={t("strings:email")}
            value={form1.email}
            onChangeText={(text) => handleFieldChange("email", text)}
          />
          <InputField
            label={t("strings:lbl_permanent_address_mandatory")}
            value={form1.parmanentaddress}
            disabled={true}
          />
          <InputField
            label={t("strings:lbl_street_locality")}
            value={form1.permanantStreet}
            disabled={true}
          />
          <InputField
            label={t("strings:lbl_landmark")}
            value={form1.permanantlandmark}
            disabled={true}
          />
          <InputField
            label={t("strings:lbl_city_mandatory")}
            value={form1.permanantcity}
            disabled={true}
          />
          <InputField
            label={t("strings:district")}
            value={form1.permanentdistrict}
            disabled={true}
          />
          <InputField
            label={t("strings:select_state")}
            value={form1.permanentstate}
            disabled={true}
          />
          <InputField
            label={t("strings:pincode")}
            value={form1.pincode}
            disabled={true}
          /> */}
        {/* <PickerField
            label={t("strings:is_current_address_different")}
            disabled={false}
            selectedValue={form2.currentaddressselections}
            onValueChange={(itemValue, itemIndex) => {
              handlefiledChangeform2("currentaddressselections", itemValue);

              if (itemValue == "No") {
                handlefiledChangeform2("currentaddressselections", itemValue);
              if (itemValue == "Yes") {
                handlefiledChangeform2(
                  "form2.currentaddressselections",
                  form2.currentaddressselections
                );
                handlefiledChangeform2(
                  "curremtaddress",
                  form1.parmanentaddress
                );
                handlefiledChangeform2("curretnstreet", form1.permanantStreet);
                handlefiledChangeform2(
                  "currentlandmark",
                  form1.permanantlandmark
                );
                handlefiledChangeform2(
                  "currentpincode",
                  form1.permanentpincode
                );
                handlefiledChangeform2("currentCity", form1.permanantcity);
                handlefiledChangeform2(
                  "currentdistrict",
                  form1.permanentdistrict
                );
                handlefiledChangeform2("currentstate", form1.permanentstate);
              }
            }}
            items={selectYesorNo}
          /> */}

        {/* {form2.currentaddressselections == "select" ||
          form2.currentaddressselections == "Yes" ? (
            <></>
          ) : (
            <>
              <InputField
                label={t("strings:lbl_current_address_mandatory")}
                value={form2.curremtaddress}
                onChangeText={(text) =>
                  handlefiledChangeform2("curremtaddress", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              />
              <InputField
                label={t("strings:lbl_street_locality")}
                value={form2.curretnstreet}
                onChangeText={(text) =>
                  handlefiledChangeform2("curretnstreet", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              />
              <InputField
                label={t("strings:lbl_landmark")}
                value={form2.currentlandmark}
                onChangeText={(text) =>
                  handlefiledChangeform2("currentlandmark", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              /> */}
        {/* <DropDownPicker
                mode="BADGE"
                showBadgeDot={true}
                searchable={true}
                searchPlaceholder="Search Your Pincode"
                loading={isLoading}
                label={value}
                placeholder={
                  form2.currentpincode === null
                    ? "Search Pincode"
                    : `Searched Pincode:${form2.currentpincode}`
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
                value={form2.currentpincode}
                onChangeItem={(item) => {
                  handlefiledChangeform2("currentpincode", item);
                }}
                onChangeSearchText={(text) => pinocdefeting(text)}
                dropDownContainerStyle={{
                  width: width / 1.1,
                  height: height / 5,
                  padding: 10,
                  left: 0,
                  top: 60,
                  borderWidth: 0.5,
                  borderTopWidth: 0,
                  borderColor: "#D3D3D3",
                  justifyContent: "center",
                  elevation: 0,
                  backgroundColor: "#D3D3D3",
                }}
                style={{
                  backgroundColor: "white",

                  elevation: 50,
                  opacity: 0.9,
                  borderWidth: 0.6,
                  width: width / 1.18,
                  height: height / 15,
                  bottom: 10,
                  elevation: 0,
                  margintop: 50,
                  borderColor: "#D3D3D3",
                }}
              /> */}
        {/* <InputField
                label={t("strings:lbl_state")}
                value={form2.currentstate}
                onChangeText={(text) =>
                  handlefiledChangeform2("currentstate", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              />
              <InputField
                label={t("strings:district")}
                value={form2.currentdistrict}
                onChangeText={(text) =>
                  handlefiledChangeform2("currentdistrict", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              />
              <InputField
                label={t("strings:city")}
                value={form2.currentCity}
                onChangeText={(text) =>
                  handlefiledChangeform2("currentCity", text)
                }
                disabled={form2.currentaddressselections === "Yes"}
              />
            </>
          )} */}
        {/* <PickerField
            label={t("strings:select_profession")}
            disabled={false}
            selectedValue={form2.profession}
            onValueChange={(itemValue, itemIndex) =>
              handlefiledChangeform2("profession", itemValue)
            }
            items={professiondatanames}
            setIndex={(t) =>
              setform2((prevForm1) => ({
                ...prevForm1,
                professionId: t,
              }))
            }
          /> */}

        {/* <PickerField
            label={t("strings:select_marital_status")}
            disabled={false}
            selectedValue={form2.martialStatus}
            onValueChange={(itemValue, itemIndex) => {
              const maritialStatusId = itemValue === "Married" ? "1" : "2";
              console.log(itemValue);
              handlefiledChangeform2("martialStatus", itemValue);

              setmaritialstatusId(maritialStatusId);
            }}
            items={maritalStatusData}
          /> */}
        {/* <PickerField
            label={t("strings:already_enrolled_into_loyalty_scheme")}
            disabled={false}
            selectedValue={form2.alreadyenrolled}
            onValueChange={(itemValue, itemIndex) =>
              handlefiledChangeform2("alreadyenrolled", itemValue)
            }
            items={selectYesorNo}
          /> */}

        {/* {form2.alreadyenrolled ? (
            <View>
              {form2.alreadyenrolled == "Yes" &&
                schemes.map((scheme, index) => (
                  <View key={index} style={styles.schemeContainer}>
                    <InputField
                      label={`Scheme ${index + 1} Brand Name`}
                      value={schemeData[index + 1].otherSchemeBrand}
                      onChangeText={(text) =>
                        handleInputChangeschemes(
                          index + 1,
                          `otherSchemeBrand`,
                          text
                        )
                      }
                    />
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <InputField
                          label={`Reason for liking Scheme ${index + 1}`}
                          value={schemeData[index + 1].abtOtherSchemeLiked}
                          onChangeText={(text) =>
                            handleInputChangeschemes(
                              index + 1,
                              `abtOtherSchemeLiked`,
                              text
                            )
                          }
                        />
                      </View>
                      <IconButton
                        style={styles.iconButton}
                        icon="plus"
                        size={20}
                        onPress={handleIconButtonPress}
                      />
                    </View>
                  </View>
                ))}
            </View>
          ) : null} */}
        {/* <InputField
            label={t("strings:annual_business_potential")}
            value={form2.annualbusiness.toString()}
            onChangeText={(text) =>
              handlefiledChangeform2("annualbusiness", text)
            }
            keyboardType="numeric"
          /> */}

        {/* <Pressable
            onPress={() =>
              setselfieemodal({
                isVisible: !selfieemodal.isVisible,
                documentType: "SELFIE",
              })
            }
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              maxWidth: width * 0.9,
              marginBottom: 20,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 5,
            }}
          >
            <TextInput
              editable={false}
              placeholder={t("strings:lbl_update_your_selfie")}
            />
            {SelfieData ? (
              <ImageWithModal imageUri={SelfieData || ""} />
            ) : (
              <Image
                style={{ marginHorizontal: 10, alignSelf: "center" }}
                source={require("../../../assets/images/photo_camera.png")}
              />
            )}
          </Pressable>
          {selfieemodal.isVisible && (
            <ActionPickerModal
              onCamera={() =>
                openCamera(
                  selfieemodal.documentType,
                  (documentType, newPhoto) => {
                    setselfieemodal({ isVisible: false, documentType: null });
                  }
                )
              }
              onGallery={() =>
                openImagePicker(
                  selfieemodal.documentType,
                  (documentType, newPhoto) => {
                    // Handle the selected selfie here
                    setselfieemodal({ isVisible: false, documentType: null });
                  }
                )
              }
            />
          )} */}

        {/* <PickerField
            label={t("strings:id_proof_type")}
            disabled={true}
            selectedValue={form2.IdProoftype.toString()}
            items={kycTypes}
          /> */}

        {/* <Pressable
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              maxWidth: width * 0.9,
              marginBottom: 20,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 5,
            }}
          >
            <TextInput
              editable={false}
              placeholder={t("strings:update_aadhar_voter_id_dl_front")}
            />
            {Idcardfront ? (
              <ImageWithModal imageUri={Idcardfront || ""} />
            ) : (
              <Image
                style={{ marginHorizontal: 10, alignSelf: "center" }}
                source={require("../../../assets/images/photo_camera.png")}
              />
            )}
          </Pressable>

          
          <Pressable
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              maxWidth: width * 0.9,
              marginBottom: 20,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 5,
            }}
          >
            <TextInput
              editable={false}
              placeholder={t("strings:update_aadhar_voter_id_dl_back")}
            />
            {Idcardback ? (
              <ImageWithModal imageUri={Idcardback || ""} />
            ) : (
              <Image
                style={{ marginHorizontal: 10, alignSelf: "center" }}
                source={require("../../../assets/images/photo_camera.png")}
              />
            )}
          </Pressable>

          <InputField
            label={t("strings:id_proof_no")}
            value={form2.idproofnumber}
            disabled={true}
          />
          

          <Pressable
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              maxWidth: width * 0.9,
              marginBottom: 20,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 5,
            }}
          >
            <TextInput
              editable={false}
              placeholder={t("strings:pan_card_front")}
            />
            {pancarddata ? (
              <ImageWithModal imageUri={pancarddata || ""} />
            ) : (
              <Image
                style={{ marginHorizontal: 10, alignSelf: "center" }}
                source={require("../../../assets/images/photo_camera.png")}
              />
            )}
          </Pressable> */}

        {/* <InputField
            label={t("strings:update_pan_number_manually")}
            value={form2.pancard}
            disabled={true}
          />

          <Text
            style={{
              color: colors.black,
              fontSize: responsiveFontSize(2),
              marginBottom: 10,
            }}
          >
            {t("strings:lbl_nominee_details")}
          </Text>
          <InputField
            label={t("strings:lbl_name_of_nominee")}
            value={nominee.nomineename}
            onChangeText={(text) => handlefiledchnage3("nomineename", text)}
          />
          
          <Text
            style={{
              color: colors.black,
              marginLeft: 2,
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: responsiveFontSize(1.5),
            }}
          >
            {t("strings:lbl_date_of_birth_mandatory")}
          </Text>
          <View style={styles.datepickerview}>
            <DatePicker
              maximum_date={curr_date}
              date={nominee?.nomineedateofbirth}
              onDateChange={handleDateChange2}
              showDatePicker={showDatePicker1}
              onShowDatePicker={handleShowDatePicker1}
            />
            <Icon
              name="keyboard-o"
              size={20}
              color="grey"
              style={{ left: width / 2, postion: "relative" }}
            />
          </View> */}
        {/* <InputField
            label={t("strings:lbl_mobile_number")}
            value={nominee.nomineenumber}
            onChangeText={(text) => handlefiledchnage3("nomineenumber", text)}
            keyboardType="numeric"
          />
          <InputField
            label={t("strings:lbl_email")}
            value={nominee.nomineemail}
            onChangeText={(text) => handlefiledchnage3("nomineemail", text)}
          />
          <InputField
            label={t("strings:lbl_address")}
            value={nominee.nomineeaddress}
            onChangeText={(text) => handlefiledchnage3("nomineeaddress", text)}
          />
          <InputField
            label={t("strings:lbl_relationship_with_you")}
            value={nominee.nomineerealtionship}
            onChangeText={(text) =>
              handlefiledchnage3("nomineerealtionship", text)
            }
          /> */}
      </ScrollView>
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          margintop: 10,
          alignItems: "center",
        }}
      >
        <Buttons
          label="Submit"
          onPress={() => {
            triggerupdateprofile();
          }}
          variant="filled"
          width={width / 1.05}
          icon={require("../../../assets/images/arrow.png")}
          iconWidth={50}
          iconHeight={20}
          iconGap={10}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#fff",
  },
  iconButton: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
  },
  datepickerview: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 5,
    backgroundColor: colors.white,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
    margintop: 10,
  },
  ImageProfile: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
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
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: 20,
  },
  labelStyles: {
    backgroundColor: "transparent",
    margin: 14,
    color: colors.grey,
  },
  input: {
    padding: 5,
    height: height / 13.5,
    margin: 10,
    marginTop: 5,
    color: colors.black,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: colors.grey,
    borderWidth: 1.8,
    borderwidth: 2,
    bottom: 0,
    borderRadius: 8,
    borderColor: "#D3D3D3",
  },
  imagepickercontainer: {
    flexDirection: "row",
    width: width / 1.18,
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 10,
    height: height / 16.5,
    margin: 10,
    justifycontent: "space-evenly",
    backgroundColor: "#fff",
  },
  noimage: {
    width: width / 8,
    height: height / 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    margin: 5,
    left: width / 2.4,
  },
  noimagepicker: {
    width: width / 8,
    height: height / 20,
    backgroundColor: "#fff",
    borderRadius: 5,

    left: width / 1.4,
    // marginBottom: 150,
    bottom: 20,
  },
  imagepicker: {
    backgroundColor: colors.white,
    height: height / 20,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 0,
    width: width / 1.75,
  },
  inputStyle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: height / 15,
    color: colors.black,
  },
  picker: {
    backgroundColor: colors.white,
    height: height / 20,
    margin: 10,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 0,
    width: width / 1.75,
    marginTop: 5,
    paddingBottom: 5,
  },
  pickercontainer: {
    flexDirection: "row",
    width: width / 1.2,
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 10,
    height: height / 16.5,
    margin: 10,
    justifycontent: "Space-between",
  },
  imagecontainereditprofile: {
    flexDirection: "row",
    padding: 5,
    height: 65,
    marginBottom: 20,
    color: colors.black,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grey,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalcontainer: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default EditProfile;
