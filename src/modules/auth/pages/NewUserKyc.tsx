import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, ActivityIndicator, Alert, BackHandler, ToastAndroid } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, Button, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { CurrentRenderContext } from '@react-navigation/native';
import Popup from '../../../components/Popup';
import Loader from '../../../components/Loader';
import colors from '../../../../colors'
import { NavigationProps } from '../../../utils/interfaces';
import { newUserFields } from '../fields/newUserFields';
import { newUserKycField } from '../fields/newUserKycFields';
import Field from '../../../components/Field';
const NewUserKyc = ({ navigation}: NavigationProps) => {
	// const { userData } = route.params;
	// console.log('==================%%%==================', userData.selectedCity);
	// console.log('==================%%%==================', userData.selectedDistrict);
	// console.log('==================%%%==================', userData.selectedState);
	const { t } = useTranslation();
	const [currentaddres, setcurrentaddres] = useState('Select');
	const [profession, setprofession] = useState("Select");
	const [subprofession, setsubprofession] = useState("Select");
	const [maritialStatus, setmaritialStatus] = useState('Select');
	const [maritialstatusId, setmaritialstatusId] = useState('');
	const [loyalty, setloyalty] = useState('Select');
	const [Number, setNumber] = useState('');
	const [selfieData, setSelfieData] = useState(null);
	const [idProofFrontData, setIdProofFrontData] = useState(null);
	const [idProofBackData, setIdProofBackData] = useState(null);
	const [panData, setPanData] = useState(null);
	const [pancardno, setpancardno] = useState('');
	const [aadharcardno, setaadharcardno] = useState('');
	const [annualincome, setannualincome] = useState()
	const [address, setaddress] = useState('');
	const [street, setstreet] = useState('');
	const [landmark, setlandmark] = useState('');
	const [pincode, setpincode] = useState('');
	const [currentcityid, securrenttcityid] = useState('');
	const [currentdistrictId, setcurrentdistrictId] = useState('');
	const [currentstateid, setcurrentstateid] = useState('');
	const [currentselectedState, setCurrentselectedState] = useState('');
	const [currentselectedDistrict, setCurrentselectedDistrict] = useState('');
	const [currentselectedCity, setCurrentselectedCity] = useState('');
	const [currentOtherCity, setCurrentOtherCity] = useState('');
	const [professiondata, setprofessiondata] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [citylistpicker, setcitylistpicker] = useState(null);
	const [redendering, setredendering] = useState(0);
	const [subprofessiondata, setsubprofessiondata] = useState([]);
	const [isAadharValid, setIsAadharValid] = useState(true);
	const [isPanValid, setIsPanValid] = useState(true);
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showTextFields, setShowTextFields] = useState(false);
	const [schmename, setschmename] = useState('');
	const [resonforlikingschme, setresonforlikingschme] = useState('');

	const [schemes, setSchemes] = useState([{ schmename: '', resonforlikingschme: '' }]);
	const [addttextfield, setaddttextfield] = useState(false);
	const [schemeData, setSchemeData] = useState({
		1: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		2: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		3: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		4: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
		5: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
	});


	const [open, setOpen] = useState(false);
	const [value, setValue] = useState();
	const [items, setItems] = useState([
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' }
	]);
	const [loading, setLoading] = useState(false);

	// const getsubprofession = async () => {
	//     try {

	//         const subprofession = await Getsubprofession();
	//         console.log('====================================');
	//         console.log(subprofession);
	//         console.log('====================================');
	//         setsubprofessiondata([subprofession[0], subprofession[1]]);

	//     } catch (error) {
	//         console.log(error);
	//         throw error;
	//     }

	// }



	// const validateAadhar = (aadhar) => {
	// 	// Use a regular expression to check if the Aadhar card number is valid.
	// 	const aadharPattern = /^\d{12}$/;
	// 	return aadharPattern.test(aadhar);
	// };

	// const handleAadharBlur = () => {
	// 	const isValid = validateAadhar(aadharcardno);
	// 	setIsAadharValid(isValid);
	// };

	// const validatePan = (pan) => {
	// 	// Use a regular expression to check if the PAN card number is valid.
	// 	const panPattern = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
	// 	return panPattern.test(pan);
	// };

	// const handlePanBlur = () => {
	// 	const upperCasePan = pancardno.toUpperCase(); // Convert to uppercase
	// 	const isValid = validatePan(upperCasePan);
	// 	setIsPanValid(isValid);
	// 	setpancardno(upperCasePan); // Update the state with uppercase value
	// };

	// async function Gettingprofession(params) {

	// 	try {
	// 		const professionfromapi = await GetProfession();
	// 		setprofessiondata([professionfromapi[0], professionfromapi[1], professionfromapi[2],]);
	// 		// console.log("==%%%%===", professiondata);
	// 	}
	// 	catch (error) {
	// 		console.error('Error fetching suggestions:', error);
	// 	}
	// 	finally {
	// 		// After the API call (whether it succeeds or fails), hide the loader
	// 		setLoading(false);
	// 	}

	// }
	let options = {
		saveToPhotoes: true,
		mediaType: 'photo',
		saveToPhotos: true,
		selectionLimit: 1,
		quality: 0.5,
		includeBase64: true,
		storageOption: {
			skipbackup: true,
			path: 'images',
		}
	};
	// const openCamera = async (documentType, onCapture) => {
	// 	let photo;
	// 	let newPhoto;
	// 	let options = { quality: 5, maxWidth: 500, maxHeight: 500, includeBase64: true, mediaType: 'photo', noData: true, };
	// 	try {
	// 		await launchCamera(
	// 			options,
	// 			response => {
	// 				if (response.didCancel) {
	// 					console.log("Camera was canceled");
	// 				} else if (response.error) {
	// 					console.error("Camera error: ", response.error);
	// 				} else {
	// 					console.log(response, ">>>>>camera issue fixed");
	// 					if (response.assets.length) {
	// 						photo = response.assets[0];
	// 						newPhoto = {
	// 							uri: photo.uri,
	// 							type: photo.type,
	// 							name: photo.fileName,
	// 						};

	// 						switch (documentType) {
	// 							case "Selfie":
	// 								setSelfieData(newPhoto);
	// 								console.log(selfieData);
	// 								break;
	// 							case "IdProofFront":
	// 								setIdProofFrontData(newPhoto);
	// 								break;
	// 							case "IdProofBack":
	// 								setIdProofBackData(newPhoto);
	// 								break;
	// 							case "Pan":
	// 								setPanData(newPhoto);
	// 								break;
	// 							default:
	// 								console.log("Unknown document type");
	// 						}
	// 					}


	// 				}
	// 			}
	// 		);
	// 	} catch (e) {
	// 		console.log(e, "Errror");
	// 	}

	// 	console.log(">>>>>>>>>>>>>>>>3");

	// 	// Handle the captured data based on the document type

	// 	// Call the provided callback function to further process the data
	// 	// if (typeof onCapture === 'function') {
	// 	//     onCapture(documentType, newPhoto);
	// 	// }
	// 	//}
	// };

	// const NewUserKycData = {
	// 	currentaddres,
	// 	profession,
	// 	subprofession,
	// 	maritialStatus,
	// 	maritialstatusId,
	// 	loyalty,
	// 	annualincome,
	// 	aadharcardno,
	// 	pancardno,
	// 	selfieData,
	// 	idProofFrontData,
	// 	idProofBackData,
	// 	panData,
	// 	address,
	// 	street,
	// 	landmark,
	// 	pincode,
	// 	currentselectedState,
	// 	currentselectedDistrict,
	// 	currentselectedCity,
	// 	currentcityid,
	// 	currentdistrictId,
	// 	currentstateid,
	// 	schemeData: {
	// 		1: { otherSchemeBrand: schemeData[1]?.otherSchemeBrand || '', abtOtherSchemeLiked: schemeData[1]?.abtOtherSchemeLiked || '' },
	// 		2: { otherSchemeBrand1: schemeData[2]?.otherSchemeBrand || '', abtOtherSchemeLiked1: schemeData[2]?.abtOtherSchemeLiked || '' },
	// 		3: { otherSchemeBrand2: schemeData[3]?.otherSchemeBrand || '', abtOtherSchemeLiked2: schemeData[3]?.abtOtherSchemeLiked || '' },
	// 		4: { otherSchemeBrand3: schemeData[4]?.otherSchemeBrand || '', abtOtherSchemeLiked3: schemeData[4]?.abtOtherSchemeLiked || '' },
	// 		5: { otherSchemeBrand4: schemeData[5]?.otherSchemeBrand || '', abtOtherSchemeLiked4: schemeData[5]?.abtOtherSchemeLiked || '' },
	// 	},
	// 	//         otherSchemeBrand:schemeData[1]?.otherSchemeBrand,      
	// 	//         otherSchemeBrand2: schemeData[3]?.otherSchemeBrand,
	// 	//         otherSchemeBrand3: schemeData[4]?.otherSchemeBrand,
	// 	//         otherSchemeBrand4: schemeData[5]?.otherSchemeBrand,
	// 	//         abtOtherSchemeLiked: schemeData[1]?.abtOtherSchemeLiked ,
	// 	// abtOtherSchemeLiked1: schemeData[2]?.abtOtherSchemeLiked,
	// 	// abtOtherSchemeLiked2: schemeData[3]?.abtOtherSchemeLiked,
	// 	// abtOtherSchemeLiked3: schemeData[4]?.abtOtherSchemeLiked,
	// 	// abtOtherSchemeLiked4: schemeData[5]?.abtOtherSchemeLiked,



	// };

	// async function updateNewUserKycDataInPreviewSummary(NewUserKycData) {
	// 	try {
	// 		// setIsLoading(true);
	// 		// Retrieve the existing 'previewSummaryData' from AsyncStorage
	// 		const previewSummaryDataString = await AsyncStorage.getItem('previewSummaryData');

	// 		if (previewSummaryDataString) {
	// 			// Parse the JSON string to an object
	// 			const previewSummaryData = JSON.parse(previewSummaryDataString);

	// 			// Ensure that the object structure is properly initialized
	// 			if (!previewSummaryData.fullData) {
	// 				previewSummaryData.fullData = {};
	// 			}

	// 			// Ensure that the object structure for 'NewUserKycData' is properly initialized
	// 			if (!previewSummaryData.fullData.NewUserKycData) {
	// 				previewSummaryData.fullData.NewUserKycData = {};
	// 			}

	// 			// Update the 'NewUserKycData' property directly with the provided 'newUserData'
	// 			previewSummaryData.fullData.NewUserKycData = NewUserKycData;


	// 			// Convert the updated object back to a JSON string
	// 			const updatedPreviewSummaryDataString = JSON.stringify(previewSummaryData);

	// 			// Save the updated 'previewSummaryData' back to AsyncStorage
	// 			await AsyncStorage.setItem('previewSummaryData', updatedPreviewSummaryDataString);

	// 			console.log('Updated NewUserKycData in previewSummaryData:', NewUserKycData);
	// 		} else {
	// 			console.log('No previewSummaryData found in AsyncStorage');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error updating NewUserKycData in previewSummaryData:', error);
	// 	} finally {
	// 		// setIsLoading(false);
	// 	}
	// }


	//Combine user data and form data into one object
	// const fullData = {
	// 	userData,
	// 	NewUserKycData,
	// };
	// //================================VALIDATION FUNCTION AND NAVIAGTION ON NEXT PAGE ==============================================//
	// const validateFields = async () => {
	// 	if (!currentaddres || currentaddres === "Select") {
	// 		ToastAndroid.show('Select current address same as Permanent address or not.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!address) {
	// 		ToastAndroid.show('Please enter your current address.', ToastAndroid.SHORT);
	// 		return false;
	// 	}

	// 	if (currentselectedCity === "Other" && !currentOtherCity) {
	// 		ToastAndroid.show('Please enter other city name.', ToastAndroid.SHORT);
	// 		return false;
	// 	}

	// 	if (!street) {
	// 		ToastAndroid.show('Please enter street colony or locality name.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!pincode && pincode != null) {
	// 		ToastAndroid.show('Please enter a pincode and select a pincode to get state and district', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!profession || profession === "Select") {
	// 		ToastAndroid.show('Profession field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!maritialStatus || maritialStatus === '0') {
	// 		ToastAndroid.show('Marital Status field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!loyalty || loyalty === 'Select') {
	// 		ToastAndroid.show('Loyalty field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!annualincome) {
	// 		ToastAndroid.show('Annual Business potenial field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!selfieData) {
	// 		ToastAndroid.show('Please upload your selfie', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!aadharcardno) {
	// 		ToastAndroid.show('Aadhar Card Number field is empty. Please fill it..', ToastAndroid.SHORT);
	// 		return false;
	// 	}


	// 	if (!idProofFrontData) {
	// 		ToastAndroid.show('Aadhar Front Image not taken.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!idProofBackData) {
	// 		ToastAndroid.show('Aadhar Back Image not taken.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (pancardno) {
	// 		if (pancardno.length < 10) {
	// 			ToastAndroid.show('Please enter a valid PAN Card Number.', ToastAndroid.SHORT);
	// 			return false;
	// 		}

	// 		if (!validatePan(pancardno)) {
	// 			ToastAndroid.show('Please enter a valid PAN Card Number.', ToastAndroid.SHORT);
	// 			return false;
	// 		}
	// 	}

	// 	if (!currentselectedCity) {
	// 		ToastAndroid.show('Current City field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!currentselectedDistrict) {
	// 		ToastAndroid.show('Current District field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	if (!currentselectedState) {
	// 		ToastAndroid.show('Current State field is empty. Please fill it.', ToastAndroid.SHORT);
	// 		return false;
	// 	}
	// 	else {
	// 		// console.log('====================================');
	// 		// console.log(fullData);
	// 		// console.log('====================================');
	// 		// const fullData = JSON.stringify(fullData);
	// 		// console.log("+++++++++++++++++++", fullData);
	// 		// await AsyncStorage.setItem("previewSummaryData", fullData);
	// 		// log
	// 		updateNewUserKycDataInPreviewSummary(NewUserKycData);
	// 		// updateNewUserKycDataInPreviewSummary(userData);
	// 		const updatedValue = await AsyncStorage.getItem('previewSummaryData');
	// 		// console.log('Updated Value in AsyncStorage (previewSummaryData +++++NEWUSERkYC++++++++++++):', NewUserKycData);
	// 		navigation.navigate('NomineePage', { fullData });
	// 	}
	// 	// Add validation checks for other fields

	// 	return true;
	// };
	//===============================VALIDATION FUNCTION ENDS =================================================================//

	//=========== FUNCTION FOR GETTING THE  CITY LIST ON USING THE DISTRICT ID =================================//


	//=========== ***********************END OF THE ABOVE FUNCTION =================================//
	// const openImagePicker = async (documentType, onCapture) => {
	// 	// const granted = await PermissionsAndroid.request(
	// 	//     PermissionsAndroid.PERMISSIONS.CAMERA,
	// 	// );
	// 	// const granted1 = await PermissionsAndroid.request(
	// 	//     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
	// 	// );
	// 	// const granted2 = await PermissionsAndroid.request(
	// 	//     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
	// 	// );
	// 	// if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 	const options = {
	// 		mediaType: 'photo',
	// 		quality: 0.5,
	// 		cameraType: 'back',
	// 		saveToPhotos: true,
	// 	};

	// 	const result = await launchImageLibrary(options);

	// 	if (result.didCancel) {
	// 		console.log('User cancelled image picker');
	// 	} else if (result.error) {
	// 		console.log('ImagePicker Error: ', result.error);
	// 	} else {
	// 		const photo = result.assets[0];
	// 		const newPhoto = { uri: photo.uri, type: photo.type, name: photo.fileName };

	// 		// Handle the captured data based on the document type
	// 		switch (documentType) {
	// 			case 'Selfie':
	// 				setSelfieData(newPhoto);
	// 				break;
	// 			case 'IdProofFront':
	// 				setIdProofFrontData(newPhoto);
	// 				break;
	// 			case 'IdProofBack':
	// 				setIdProofBackData(newPhoto);
	// 				break;
	// 			case 'Pan':
	// 				setPanData(newPhoto);
	// 				break;
	// 			default:
	// 				console.log('Unknown document type');
	// 		}

	// 		// Call the provided callback function to further process the data
	// 		if (typeof onCapture === 'function') {
	// 			onCapture(documentType, newPhoto);
	// 		}
	// 		//}
	// 	}
	// };
	// const handleButtonPress = () => {
	// 	setaddttextfield(true);
	// };


	// const handleInputChange = (index, fieldName, value) => {
	// 	const updatedSchemes = [...schemes];
	// 	updatedSchemes[index][fieldName] = value;
	// 	setSchemes(updatedSchemes);
	// };

	// const handleIconButtonPress = () => {
	// 	// Add a new set of text inputs
	// 	if (schemes.length < 5) {
	// 		setSchemes([...schemes, { schmename: '', resonforlikingschme: '' }]);
	// 	}
	// };
	
	return (
		<SafeAreaView style={{ backgroundColor: "white" }}>
			<ScrollView style={{ backgroundColor: "white" }} >
				<View style={{ backgroundColor: "white" }} >
					<View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2, justifyContent: 'space-evenly', alignItems: 'center', padding: 20, marginLeft: 1}}>
						<Avatar.Image  size={84} source={require('../../../assets/images/ac_icon.png')}/>
						<View style={{flexDirection: 'column', padding: 8, height: height / 10, justifyContent: "center"}}>
							<Text style={{ color: 'grey' }}>Contact</Text>
							<Text style={{ color: 'grey' }}>Unique ID</Text>
						</View>

					</View>
					{isLoading == true ? <View style={{ flex: 1 }}>

						<Loader isLoading={isLoading} />
					</View> : null}
					{isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
						<Text>{popupMessage}</Text>
						{/* // <Text>ICORRECT OTP</Text> */}
					</Popup>
					)}
					{newUserKycField.map(field => (
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
        ))
					}
					{/* <Text style={{ color: 'black', marginLeft: 20, }}>{t('strings:is_current_address_different')}</Text> */}
					{/* <View style={{ backgroundColor: 'transparent', height: height / 20, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 3, borderColor: "#D3D3D3", borderWidth: 1.5, width: width / 1.15 }}>
						<Picker
							mode='dropdown'
							style={{ color: 'black', bottom: 10 }}
							selectedValue={currentaddres}
							onValueChange={(itemValue, itemIndex) => {
								setcurrentaddres(itemValue);
								// Set text input values to null when "Yes" is selected
								if (itemValue == 'no') {
									setaddress('');
									setstreet('');
									setlandmark('');
									setpincode('');
									setCurrentselectedState('');
									setCurrentselectedDistrict('');
									setCurrentselectedCity('');
									setcurrentstateid('');
									setcurrentdistrictId('');
									securrenttcityid('');
									setCurrentOtherCity('')
								}
								if (itemValue == 'yes') {
									setaddress(userData?.address);
									setstreet(userData?.street);
									setlandmark(userData?.landmark);
									setpincode(userData?.pincode);
									setCurrentselectedCity(userData?.selectedCity);
									setCurrentselectedDistrict(userData?.selectedDistrict);
									setCurrentselectedState(userData?.selectedState);
									setcurrentstateid(userData?.permananetsateid);
									setcurrentdistrictId(userData?.permananetdistrictId);
									securrenttcityid(userData?.permananetcityid);
									setCurrentOtherCity(userData?.otherCity)
									console.log('====================================');
									console.log(userData.pincode);
									console.log(pincode);
									// console.log('====================####================', currentselectedCity);
									//  console.log('====================####================', currentselectedDistrict);
									//  console.log('====================####================', currentselectedState);
								}
							}}>
							<Picker.Item label="Select" value="Select" />
							<Picker.Item label="Yes" value="yes" />
							<Picker.Item label="No" value="no" />
						</Picker>

					</View> */}

					{/* {currentaddres == 'Select' ? <></> : <>
						<View style={styles.floatingcontainerstyle}>
							<FloatingLabelInput
								label="Current House Flat/block no"
								editable={currentaddres === 'no'}
								keyboardType='default'
								value={address}
								onChangeText={(text) => setaddress(text)}
								containerStyles={styles.input}
								staticLabel
								labelStyles={styles.labelStyles}
								inputStyles={{
									color: 'black',
									paddingHorizontal: 10
								}}
							/>
						</View>
						<View style={styles.floatingcontainerstyle}>
							<FloatingLabelInput
								editable={currentaddres == 'no'}
								label="Current Street/ Colony/Locality Name *"
								keyboardType='default'
								value={street}
								onChangeText={(text) => setstreet(text)}
								containerStyles={styles.input}
								staticLabel
								labelStyles={styles.labelStyles}
								inputStyles={{
									color: 'black',
									paddingHorizontal: 10
								}}
							/>
						</View>
						<View style={styles.floatingcontainerstyle}>
							<FloatingLabelInput
								editable={currentaddres == 'no'}
								label="Landmark"
								keyboardType='default'
								value={landmark}
								onChangeText={(text) => setlandmark(text)}
								containerStyles={styles.input}
								staticLabel
								labelStyles={styles.labelStyles}
								inputStyles={{
									color: 'black',
									paddingHorizontal: 10
								}}
							/>
						</View> */}
						{/* <Text style={{ color: 'black', marginLeft: 23, }}>{t('strings:lbl_pin_code_mandatory')}</Text> */}
						{/* {currentaddres === 'yes' ? <View style={styles.floatingcontainerstyle}><Text style={styles.input}>{userData.pincode}</Text></View>
							:
							<> */}
								{/* <DropDownPicker
									mode="BADGE"
									showBadgeDot={true}
									searchable={true}
									loading={isLoading}
									searchPlaceholder='Type your pinocde'
									label={value}
									placeholder={pincode === null ? 'Search Pincode' : `Searched Pincode: ${pincode}`}
									searchablePlaceholder="Search Pincode"
									translation=
									{t('auth:newuser:Secondpagepincode')}

									// placeholder={value}
									searchTextInputProps={{
										maxLength: 6,
										keyboardType: 'number-pad',
									}}
									badgeStyle={(item, index) => ({
										padding: 5,
										backgroundColor: item.value ? 'red' : 'grey',

									})}
									badgeProps={{
										activeOpacity: 1.5
									}}

									badgeSeparatorStyle={{
										width: 30,
									}}
									badgeColors={['red']}
									badgeDotColors={['red']}
									listMode="SCROLLVIEW"
									scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
									open={open}
									items={suggestions.map((item) => ({
										label: item.pinCode,
										value: item.pinCode,
									}))}
									setOpen={setOpen}
									value={pincode}
									onChangeItem={(item) => {

										setpincode(item.value);
									}}
									onChangeSearchText={(text) => pincodefunction(text)}
									dropDownContainerStyle={{
										width: width / 1.1,
										height: height / 5,
										padding: 10,
										left: 18.5,
										top: 60,
										borderWidth: 0.5,
										borderTopWidth: 0,
										justifyContent: 'center',
										elevation: 0,
										backgroundColor: "#D3D3D3",
										borderColor: '#D3D3D3'
									}}
									style={{
										backgroundColor: 'transparent',
										elevation: 50,
										opacity: 0.9,
										borderWidth: 2.5,
										margin: 20,
										width: width / 1.15,
										height: height / 18,
										alignSelf: 'center',
										bottom: 10,
										elevation: 0,
										margintop: 50,
										borderColor: '#D3D3D3',
										alignSelf: 'flex-start'
									}} */}
								{/* />
							</>} */}
						
						{/* <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_state')}</Text> */}
						{/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}> */}
							{/* <Picker
                                style={{ color: 'black' }}
                                selectedValue={currentselectedState}
                                enabled={currentaddres === 'no'}
                                onValueChange={(itemValue, itemIndex) => setCurrentselectedState(itemValue)}
                            >
                                {IndianStates.map((state, index) => (
                                    <Picker.Item key={index} label={state} value={state} />
                                ))}     
                            </Picker> */}

							{/* {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedState}</Text> :
								<Text style={{ color: 'black', margin: 15 }}>{currentselectedState}</Text>}

						</View>
						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('strings:select_district')}</Text>
						<View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>



							{currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedDistrict}</Text> :
								<Text style={{ color: 'black', margin: 15 }}>{currentselectedDistrict}</Text>}

						</View>

						<Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_city')}</Text>
						{currentaddres === 'no' || currentselectedCity === null ? <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>
							<Picker
								mode='model'
								style={{ color: 'black' }}
								selectedValue={currentselectedCity}
								onValueChange={(itemValue, itemIndex) => {
									const selectedItem = citylistpicker[itemIndex];
									setCurrentselectedCity(itemValue);
									securrenttcityid(selectedItem.id);
								}}>

								{Array.isArray(citylistpicker) && citylistpicker.length >= 0 ? (
									citylistpicker.map(item => (
										<Picker.Item
											key={item.id}
											label={item.cityName}
											value={item.cityName}
										/>
									))
								) : (

									<Picker.Item label={currentselectedCity} value={currentselectedCity} />


								)}
							</Picker>

						</View> : <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>



							{currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedCity}</Text> :
								<Text style={{ color: 'black', margin: 15 }}>{currentselectedCity}</Text>}

						</View>}
					</>} */}

					{/* {currentselectedCity === "Other" && <FloatingLabelInput
						label={t('strings:lbl_city_mandatory')}
						value={currentOtherCity}
						onChangeText={(text) => setCurrentOtherCity(text)}
						keyboardType="default"
						containerStyles={styles.input}
						staticLabel
						labelStyles={styles.labelStyles}
						inputStyles={{
							color: 'black',
							paddingHorizontal: 10,
						}}
					/>} */}

					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_profession')}</Text> */}

					{/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>
						<Picker
							mode='dropdown'
							style={{ color: 'black' }}
							selectedValue={profession}
							onValueChange={(itemValue, itemIndex) =>
								setprofession(itemValue)
							}>
							<Picker.Item label="Select" value="" />
							{professiondata.map(item => (
								<Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
							))}

						</Picker>

					</View> */}


					{/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 2, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={subprofession}
                            onValueChange={(itemValue, itemIndex) =>
                                setsubprofession(itemValue)
                            }>
                            <Picker.Item label="Select" value="" />
                            {subprofessiondata.map(item => (
                                <Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
                            ))}

                        </Picker>

                    </View> */}
					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_marital_status')}</Text> */}

					{/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>


						<Picker
							mode='dropdown'
							style={{ color: 'black' }}
							selectedValue={maritialStatus}
							onValueChange={(itemValue, itemIndex) => {
								// setmaritialstatusId(itemValue) 
								const maritialStatusId = itemValue === "Married" ? '1' : '2';
								setmaritialStatus(itemValue);
								setmaritialstatusId(maritialStatusId);


							}
							}>
							<Picker.Item label="Select" value='0' />
							<Picker.Item label="Married" value="Married" />
							<Picker.Item label="Unmarried" value="Unmarried" />


						</Picker>

					</View> */}


					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:already_enrolled_into_loyalty_scheme')}</Text> */}

					{/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 2, borderColor: "#D3D3D3", elevation: 0, width: width / 1.15 }}>


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

					</View> */}




					{/* {loyalty == 'Yes' ?
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
						</View> : null} */}


					{/* <View style={styles.floatingcontainerstyle}>
						<FloatingLabelInput

							label={t('strings:annual_business_potential')}
							value={annualincome}
							onChangeText={(text) => setannualincome(text)}
							keyboardType='number-pad'
							containerStyles={styles.input}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: 'black',
								paddingHorizontal: 10,
							}}
						/>
					</View> */}


					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_update_your_selfie')}</Text> */}
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginBottom: 5, elevation: 2 }}>

						<View style={{ backgroundColor: 'transparent', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'space-between', flexDirection: 'row', width: width / 1.15, borderColor: '#D3D3D3', borderWidth: 2, elevation: 0 }}>
							{selfieData != null ? <Text style={{ color: 'black', paddingLeft: 10 }}>{selfieData.name.substring(0, 30)}</Text> : null}
							{selfieData != null ? <TouchableOpacity onPress={() => openCamera('Selfie', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})} >
								<Image resizeMode="cover" source={{ uri: selfieData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
							</TouchableOpacity> : <IconButton
								icon="camera"
								animated='true'

								size={20}
								onPress={() => openCamera('Selfie', (documentType, data) => {
									// Handle the captured data for the 'Selfie' document type here
								})}
								style={{ left: width / 1.35 }}
							/>}
						</View>
						<IconButton
							icon="link"

							size={20}
							onPress={() => openImagePicker('Selfie', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})}

						/>

					</View> */}
					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:update_aadhar_voter_id_dl_front')}</Text> */}
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginBottom: 5, elevation: 2 }}>

						<View style={{ backgroundColor: 'transparent', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'space-between', flexDirection: 'row', width: width / 1.15, borderColor: '#D3D3D3', borderWidth: 2, elevation: 0 }}>

							{idProofFrontData != null ? <Text style={{ color: 'black', paddingLeft: 10 }}>{idProofFrontData.name.substring(0, 30)}</Text> : null}
							{idProofFrontData != null ? <TouchableOpacity onPress={() => openCamera('IdProofFront', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})} >
								<Image resizeMode="cover" source={{ uri: idProofFrontData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
							</TouchableOpacity> :
								<IconButton
									icon="camera"
									animated='true'

									size={20}
									onPress={() => openCamera('IdProofFront', (documentType, data) => {
										// Handle the captured data for the 'Selfie' document type here
									})}
									style={{ left: width / 1.35 }}
								/>}
						</View>
						<IconButton
							icon="link"

							size={20}
							onPress={() => openImagePicker('IdProofFront', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})}

						/>

					</View> */}

					{/* <Text style={{ color: 'black', marginLeft: 24, marginTop: 5 }}>{t('strings:update_aadhar_voter_id_dl_back')}</Text> */}

					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 10, marginBottom: 5, }}>

						<View style={{ backgroundColor: 'transparent', height: height / 15, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', flexDirection: 'row', width: width / 1.15, borderColor: '#D3D3D3', borderWidth: 2, elevation: 0 }}>
							{idProofBackData != null ? <Text style={{ color: 'black', paddingLeft: 10 }}>{idProofBackData.name.substring(0, 30)}</Text> : null}
							{idProofBackData != null ?
								<TouchableOpacity onPress={() => openCamera('IdProofBack', (documentType, data) => {
									// Handle the captured data for the 'Selfie' document type here
								})} >
									<Image resizeMode="cover" source={{ uri: idProofBackData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
								</TouchableOpacity> :
								<IconButton
									icon="camera"
									animated='true'

									size={20}
									onPress={() => openCamera('IdProofBack', (documentType, data) => {
										// Handle the captured data for the 'Selfie' document type here
									})}
									style={{ left: width / 1.35 }}
								/>}
						</View>
						<IconButton
							icon="link"

							size={20}
							onPress={() => openImagePicker('IdProofBack', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})}
						/>

					</View> */}
					{/* <View style={styles.floatingcontainerstyle}>

						<FloatingLabelInput

							label={t('strings:update_aadhar_voter_id_dl_manually')}
							value={aadharcardno}
							onChangeText={(text) => setaadharcardno(text)}
							keyboardType='number-pad'

							containerStyles={[styles.input]}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: isAadharValid ? 'black' : 'red',
								paddingHorizontal: 10,
							}}
							onBlur={handleAadharBlur}

							maxLength={12}
						/>
						{!isAadharValid && (
							<Text style={{ color: 'red', left: 20, }}>Please enter a valid Aadhar card number.</Text>
						)}
					</View> */}
					{/* <Text style={{ color: 'black', marginLeft: 24, marginBottom: 12 }}>{t('strings:update_pan_card_front')}</Text> */}
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, }}>

						<View style={{ backgroundColor: 'transparent', height: height / 15, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', flexDirection: 'row', width: width / 1.15, bottom: 10, borderColor: '#D3D3D3', borderWidth: 2, elevation: 0 }}>
							{panData != null ? <Text style={{ color: 'black', paddingLeft: 10, }}>{panData.name.substring(0, 30)}</Text> : null}
							{panData != null ? <TouchableOpacity onPress={() => openCamera('Pan', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})} >
								<Image resizeMode="cover" source={{ uri: panData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
							</TouchableOpacity> : <IconButton
								icon="camera"
								animated='true'

								size={20}
								onPress={() => openCamera('Pan', (documentType, data) => {
									// Handle the captured data for the 'Selfie' document type here
								})}
								style={{ left: width / 1.35 }}
							/>}
						</View>
						<IconButton
							icon="link"

							size={20}
							onPress={() => openImagePicker('Pan', (documentType, data) => {
								// Handle the captured data for the 'Selfie' document type here
							})}
						/>

					</View> */}
					{/* <View style={styles.floatingcontainerstyle}>
						<FloatingLabelInput

							label={t('strings:update_pan_number_manually')}
							value={pancardno}
							onChangeText={(text) => setpancardno(text)}
							keyboardType='default'

							containerStyles={[styles.input]}
							staticLabel
							labelStyles={styles.labelStyles}
							inputStyles={{
								color: isPanValid ? 'black' : 'red',
								paddingHorizontal: 10,
							}}

							onBlur={handlePanBlur}
							maxLength={10}
						/>
						{!isPanValid && (
							<Text style={{ color: 'red', left: 20, }}>Please enter a valid PAN card number.</Text>
						)}
					</View> */}
					<View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
						<Buttons
							label="Next"
							onPress={() => navigation.navigate('Credentials')}
							variant="filled"
							width={350}
							icon={require('../../../assets/images/arrow.png')}
							iconWidth={50}
							iconHeight={20}
							iconGap={10}
						/>
					</View>
				</View>

			</ScrollView>
		</SafeAreaView>
	)
}

export default NewUserKyc

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	schemeContainer: {
		marginVertical: 10,
		width: width / 1.05,
	},
	iconButton: {
		backgroundColor: colors.yellow, // Replace 'yourBackgroundColor' with the desired color
		borderRadius: 50,
		alignSelf: 'center',
	},
	input: {

		padding: 5,
		height: height / 16,

		margin: 20,
		marginTop: 5,
		color: 'black',
		borderRadius: 5,
		backgroundColor: 'transparent',
		borderColor: '#D3D3D3',
		borderWidth: 2.5,
		elevation: 0,


		marginVertical: 10,
		bottom: -5
	},
	labelStyles: {
		backgroundColor: 'transparent',
		margin: 14,
	},
	floatingcontainerstyle: { width: width / 1.05, }
})