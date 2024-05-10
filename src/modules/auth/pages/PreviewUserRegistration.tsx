import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, Modal, FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { GetProfession, sendFile, Appversion, RegisterNewUser } from '../../../utils/apiservice';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DatePicker from '../../../components/DatePicker';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize
} from "react-native-responsive-dimensions";
import { useDataContext } from '../../../utils/appcontext';
import ImageWithModal from '../../../components/ImageWithModal';



import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './RegistrationBankDetails';
import Popup from '../../../components/Popup';

const PreviewUserRegistration = ({ navigation }) => {

	const [selectedLanguage, setSelectedLanguage] = useState('English');
	const [citylistpicker, setcitylistpicker] = useState(null);
	const [districtid, setdistrictid] = useState('');
	const [gender, setGender] = useState('Select Gender*');
	const [email, setemail] = useState('');
	const [number, setNumber] = useState();
	const [whatapp, setwhatapp] = useState();
	const [whatappyes, setwhatappyes] = useState('Select WhatApp contact same as above ?')
	const [address, setaddress] = useState('');
	const [street, setstreet] = useState('');
	const [landmark, setlandmark] = useState('');
	const [name, setname] = useState('')
	const [pincode, setPincode] = useState('');
	const [selectedState, setSelectedState] = useState();
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [currentaddress, setcurrentaddress] = useState('');
	const [currentstreet, setcurrentstreet] = useState('');
	const [currentlandmark, setcurrentlandmark] = useState('');

	const [currentpincode, setcurrentPincode] = useState('');
	const [currentselectedState, setcurrentSelectedState] = useState();
	const [currentselectedDistrict, setcurrentSelectedDistrict] = useState('');
	const [currentselectedCity, setcurrentSelectedCity] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const [selectedDate, setSelectedDate] = useState();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [open, setOpen] = useState(false);
	const [profession, setprofession] = useState('');
	const [professiondata, setprofessiondata] = useState([]);
	const [subprofession, setsubprofession] = useState();
	const [maritialStatus, setmaritialStatus] = useState('Select');
	const [maritialStatusid, setmaritialStatusid] = useState('');

	const [loyalty, setloyalty] = useState('Select');
	const [annualincome, setannualincome] = useState('');
	const [selfieData, setSelfieData] = useState();
	const [idProofFrontData, setIdProofFrontData] = useState();
	const [idProofBackData, setIdProofBackData] = useState();
	const [panData, setPanData] = useState();
	const [Idprooftype, setIdprooftype] = useState('');
	const [aadharcardno, setaadharcardno] = useState('');
	const [pancardno, setpancardno] = useState('');
	const [checked, setChecked] = useState(false);
	const [accountnumber, setaccountnumber] = useState('');
	const [accountholdername, setaccountholdername] = useState('');
	const [chequeImage, setchequeImage] = useState();
	const [IFSC, setIFSC] = useState('');
	const [accounttype, setaccounttype] = useState('')
	const [appversion, setAppversion] = useState('');

	const [selectedbank, setselectedbank] = useState('');
	const [bankid, setbankid] = useState("");
	const [validateallfieldforbank, setvalidateallfieldforbank] = useState(false);
	const [aadharfrontuuid, setaadharfrontuuid] = useState(null);
	const [aadharbackuuid, setaadharbackuuid] = useState(null);
	const [selfieeuuid, setselfieeuuid] = useState(null);
	const [chequeImageuuid, setchequeimageuuid] = useState(null);
	const [pancarduuid, setpancarduuid] = useState(null);


	const [permanentcityid, setpermanentcityid] = useState('');
	const [permantdistrictid, setpermantdistrictid] = useState('');
	const [permananrstateid, setpermananrstateid] = useState('');
	const [permanentOtherCity, setPermanentOtherCity] = useState('');
	const [currentcityid, setcurrentcityid] = useState('');
	const [currentdistrictid, setcurrentdistrictid] = useState('');
	const [currentstateid, setcurrentstateid] = useState('');
	const [currentOtherCity, setCurrentOtherCity] = useState('');

	const [nomineename, setnomineename] = useState('');
	const [nomineemobileno, setnomineemobileno] = useState('');
	const [nomineeemail, setnomineeemail] = useState('');
	const [nomineeaddress, setnomineeaddress] = useState('');
	const [selectedDatenominee, setSelectedDatenominee] = useState();
	const [nomineedate, setnomineedate] = useState();
	const [previewData, setPreviewData] = useState(null);
	const [relationwithyou, setrelationwithyou] = useState('');
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [schemes, setSchemes] = useState([{ schmename: '', resonforlikingschme: '' }]);
	const [schemeData, setSchemeData] = useState({
		1: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		2: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		3: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		4: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		5: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
	});
	// const { PreviewSummaryData } = route.params;
	// //console.log('==================%%%=PREVIEW SUMMARY=================', PreviewSummaryData);

	const handleInputChangeschemes = (schemeNumber, field, value) => {
		setSchemeData((prevData) => ({
			...prevData,
			[schemeNumber]: {
				...prevData[schemeNumber],
				[field]: value,
			},

		}));
		//console.log('Updated schemeData:', schemeData);
	};

	// //console.log(KycData);
	// //console.log('===============^^^^=====================', Userdata);
	const { t } = useTranslation();

	useEffect(() => {


		// Retrieve the data from AsyncStorage
		const retrieveData = async () => {

			try {
				setIsLoading(true)
				const data = await AsyncStorage.getItem('previewSummaryData');


				if (data) {
					// Parse the JSON string back into an object

					const retrievedData = JSON.parse(data);
					const retrievedSchemeData = retrievedData.fullData.NewUserKycData.schemeData;
					//console.log("??????????????????", retrievedSchemeData);
					const updatedSchemeData = {
						1: {
							otherSchemeBrand: retrievedSchemeData[1]?.otherSchemeBrand,
							abtOtherSchemeLiked: retrievedSchemeData[1]?.abtOtherSchemeLiked,
						},
						2: {
							otherSchemeBrand: retrievedSchemeData[2]?.otherSchemeBrand1,
							abtOtherSchemeLiked: retrievedSchemeData[2]?.abtOtherSchemeLiked1,
						},
						3: {
							otherSchemeBrand: retrievedSchemeData[3]?.otherSchemeBrand2,
							abtOtherSchemeLiked: retrievedSchemeData[3]?.abtOtherSchemeLiked2,
						},
						4: {
							otherSchemeBrand: retrievedSchemeData[4]?.otherSchemeBrand3,
							abtOtherSchemeLiked: retrievedSchemeData[4]?.abtOtherSchemeLiked3,
						},
						5: {
							otherSchemeBrand: retrievedSchemeData[5]?.otherSchemeBrand4,
							abtOtherSchemeLiked: retrievedSchemeData[5]?.abtOtherSchemeLiked4,
						},
					};
					//console.log("??????????????????", updatedSchemeData);
					setSchemeData(updatedSchemeData);
					//console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetsateid);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetcityid);
					// //console.log("++++++++++++&&&&&&&&++DISTRACT++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetdistrictId);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentcityid);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentdistrictId);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentstateid);
					// //console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.BankDetailsAndNominee.bankid);
					setSelectedLanguage(retrievedData?.fullData?.userData?.selectedLanguage);
					setGender(retrievedData?.fullData?.userData?.gender);
					setemail(retrievedData?.fullData?.userData?.email);
					setNumber(retrievedData?.fullData?.userData?.number);
					setwhatapp(retrievedData?.fullData?.userData?.whatapp);
					setaddress(retrievedData?.fullData?.userData?.address);
					setstreet(retrievedData?.fullData?.userData?.street);
					setlandmark(retrievedData?.fullData?.userData?.landmark);
					setSelectedDate(retrievedData?.fullData?.userData?.selectedDate?.substring(0, 10));
					setname(retrievedData?.fullData?.userData?.name);
					setPincode(retrievedData?.fullData?.userData?.pincode);
					setSelectedState(retrievedData?.fullData?.userData?.selectedState);
					setSelectedDistrict(retrievedData?.fullData?.userData?.selectedDistrict);
					setSelectedCity(retrievedData?.fullData?.userData?.selectedCity);
					setcurrentaddress(retrievedData?.fullData?.NewUserKycData?.address);
					setcurrentstreet(retrievedData?.fullData?.NewUserKycData?.street);
					setcurrentlandmark(retrievedData?.fullData?.NewUserKycData?.landmark);
					setcurrentPincode(retrievedData?.fullData?.NewUserKycData?.pincode);
					setcurrentSelectedCity(retrievedData?.fullData?.NewUserKycData?.currentselectedCity);
					setcurrentSelectedDistrict(retrievedData?.fullData?.NewUserKycData?.currentselectedDistrict);
					setcurrentSelectedState(retrievedData?.fullData?.NewUserKycData?.currentselectedState);
					//KYC DATA

					setprofession(retrievedData?.fullData?.NewUserKycData?.profession);
					// setsubprofession(retrievedData?.fullData?.NewUserKycData?.subprofession);
					setmaritialStatus(retrievedData?.fullData?.NewUserKycData?.maritialStatus);
					setmaritialStatusid(retrievedData?.fullData?.NewUserKycData?.maritialstatusId);
					setloyalty(retrievedData?.fullData?.NewUserKycData?.loyalty);
					setannualincome(retrievedData?.fullData?.NewUserKycData?.annualincome);
					setSelfieData(retrievedData?.fullData?.NewUserKycData?.selfieData);
					setIdProofFrontData(retrievedData?.fullData?.NewUserKycData?.idProofFrontData);
					setIdProofBackData(retrievedData?.fullData?.NewUserKycData?.idProofBackData);
					setPanData(retrievedData?.fullData?.NewUserKycData?.panData);
					setaadharcardno(retrievedData?.fullData?.NewUserKycData?.aadharcardno);
					setpancardno(retrievedData?.fullData?.NewUserKycData?.pancardno);
					setaccountnumber(retrievedData?.BankDetailsAndNominee?.accountnumber);
					setaccountholdername(retrievedData?.BankDetailsAndNominee?.accountholdername);
					setIFSC(retrievedData?.BankDetailsAndNominee?.IFSC);
					setchequeImage(retrievedData?.BankDetailsAndNominee?.chequeImage)
					setaccounttype(retrievedData?.BankDetailsAndNominee?.accounttype);
					setselectedbank(retrievedData?.BankDetailsAndNominee?.selectedbank);
					setbankid(retrievedData?.BankDetailsAndNominee?.bankid);
					setnomineename(retrievedData?.BankDetailsAndNominee?.nomineename);
					setnomineemobileno(retrievedData?.BankDetailsAndNominee?.nomineemobileno);
					setnomineeemail(retrievedData?.BankDetailsAndNominee?.nomineeemail);
					setnomineeaddress(retrievedData?.BankDetailsAndNominee?.nomineeaddress);
					setrelationwithyou(retrievedData?.BankDetailsAndNominee?.relationship);

					setSelectedDatenominee(retrievedData?.BankDetailsAndNominee?.selectedDatenominee);
					setnomineedate(retrievedData?.BankDetailsAndNominee?.selectedDatenominee?.substring(0, 10))

					if (retrievedData?.fullData?.NewUserKycData?.currentaddres == "yes") {
						setpermananrstateid(retrievedData?.fullData?.userData?.permananetsateid);
						setpermantdistrictid(retrievedData?.fullData?.userData?.permananetdistrictId);
						setpermanentcityid(retrievedData?.fullData?.userData?.permananetcityid);
						setPermanentOtherCity(retrievedData?.fullData?.userData?.otherCity)
						setcurrentdistrictid(retrievedData?.fullData?.userData?.permananetdistrictId);
						setcurrentcityid(retrievedData?.fullData?.userData?.permananetcityid);
						setcurrentstateid(retrievedData?.fullData?.userData?.permananetsateid);
						setCurrentOtherCity(retrievedData?.fullData?.userData?.otherCity)
					} else {
						setpermananrstateid(retrievedData?.fullData?.userData?.permananetsateid);
						setpermantdistrictid(retrievedData?.fullData?.userData?.permananetdistrictId);
						setpermanentcityid(retrievedData?.fullData?.userData?.permananetcityid);
						setPermanentOtherCity(retrievedData?.fullData?.userData?.otherCity)
						setcurrentdistrictid(retrievedData?.fullData?.NewUserKycData?.currentdistrictId);
						setcurrentcityid(retrievedData?.fullData?.NewUserKycData?.currentcityid);
						setcurrentstateid(retrievedData?.fullData?.NewUserKycData?.currentstateid);
						setCurrentOtherCity(retrievedData?.fullData?.NewUserKycData?.otherCity)
					}

				}

			} catch (error) {
				//console.error('Error retrieving data: ', error);
			} finally {
				setIsLoading(false);
			}

		};

		retrieveData();

		// GettingAppversion();
		Gettingprofession();
		// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharfrontuuid,);
		// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharbackuuid);
		// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", pancarduuid);
		// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", chequeImageuuid);
		// //console.log("================================================");
		// //console.log(">><><<><>><><><><><><><><><><><><", userbody);
		// //console.log("================================================");
	}, [aadharfrontuuid, aadharbackuuid, pancarduuid, chequeImageuuid, selfieeuuid]);

	const updateDataInAsyncStorage = async () => {
		navigation.navigate("newUser");
	};

	const handleIconButtonPress = () => {
		// Add a new set of text inputs
		if (schemes.length < 5) {
			setSchemes([...schemes, { schmename: '', resonforlikingschme: '' }]);
		}
	};

	const userbody = {
		"welcomePointsErrorCode": 0,
		// "userId": number,
		// "password": number,
		// "inAllow": 0,
		"emailId": email,
		"enrolledOtherScheme": 0,
		"maritalStatus": maritialStatus,
		"maritalStatusId": maritialStatusid,
		"distId": permantdistrictid,
		"cityId": permanentcityid,
		"addDiff": 1,
		// "userProfession": profession,
		"professionId": 1,
		//  "subProfessionId": 0,
		"profession": profession,
		// "loginOtpUserName": null,
		"mobileNo": number,
		"otp": "1111",
		"preferredLanguage": "English",
		"preferredLanguagePos": "1",
		"referralCode": "",
		"nameOfReferee": "",
		"name": name,
		"gender": gender,
		"genderPos": "1",
		"dob": selectedDate,
		"contactNo": number,
		"whatsappNo": whatapp,
		"permanentAddress": address,
		"streetAndLocality": street,
		"landmark": landmark,
		"city": selectedCity,
		"dist": selectedDistrict,
		"state": selectedState,
		"stateId": permananrstateid,
		"pinCode": pincode,
		"currentAddress": currentaddress,
		"currStreetAndLocality": currentstreet,
		"currLandmark": currentlandmark,
		"currCity": currentselectedCity,
		"currCityId": currentcityid,
		"currDistId": currentdistrictid,
		"currDist": currentselectedDistrict,
		"currState": currentselectedState,
		"currStateId": currentstateid,
		"currPinCode": currentpincode,
		"currPincodeId": '',

		// "otherCity": null,
		// "otherCurrCity": null,
		"otherSchemeBrand": schemeData[1].otherSchemeBrand,
		"abtOtherSchemeLiked": schemeData[1].abtOtherSchemeLiked,
		"otherSchemeBrand2": schemeData[2].otherSchemeBrand,
		"abtOtherSchemeLiked2": schemeData[2].abtOtherSchemeLiked,
		"otherSchemeBrand3": schemeData[3].otherSchemeBrand,
		"abtOtherSchemeLiked3": schemeData[3].abtOtherSchemeLiked,
		"otherSchemeBrand4": schemeData[4].otherSchemeBrand,
		"abtOtherSchemeLiked4": schemeData[4].abtOtherSchemeLiked,
		"otherSchemeBrand5": schemeData[5].otherSchemeBrand,
		"abtOtherSchemeLiked5": schemeData[5].abtOtherSchemeLiked,
		"annualBusinessPotential": annualincome,
		"bankDetail": {
			"bankId": bankid,
			"bankAccNo": accountnumber,
			"bankAccHolderName": accountholdername,
			"bankAccType": accounttype,
			"bankAccTypePos": 1,
			"bankNameAndBranch": selectedbank,
			// "branchAddress": "",
			"bankIfsc": IFSC,
			"nomineeName": nomineename,
			"nomineeDob": selectedDatenominee,
			"checkPhoto": chequeImageuuid,
			"nomineeMobileNo": nomineemobileno,
			"nomineeEmail": nomineeemail,
			"nomineeAdd": nomineeaddress,
			"nomineeRelation": relationwithyou,

		},

		"kycDetails": {
			"kycFlag": "0",
			//"userId": null,
			"kycIdName": "",
			"kycId": 1,
			"selfie": selfieeuuid,
			"aadharOrVoterOrDLFront": aadharfrontuuid,
			"aadharOrVoterOrDlBack": aadharbackuuid,
			"aadharOrVoterOrDlNo": aadharcardno,
			"panCardFront": pancarduuid,
			"panCardNo": pancardno,

		},

	}

	const uploadFiles = async (fileDataArray) => {

		try {

			const responses = [];

			for (const fileData of fileDataArray) {
				const { imageRelated, file } = fileData;

				if (file) { // Check if the file is not null
					const formData = new FormData();
					formData.append('userRole', '1');
					formData.append('imageRelated', imageRelated);
					formData.append('file', {
						uri: file.uri,
						type: file.type,
						name: file.name,
					});
					//console.log("inside upload files ", formData);
					const response = await sendFile(formData);
					responses.push(response.data);
				}
			}

			return responses;
		} catch (error) {
			//console.error('Error sending files:', error);
			throw error;
		} finally {

		}
	};

	const callUploadAndThenAnotherFunction = async () => {
		try {
			//console.log(">>>>>>>>>>>came")
			setIsLoading(true);
			const filesToUpload = [
				{ imageRelated: 'ID_CARD_FRONT', file: idProofFrontData },
				{ imageRelated: 'ID_CARD_BACK', file: idProofBackData },
				{ imageRelated: 'PAN_CARD_FRONT', file: panData },
				{ imageRelated: 'CHEQUE', file: chequeImage },
				{ imageRelated: 'PROFILE', file: selfieData },

			];

			// Filter out files with null data
			const validFilesToUpload = filesToUpload.filter(fileData => fileData.file !== null);

			if (validFilesToUpload.length > 0) {
				const responses = await uploadFiles(validFilesToUpload);

				// Extract and store entityUid values in separate state variables
				responses.forEach((response, index) => {
					switch (validFilesToUpload[index].imageRelated) {
						case 'ID_CARD_FRONT':
							setaadharfrontuuid(response.entityUid);
							break;
						case 'ID_CARD_BACK':
							setaadharbackuuid(response.entityUid);
							break;
						case 'PAN_CARD_FRONT':
							setpancarduuid(response.entityUid);
							break;
						case 'CHEQUE':
							setchequeimageuuid(response.entityUid);
							break;

						case 'PROFILE':
							setselfieeuuid(response.entityUid);
							break;
						default:
							break;
					}

				});
				//console.log("aadharfrontuuid:", aadharfrontuuid);
				//console.log("aadharbackuuid:", aadharbackuuid);
				//console.log("pancarduuid:", pancarduuid);
				//console.log("chequeimageuuid:", chequeImageuuid);
				//console.log("selfieeuuid:", selfieeuuid);
				// setAllUUIDs(() => ({
				//     aadharfrontuuid,
				//     aadharbackuuid,
				//     pancarduuid,
				//     chequeImageuuid,
				//     selfieeuuid,
				// }));

				if (aadharfrontuuid != null && aadharfrontuuid != 'undefined' && aadharbackuuid != null && aadharbackuuid != 'undefined' && selfieeuuid != 'undefined' && selfieeuuid != null) {
					// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharfrontuuid,);
					// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharbackuuid);
					// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", pancarduuid);
					// //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", chequeImageuuid);
					// //console.log("%%%%%%%%%%%%%%%%%%%%%%", selfieeuuid);
					// //console.log("================================================");
					//console.log(">><><<><>><><><>PREVIEW SUMMARY<><><><><><><><><><", userbody);
					// //console.log("================================================");
					await registernewuser();
				}
				else {

					// callUploadAndThenAnotherFunction();
					// registernewuser(userbody);
				}
			} else {
				//console.log('No valid files to upload.');
			}
		} catch (error) {
			//console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	async function registernewuser() {
		try {

			console.log("cameeeeeeeee", userbody)
			setIsLoading(true);
			const response = await RegisterNewUser(userbody);
			setIsLoading(true);
			console.log(response, ">>>>>>>>>response")
			if (response.message === 'Member registered successfully') {
				setIsPopupVisible(true);
				setPopupMessage(response.message);
				// Alert.alert(response.message);
				//navigation.navigate('login');
				await AsyncStorage.removeItem('previewSummaryData')
				setTimeout(() => {
					navigation.navigate('login');
				}, 1200);
			} else {
				setIsPopupVisible(true);
				setPopupMessage(response.message);
			}
			// //console.log(response)

		} catch (error) {
			throw error;
			// //console.error('Error while registering user:', error);

		} finally {
			setIsLoading(false);
		}

	}





	async function Gettingprofession(params) {

		try {

			const professionfromapi = await GetProfession();
			setprofessiondata([professionfromapi[0], professionfromapi[1], professionfromapi[2],]);
			//console.log("==%%%%===", professiondata);
		}
		catch (error) {
			//console.error('Error fetching suggestions:', error);
		}
		finally {
			// After the API call (whether it succeeds or fails), hide the loader

		}

	}

	// async function GettingAppversion() {
	//     try {
	//         const response = await Appversion();
	//         //console.log('====================================');
	//         //console.log(response.data);
	//         //console.log('====================================');
	//         setAppversion(response.data.toString());
	//     } catch (error) {
	//         throw error

	//     }

	// }

	return (
		<SafeAreaView>
			<ScrollView>
				<KeyboardAvoidingView>
					<View style={{ backgroundColor: 'white' }} >
						<View style={{ backgroundColor: 'transparent', height: height / 8, margin: 25, flexDirection: 'row', width: width / 1.8, justifyContent: 'space-evenly', alignItems: 'center', padding: 20, }}>
							<Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
							<View style={{ marginLeft: 40, flexDirection: 'column', backgroundColor: "transparent", width: width / 2.7 }}>
								<Text style={{ color: 'grey' }}>New User</Text>
								<Text style={{ color: 'grey' }}>Rishta ID</Text>
								<Text style={{ color: 'grey' }}>{number}</Text>
							</View>

						</View>
						{isLoading == true ? <View style={{ flex: 1 }}>

							<Loader isLoading={isLoading} />
						</View> : null}
						{isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
							<Text>{popupMessage}</Text>

						</Popup>
						)}

						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_preferred_language')}

							maxLength={30}
							editable={false}
							value={selectedLanguage}
							onChangeText={(text) => selectedLanguage(text)}
							keyboardType='default'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>

						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:name')}

							maxLength={30}
							value={name}
							editable={false}
							onChangeText={(text) => setname(text)}
							keyboardType='default'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>



						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:Gender')}

							maxLength={30}
							value={gender}
							editable={false}
							onChangeText={(text) => setGender(text)}
							keyboardType='default'
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>


						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:date_of_birth')}

							maxLength={30}
							value={selectedDate}
							editable={false}
							onChangeText={(text) => setSelectedDate(text)}
							keyboardType='default'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>
						{/* <TextcontainerStyles={styles.input}>{data.fullData.userData.selectedDate}</Text> */}

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:contact_no')}
							value={number}
							// onChangeText={(text) => setNumber(text)}
							keyboardType='number-pad'
							editable={false}

							maxLength={10}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>


						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:whatsapp_no')}
							maxLength={10}
							editable={false}
							value={whatapp}
							onChangeText={(text) => setwhatapp(text)}
							keyboardType='number-pad'
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:email')}


							keyboardType='email-address'
							value={email}
							editable={false}
							onChangeText={(text) => setemail(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:lbl_permanent_address_mandatory')}


							editable={false}
							keyboardType='default'
							maxLength={128}
							value={address}
							onChangeText={(text) => setaddress(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:lbl_street_locality')}
							editable={false}


							maxLength={128}
							keyboardType='default'
							value={street}
							onChangeText={(text) => setstreet(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:lbl_landmark')}
							editable={false}


							maxLength={60}
							keyboardType='default'
							value={landmark}
							onChangeText={(text) => setlandmark(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>




						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:lbl_pin_code_mandatory')}
							labelTextColor={"black"}
							editable={false}
							keyboardType="number-pad"
							value={pincode}
							onChangeText={(text) => setPincode(text)}
							maxLength={6}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>



						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:lbl_state')}</Text>
						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>

							<Text style={{ color: 'black', margin: 15 }}>{selectedState}</Text>
						</View>

						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:district')}</Text>

						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>

							<Text style={{ color: 'black', margin: 15 }}>{selectedDistrict}</Text>


						</View>

						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}>  {t('strings:city')}</Text>

						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>

							<Text style={{ color: 'black', margin: 15 }}>{selectedCity}</Text>
						</View>

						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_profession')}</Text>

						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>


							<Picker
								mode='dropdown'
								style={{ color: 'black' }}
								selectedValue={profession}
								onValueChange={(itemValue, itemIndex) =>
									setprofession(itemValue)
								}>
								{professiondata.map(item => (
									<Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
								))}

							</Picker>

						</View>

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:sub_profession_category')}

							maxLength={30}
							value={subprofession}

							onChangeText={(text) => setsubprofession(text)}
							keyboardType='default'
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>

						<Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_marital_status')}</Text>

						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>


							<Picker
								mode='dropdown'
								style={{ color: 'black' }}
								selectedValue={maritialStatus}
								onValueChange={(itemValue, itemIndex) => {
									const maritialStatusId = itemValue === 'Married' ? '1' : '2';
									setmaritialStatusid(maritialStatusId)
									setmaritialStatus(itemValue)
								}
								}>
								<Picker.Item label="Select" value="0" />
								<Picker.Item label="Married" value="Married" />
								<Picker.Item label=" Unmarried" value="Unmarried" />


							</Picker>

						</View>

						<Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:enrolled_into_loyalty_scheme')}</Text>
						<View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderColor: "#D3D3D3" }}>


							<Picker
								mode='dropdown'
								style={{ color: 'black' }}
								selectedValue={loyalty}
								onValueChange={(itemValue, itemIndex) =>
									setloyalty(itemValue)}>
								<Picker.Item label="Select" value="Select" />
								<Picker.Item label="Yes" value="Yes" />
								<Picker.Item label=" No" value="No" />



							</Picker>

						</View>
						{loyalty == 'Yes' ?
							<View>
								{loyalty === 'Yes' &&
									schemes.map((scheme, index) => (
										<View key={index} style={styles.schemeContainer}>
											<FloatingLabelInput
												label={`Scheme ${index + 1} Brand Name`}
												value={schemeData[index + 1].otherSchemeBrand}
												onChangeText={(text) => handleInputChangeschemes(index + 1, `otherSchemeBrand`, text)}
												keyboardType="default"
												containerStyles={styles.input}
												staticLabel
												labelStyles={styles.labelStyles}
												inputStyles={{
													color: 'black',
													paddingHorizontal: 10,
												}}
											/>
											<View style={{ flexDirection: 'row' }}>
												<FloatingLabelInput
													label={`Reason for liking Scheme ${index + 1}`}
													value={schemeData[index + 1].abtOtherSchemeLiked}
													onChangeText={(text) => handleInputChangeschemes(index + 1, `abtOtherSchemeLiked`, text)}
													keyboardType="default"
													containerStyles={styles.input}
													staticLabel
													labelStyles={styles.labelStyles}
													inputStyles={{
														color: 'black',
														paddingHorizontal: 10,
													}}
												/>
												<IconButton style={styles.iconButton} icon="plus" size={20} onPress={handleIconButtonPress} />
											</View>
										</View>
									))}
							</View> : null}

						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:annual_business_potential')}
							value={annualincome}
							onChangeText={(text) => setannualincome(text)}
							keyboardType='number-pad'



							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>

						<Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('strings:selfie')}</Text>


						<View style={{ backgroundColor: '#fff', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15, borderColor: "#D3D3D3" }}>


							{selfieData != null ? <Text style={{ color: 'black', right: width / 2 }}>{selfieData.name.substring(0, 10)}</Text> : null}
							{selfieData != null ?
								<ImageWithModal imageUri={selfieData.uri} name={selfieData.name} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}




						</View>



						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:select_kyc_type')}
							value={Idprooftype}
							onChangeText={(text) => setIdprooftype(text)}
							keyboardType='number-pad'
							placeholder='Aadhar Card'
							placeholderTextColor={'black'}

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>

						<Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:id_proof_front')}</Text>


						<View style={{ backgroundColor: '#fff', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15, borderColor: "#D3D3D3" }}>
							{idProofFrontData != null ? <Text style={{ color: 'black', right: width / 2 }}>{idProofFrontData.name.substring(0, 10)}</Text> : null}
							{idProofFrontData != null ? <ImageWithModal imageUri={idProofFrontData.uri} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


						</View>

						<Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:id_proof_back')}</Text>


						<View style={{ backgroundColor: '#fff', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15, borderColor: "#D3D3D3" }}>
							{idProofBackData != null ? <Text style={{ color: 'black', right: width / 2 }}>{idProofBackData.name.substring(0, 10)}</Text> : null}
							{idProofBackData != null ? <ImageWithModal imageUri={idProofBackData.uri} /> : <Image resizeMode="contain" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, borderRadius: 5, margin: 5 }} />}


						</View>



						<FloatingLabelInput
							containerStyles={[styles.input]}
							label={t('strings:id_proof_no')}
							value={aadharcardno}
							onChangeText={(text) => setaadharcardno(text)}
							keyboardType='number-pad'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
							maxLength={12}
						/>

						<Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('strings:pan_card_front')}</Text>


						<View style={{ backgroundColor: '#fff', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15, borderColor: "#D3D3D3" }}>
							{panData != null ? <Text style={{ color: 'black', right: width / 2 }}>{panData.name.substring(0, 10)}</Text> : null}
							{panData != null ? <ImageWithModal imageUri={panData.uri} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


						</View>



						<FloatingLabelInput
							containerStyles={[styles.input]}
							label={t('strings:pan_no')}


							value={pancardno}
							onChangeText={(text) => setpancardno(text)}
							keyboardType='default'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
							maxLength={10}
						/>

						<Text style={{ color: 'black', marginLeft: 20, }}> {t('strings:lbl_bank_details')}</Text>
						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_account_number')}


							editable={false}
							keyboardType='number-pad'
							value={accountnumber}
							onChangeText={(text) => setaccountnumber(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>



						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_account_holder_name')}
							editable={false}


							keyboardType='default'
							value={accountholdername}
							onChangeText={(text) => setaccountholdername(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

							maxLength={50}
						/>

						<FloatingLabelInput
							containerStyles={styles.input}

							editable={false}
							label={t('strings:select_account_type')}

							keyboardType='default'
							value={accounttype}
							onChangeText={(text) => setaccounttype(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


							maxLength={20}
						/>




						{selectedbank == '' ? <FloatingLabelInput
							containerStyles={styles.input}
							editable={false}
							label={t('strings:bank_name')}


							keyboardType='default'

							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

							maxLength={20}
						/> : <FloatingLabelInput
							containerStyles={styles.input}
							editable={false}
							label={t('strings:bank_name')}


							keyboardType='default'

							value={selectedbank}
							onChangeText={(text) => setselectedbank(text)}
							borderColor="gray"
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
							maxLength={20}
						/>}


						<FloatingLabelInput
							containerStyles={styles.input}
							label={t('strings:lbl_ifsc_code')}
							editable={false}


							keyboardType='default'
							value={IFSC}
							onChangeText={(text) => setIFSC(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


							maxLength={20}
						/>

						<Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_upload_cancelled_cheque')}</Text>


						<View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15, borderWidth: 1.8, borderColor: "#D3D3D3" }}>
							{chequeImage != null ? <Text style={{ color: 'black', right: width / 2 }}>{chequeImage.name.substring(0, 10)}</Text> : null}
							{chequeImage != null ?

								<ImageWithModal imageUri={chequeImage.uri} />
								: <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />

							}
						</View>





						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_nominee_details')}


							editable={false}
							keyboardType='default'
							value={nomineename}
							onChangeText={(text) => setnomineename(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>

						<FloatingLabelInput
							containerStyles={styles.input}

							label=" Selected Nominee DOB"


							editable={false}
							keyboardType='default'
							value={nomineedate}
							// onChangeText={(text) => setnomineedate(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}


						/>


						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_mobile_number')}
							editable={false}
							keyboardType='number-pad'
							value={nomineemobileno}
							onChangeText={(text) => setnomineemobileno(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>




						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_email')}
							editable={false}


							keyboardType='email-address'
							value={nomineeemail}
							onChangeText={(text) => setnomineeemail(text)}
							borderColor="gray"
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>



						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_address')}
							editable={false}



							keyboardType='email-address'
							value={nomineeaddress}
							onChangeText={(text) => setnomineeaddress(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>


						<FloatingLabelInput
							containerStyles={styles.input}

							label={t('strings:lbl_relationship_with_you')}
							editable={false}


							keyboardType='default'
							value={relationwithyou}
							onChangeText={(text) => setrelationwithyou(text)}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}

						/>

						<View style={{ display: 'flex', width: width / 1, alignItems: 'center', marginVertical: 20, flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 5 }}>
							<Buttons
								label="Edit"
								onPress={() => {
									// Check if the data is valid before navigating
									//  navigation.navigate('NewUserKyc', { userData: userData })
									// validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
									//validateAndNavigate()
									updateDataInAsyncStorage();
								}}
								variant="filled" // or any other variant you want to use
								width={180} // specify the width
								icon={require('../../../assets/images/edit.png')} // provide the path to your icon
								iconWidth={40} // specify the icon width
								iconHeight={25} // specify the icon height
								iconGap={10}
							// specify the gap between the label and the icon
							/>
							<Buttons
								label="Submit"
								onPress={() => {
									// Check if the data is valid before navigating
									//  navigation.navigate('NewUserKyc', { userData: userData })
									// validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
									//validateAndNavigate()
									callUploadAndThenAnotherFunction();
								}}
								variant="filled" // or any other variant you want to use
								width={180} // specify the width
								icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
								iconWidth={50} // specify the icon width
								iconHeight={20} // specify the icon height
								iconGap={10}
							// specify the gap between the label and the icon
							/>


						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView >
		</SafeAreaView>
		// <Text>Helo</Text>
	)
}

export default PreviewUserRegistration

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconButton: {
		backgroundColor: 'yellow', // Replace 'yourBackgroundColor' with the desired color
		borderRadius: 50,
		alignSelf: 'center',
	},
	input: {
		padding: 5,
		height: height / 13.5,
		margin: 25,
		marginTop: 0,
		color: 'black',
		borderRadius: 5,
		backgroundColor: '#fff',
		bottom: -15,
		borderWidth: 1.5,
		borderColor: '#D3D3D3',
		paddingVertical: 5,
		paddingHorizontal: 0,

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
		marginTop: 20,

	},
})