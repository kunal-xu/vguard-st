import { View, Text, ScrollView, TextInput, Image, Pressable, StyleSheet } from 'react-native'
import React, { useTransition } from 'react'
import { height, width } from '../../../utils/dimensions'
import { Colors } from '../../../utils/constants'
import PickerField from '../../../components/PickerField'
import { Picker } from '@react-native-picker/picker'
import DatePicker from '../../../components/DatePicker'
import Loader from '../../../components/Loader'
import ActionPickerModal from '../../../components/ActionPickerModal'
import { GetCityList, GetProfession, Getallbanks, Getsubprofession, PincodedetailList, fetchPinCodeData } from '../../../utils/apiservice'
import VguardRishtaUser from '../../common/modals/VguardRishtaUser'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'


const ReUpdateKyc = ({ navigation }) => {



	React.useEffect(() => {
		AsyncStorage.getItem('VGUSER').then(r => setVGuardRishtaUser(JSON.parse(r)));
		GetProfession().then(r => console.log(r))
		Getsubprofession().then(r => console.log(r, ">>>>>>>"))
		Getallbanks().then(response => {
			var bank = []
			response.map(r => bank.push({ label: r.bankNameAndBranch, value: r.bankId }))
			setBanks(bank);

		});
		GetProfession().then(response => {
			var profession = [{ label: 'Select Profession', value: 0 }]
			response.map(r => profession.push({ label: r.professionName, value: r.professionId }))
			setProfession(profession)
			console.log(profession, ">>>>>")
			AsyncStorage.getItem('reUpdateKycDetails').then(reUpdateKycDetails => {
				let parsedData = JSON.parse(reUpdateKycDetails)
				console.log(parsedData)
				parsedData.dob = parsedData.dob ? new Date(parsedData.dob) : null
				parsedData.bankDetail.nomineeDob = parsedData.bankDetail.nomineeDob ? new Date(parsedData.bankDetail.nomineeDob) : null
				parsedData.gender = parsedData.gender ? parsedData.gender?.trim() : "";
				parsedData.genderPos = parsedData.gender ? getPositionValue(parsedData.gender) : "";
				parsedData.isWhatsAppSame = parsedData?.contactNo === parsedData?.whatsappNo ? 1 : 0;
				parsedData?.city && setPerCityList([{ cityName: "Select City", id: "" }, { cityName: parsedData?.city, id: parsedData?.cityId }, { cityName: "Others", id: "100000" }]);
				parsedData?.currCity && setCurrCityList([{ cityName: "Select City", id: "" }, { cityName: parsedData.currCity, id: parsedData?.currCityId }, { cityName: "Others", id: "100000" }]);
				parsedData.professionId = parsedData?.professionId ? String(parsedData.professionId) : 0;
				parsedData.maritalStatus = parsedData?.maritalStatus ? Number(parsedData.maritalStatus) : 0;
				parsedData.annualBusinessPotential = parsedData?.annualBusinessPotential ? String(parsedData?.annualBusinessPotential) : ""

				setVGuardRishtaUser((re) => (parsedData));
			})
		});

	}, [])
	const [scheme, setScheme] = React.useState(0)
	const [isLoading, setIsLoading] = React.useState(false)
	const [uiSwitch, setUIswitch] = React.useState({ dob: false, currentpincode: false, pincode: false, Nomineedob: false })
	const [showPicker, setShowPicker] = React.useState({ isVisible: false, documentType: null })
	const [banks, setBanks] = React.useState([])
	const [profession, setProfession] = React.useState([])
	const [subProfession, setSubProfession] = React.useState([])
	const [pincode_suggestions, setPincode_Suggestions] = React.useState([])
	const [vGuardRishtaUser, setVGuardRishtaUser] = React.useState({
		appVersionCode: null,
		egvEnabled: null,
		currPinCodeId: null,
		welcomePosMsg: null,
		welcomePosErrorCode: 0,
		ecardPath: null,
		loginOtpUserName: null,
		isWhatsAppSame: 0,
		userCode: null,
		userId: null,
		emailId: null,
		retailerInfluencer: null,
		mobileNo: null,
		otp: null,
		preferredLanguage: null,
		preferredLanguagePos: null,
		referralCode: null,
		nameOfReferee: null,
		name: null,
		gender: null,
		genderPos: null,
		addDiff: -1,
		dob: null,
		contactNo: null,
		whatsappNo: null,
		permanentAddress: null,
		streetAndLocality: null,
		landmark: null,
		city: null,
		cityId: null,
		state: null,
		stateId: null,
		distId: null,
		dist: null,
		pinCode: null,
		pinCodeId: null,
		otherCity: null,
		airCoolerEnabled: null,
		maritalStatusId: null,
		maritalStatus: null,
		profession: null,
		professionId: null,
		subProfession: null,
		subProfessionId: null,
		currentAddress: null,
		currStreetAndLocality: null,
		currLandmark: null,
		currCity: null,
		otherCurrCity: null,
		currCityId: null,
		currDistId: null,
		currDist: null,
		currState: null,
		currStateId: null,
		currPinCode: null,
		enrolledOtherScheme: null,
		enrolledOtherSchemeYesNo: null,
		otherSchemeBrand: null,
		abtOtherSchemeLiked: null,
		otherSchemeBrand2: null,
		abtOtherSchemeLiked2: null,
		otherSchemeBrand3: null,
		abtOtherSchemeLiked3: null,
		otherSchemeBrand4: null,
		abtOtherSchemeLiked4: null,
		otherSchemeBrand5: null,
		abtOtherSchemeLiked5: null,
		annualBusinessPotential: null,
		bankDetail: {
			bankId: null,
			bankAccNo: null,
			bankAccHolderName: null,
			bankAccType: null,
			bankAccTypePos: null,
			bankNameAndBranch: null,
			bankIfsc: null,
			checkPhoto: null,
			nomineeName: null,
			nomineeDob: null,
			nomineeMobileNo: null,
			nomineeEmail: null,
			nomineeAdd: null,
			nomineeRelation: null,
			nomineeAccNo: null,
			bankDataPresent: null,

		},
		posSummary: null,
		kycDetails: {
			kycIdName: 'Aadhar Card',
			kycId: 1,
			selfie: null,
			aadharOrVoterOrDLFront: null,
			aadharOrVoterOrDlBack: null,
			aadharOrVoterOrDlNo: null,
			panCardFront: null,
			panCardBack: null,
			panCardNo: null,
			kycFlag: "0",
			gstFront: null,
			gstNo: null,
			gstYesNo: null,

		},
		otpType: null,
		rejectedReasonsStr: null,
		roleId: null,
		gstNo: null,
		gstYesNo: "",
		gstPic: null,
		categoryDealInID: null,
		categoryDealIn: null,
		aspireGift: null,
		firmName: null,
		tierFlag: null,
		fcmToken: null,
		active: null,
		welcomeBanner: {
			code: null,
			textMessage: null,
			videoPath: null,
			imgPath: null,
			vdoText: null,
		},
		panNumber: null,
		panImage: null,
		updateAccount: null,

	})
	const { t } = useTranslation();
	const [imageData, setImageData] = React.useState([{
		documentType: null,
		path: null,
		filename: null,
		type: null
	}])
	const [currentAddressFlag, setCurrentAddressFlag] = React.useState(0)
	const [currCityList, setCurrCityList] = React.useState([])
	const [perCityList, setPerCityList] = React.useState([]);
	const gender = [
		{ label: 'Select Gender*', value: 0 },
		{ label: 'Male', value: 1 },
		{ label: 'Female', value: 2 },
		{ label: 'Others', value: 3 },
	]
	const whatsappNo = [
		{ label: 'Select Whatsapp contact same as above?', value: 2 },
		{ label: 'Yes', value: 1 },
		{ label: 'No', value: 0 },

	]
	const maritalStatus = [
		{ label: 'Select Marital Status*', value: 0 },
		{ label: 'Married', value: 1 },
		{ label: 'Unmarried', value: 2 },

	]
	const currentAddressOption = [
		{ label: 'Select', value: 2 },
		{ label: 'Yes', value: 0 },
		{ label: 'No', value: 1 },

	]
	const accountType = [
		{ label: 'Type of Account', value: 0 },
		{ label: 'Current', value: 1 },
		{ label: 'Saving', value: 2 },

	]
	const alreadyenrolled = [
		{ label: 'Select already enrolled into loyalty scheme?', value: 0 },
		{ label: 'Yes', value: 1 },
		{ label: 'No', value: 2 },

	]
	const language = [
		{ label: 'English', value: 1 }
	]

	function openCamera(documentType) {
		console.log('OPENING CAMERA')
		setShowPicker({ isVisible: false })
		const options = {
			mediaType: 'photo',
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
		};

		launchCamera(options, response => {
			if (response.didCancel) {
				console.log('User cancelled camera');
			} else if (response.error) {
				console.log('Camera Error: ', response.error);
			} else {
				console.log(response)
				let imageUri = response.uri || response.assets?.[0]?.uri;
				switch (documentType) {
					case 'PROFILE':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])
						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))

						break;
					case 'ID_CARD_FRONT':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDLFront: imageUri } }))

						break;
					case 'ID_CARD_BACK':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlBack: imageUri } }))

						break;
					case 'PAN_CARD_FRONT':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardFront: imageUri } }))

						break;
					case 'CHEQUE':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, checkPhoto: imageUri } }))

						break;
					default:
						break;
				}
				// setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))
				console.log(imageUri);
			}
		});

	}
	async function openGallery(documentType) {
		console.log("openingGall")
		setShowPicker({ isVisible: false })
		const options = {
			mediaType: 'photo',
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
		};

		await launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('Image picker error: ', response.error);
			} else {
				let imageUri = response.uri || response.assets?.[0]?.uri;
				switch (documentType) {
					case 'PROFILE':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))

						break;
					case 'ID_CARD_FRONT':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDLFront: imageUri } }))

						break;
					case 'ID_CARD_BACK':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlBack: imageUri } }))

						break;
					case 'PAN_CARD_FRONT':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardFront: imageUri } }))

						break;
					case 'CHEQUE':
						setImageData([...imageData, { documentType: documentType, path: imageUri, filename: response.assets[0].fileName, type: response.assets[0].type }])

						setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, checkPhoto: imageUri } }))

						break;
					default:
						break;
				}
				//setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))
				//setSelectedImage(imageUri);
			}
		});

	}

	function InitatePreview() {
		AsyncStorage.setItem('IMAGE_DATA', JSON.stringify(imageData)).then(result => {
			AsyncStorage.setItem('VGUSER', JSON.stringify(vGuardRishtaUser)).then(result => {
				navigation.navigate('PreviewReUpdateKyc')
			})

		})
	}



	async function processPincode(pincode, type) {
		console.log(pincode)
		if (pincode.length > 3) {
			console.log('pincode function called')
			const suggestionData = await fetchPinCodeData(pincode);

			if (Array.isArray(suggestionData) && suggestionData.length > 0) {

				const filteredSuggestions = suggestionData.filter((item) => (
					item.pinCode !== null
				));
				setPincode_Suggestions(filteredSuggestions);


				// setPincode(pincode);
				//setIsLoading(true);
				if (pincode.length == 6) {

					updateDistrictState(pincode, type);
				}



			} else {
				setSuggestions([]);
			}
		}
		console.log(pincode, 'huuh');

		type === 'permanent' ? setVGuardRishtaUser({ ...vGuardRishtaUser, pinCode: pincode }) : setVGuardRishtaUser({ ...vGuardRishtaUser, currPinCode: pincode })
	}

	function updateDistrictState(pincode, type) {
		let pincodeID = 0;
		setIsLoading(true)
		fetchPinCodeData(pincode)
			.then(data => {
				const pincodeid = data[0].pinCodeId;
				pincodeID = pincodeid
				console.log('Pin Code Data:', pincodeid);
				return PincodedetailList(pincodeid);
			})
			.then(secondData => {
				console.log(secondData)
				type === 'permanent' ?
					setVGuardRishtaUser({ ...vGuardRishtaUser, dist: secondData.distName, distId: secondData.distId, state: secondData.stateName, stateId: secondData.stateId, cityId: secondData.cityId, city: secondData.cityName, pinCode: pincode })
					: setVGuardRishtaUser({ ...vGuardRishtaUser, currDist: secondData.distName, currDistId: secondData.distId, currState: secondData.stateName, currStateId: secondData.stateId, currCityId: secondData.cityId, currCity: secondData.cityName, currPinCode: pincode })


				return GetCityList(pincodeID);
			})
			.then(cityData => {
				if (type == 'permanent') setPerCityList([
					{ cityName: "Select city", value: "" },
					...cityData,
					{ cityName: "Others", value: "100000" },
				])
				else setCurrCityList([
					{ cityName: "Select city", value: "" },
					...cityData,
					{ cityName: "Others", value: "100000" },
				])

				console.log('Second API call:>>>>>>my logs', cityData);
				setIsLoading(false);
			})
			.catch(error => {
				console.error('Error in Page 1:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function processSubProfession(v) {
		const subprofession = [
			{ label: 'Select Sub Category', value: 0 }
		]
		Getsubprofession().then(response => {
			response.map(r => {
				subprofession.push({ label: r.professionName, value: r.professionId })
			})
			setSubProfession(subprofession);
		})
	}

	const getPositionValue = (value) => {
		if (value?.trim() === "Male") return 1
		else if (value?.trim() === "Female") return 2
		else if (value?.trim() === "Others") return 3
		else return null
	}

	function setCurrCity(item) {
		setVGuardRishtaUser({ ...vGuardRishtaUser, currCity: perCityList?.filter(ele => ele?.id === item)?.[0]?.cityName, currCityId: item })
	}
	function setPerCity(item) {
		setVGuardRishtaUser({ ...vGuardRishtaUser, city: perCityList?.filter(ele => ele?.id === item)?.[0]?.cityName, cityId: item })
	}

	return (
		<View style={styles.kycContainer}>
			{isLoading &&
				<Loader />}

			<ScrollView styles={styles.kycContainer}>
				{showPicker.isVisible &&
					<ActionPickerModal onCamera={() => {
						console.log(">>>>", showPicker)
						openCamera(showPicker.documentType)
					}} onGallery={() => openGallery(openGallery(showPicker.documentType))} />}
				<View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
					<Text style={{ fontWeight: 'bold', color: 'black' }}>Edit your details below</Text>
				</View>
				<View style={styles.formContainer}>
					<View style={{ borderWidth: 1, borderColor: 'black', maxWidth: 80 }}>
						<Text style={styles.remarkLabel}>Remarks</Text>
					</View>
					{vGuardRishtaUser?.rejectedReasonsStr && <View style={{ borderWidth: 1, borderColor: 'black', maxWidth: width * 0.8 }}>
						<Text style={{ marginVertical: 10, color: 'red' }}> ● {vGuardRishtaUser?.rejectedReasonsStr}</Text>
					</View>}
					<Text style={styles.textLabel}>{t('strings:lbl_preferred_language')}</Text>
					<View style={styles.inputContainer}>
						<Picker
							style={[styles.pickerStyle, { color: "#c4c4c4" }]}
							enabled={false}
							dropdownIconColor="#c4c4c4"
							onValueChange={() => console.log('h')}
							selectedValue={vGuardRishtaUser?.gender}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{language.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_name_mandatory')}</Text>
					<View style={styles.inputContainer}>
						<TextInput editable={false} color="#545454" styles={styles.value} placeholderTextColor="#c4c4c4" value={vGuardRishtaUser?.name || ''} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, name: t })} />
					</View>

					<Text style={styles.textLabel}>{t('strings:lbl_gender_mandatory')}</Text>
					<View style={styles.inputContainer}>
						<Picker
							style={styles.pickerStyle}
							enabled={true}
							dropdownIconColor="#c4c4c4"
							onValueChange={(g) => {
								setVGuardRishtaUser({ ...vGuardRishtaUser, genderPos: g, gender: gender?.filter(elem => elem.value === g)?.[0]?.label })
								// console.log(g,gender.filter(elem=> elem.value === g )?.[0]?.label)
							}
							}
							selectedValue={vGuardRishtaUser?.genderPos || ""}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{gender.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>

					</View>
					<Text style={styles.textLabel}>{t("strings:lbl_date_of_birth_mandatory")}</Text>
					<View style={styles.inputContainer}>
						<DatePicker date={vGuardRishtaUser?.dob || null} onDateChange={(event, date) => {
							if (event.type == 'set') {
								setVGuardRishtaUser({ ...vGuardRishtaUser, dob: date })
								setUIswitch({ ...uiSwitch, dob: !uiSwitch.dob })
							}
						}} showDatePicker={uiSwitch.dob} onShowDatePicker={() => setUIswitch({ ...uiSwitch, dob: !uiSwitch.dob })} />
					</View>
					<Text style={styles.textLabel}>{t("strings:contact_number")}</Text>
					<View style={[styles.inputContainer]}>
						<TextInput style={styles.diabledColor} value={vGuardRishtaUser?.contactNo || ""} editable={false} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, contactNo: t })} placeholder={t('strings:contact_no')} />
					</View>
					<Text style={styles.textLabel}>{t('strings:_is_what_s_app_contact_same_as_above')}</Text>
					<View style={styles.inputContainer}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							color="black"
							onValueChange={(v) => {

								if (v === 1) {
									setVGuardRishtaUser({ ...vGuardRishtaUser, isWhatsAppSame: 1, whatsappNo: vGuardRishtaUser?.contactNo || "" })
								} else {
									setVGuardRishtaUser({ ...vGuardRishtaUser, isWhatsAppSame: 0 })
								}

							}}
							selectedValue={vGuardRishtaUser?.isWhatsAppSame}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{whatsappNo.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_whats_app_number')}</Text>
					<View style={styles.inputContainer}>
						<TextInput style={styles.value} value={vGuardRishtaUser?.whatsappNo || ""} onChangeText={(e) => { setVGuardRishtaUser({ ...vGuardRishtaUser, whatsappNo: e }) }} editable={vGuardRishtaUser?.isWhatsAppSame == 1 ? false : true} o placeholder={t('strings:lbl_whats_app_number')} keyboardType='number-pad' maxLength={10} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_email')}</Text>
					<View style={styles.inputContainer}>
						<TextInput placeholderTextColor={"black"} style={styles.value} value={vGuardRishtaUser?.emailId || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, emailId: e })} />
					</View>
					<Text style={styles.textHeader}>{t('strings:permanent_address')}</Text>
					<Text style={styles.textLabel}>{t('strings:lbl_permanent_address_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} value={vGuardRishtaUser?.permanentAddress || ""} onChangeText={(p) => setVGuardRishtaUser({ ...vGuardRishtaUser, permanentAddress: p })} placeholder={t('strings:lbl_permanent_address_mandatory')} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_street_locality')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} value={vGuardRishtaUser?.streetAndLocality || ""} onChangeText={(s) => setVGuardRishtaUser({ ...vGuardRishtaUser, streetAndLocality: s })} placeholder={t('strings:lbl_street_locality')} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_landmark')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} value={vGuardRishtaUser?.landmark || ""} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, landmark: t })} placeholder={t('strings:lbl_landmark')} />
					</View>
					<Text style={styles.textLabel}>{t('strings:pincode')}</Text>

					<DropDownPicker
						mode="BADGE"
						showBadgeDot={true}
						searchable={true}
						searchPlaceholder='Search Your Pincode'
						loading={isLoading}

						placeholder={vGuardRishtaUser?.pinCode === null ? 'Search Pincode' : `${vGuardRishtaUser?.pinCode || ""}`}
						searchablePlaceholder="Search Pincode"


						// placeholder={value}
						searchTextInputProps={{
							maxLength: 6,
							keyboardType: "number-pad"

						}}

						listMode="SCROLLVIEW"
						scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
						open={uiSwitch.pincode}
						items={pincode_suggestions.map((item) => ({
							label: item.pinCode,
							value: item.pinCode,

						}
						))}
						setOpen={() => setUIswitch({ pincode: !uiSwitch.pincode })}
						value={vGuardRishtaUser?.pinCode || ""}
						onSelectItem={(item) => {
							console.log(item)
							setVGuardRishtaUser({ ...vGuardRishtaUser, pinCode: item.label, pinCodeId: item.value })
							processPincode(`${item.value}`, 'permanent')

							// pinocdefeting(item.value);
							//console.log(value);





						}}



						onChangeSearchText={(text) => processPincode(text, 'permanent')}
						dropDownContainerStyle={{
							maxWidth: width * 0.8,
							height: height / 5,
							borderWidth: 1,

							borderColor: "black",
							color: "black",
							elevation: 0,
							backgroundColor: "white"
						}}
						style={{
							backgroundColor: 'white',


							elevation: 50,
							opacity: 0.9,
							borderWidth: 1,
							maxWidth: width * 0.8,
							height: height / 15,


							elevation: 0,

							borderColor: "black",
						}}
					/>


					<Text style={styles.textLabel}>{t('strings:select_state')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.state || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder={t('strings:select_state')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_district')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.dist || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder={t('strings:select_district')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_city')}</Text>
					<View style={styles.inputContainer}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(m) => setPerCity(m)}
							selectedValue={vGuardRishtaUser?.cityId || ""}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{perCityList.map(l =>
								<Picker.Item label={l?.cityName} value={l?.id} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{'Cureent Address same as permanent address?'}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(v) => {

								setCurrentAddressFlag(v)
								if (v === 1) {
									setVGuardRishtaUser({ ...vGuardRishtaUser, currentAddress: " ", addDiff: 1, currStreetAndLocality: "", currLandmark: "", currPinCode: "", currPinCodeId: "", currCity: "", currCityId: "", currDist: "", currDistId: "", currState: "", currStateId: "" })
								} else {
									setVGuardRishtaUser({ ...vGuardRishtaUser, currentAddress: vGuardRishtaUser?.permanentAddress || "", addDiff: 0, currStreetAndLocality: vGuardRishtaUser?.streetAndLocality || "", currLandmark: vGuardRishtaUser?.landmark || "", currPinCode: vGuardRishtaUser?.pinCode || "", currPinCodeId: vGuardRishtaUser?.pinCodeId || "", currCity: vGuardRishtaUser?.city || "", currCityId: vGuardRishtaUser?.cityId || "", currDist: vGuardRishtaUser?.dist || "", currDistId: vGuardRishtaUser?.distId || "", currState: vGuardRishtaUser?.state || "", currStateId: vGuardRishtaUser?.stateId || "" })
								}
							}}
							selectedValue={vGuardRishtaUser?.addDiff || 0}
						>
							{currentAddressOption.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_current_address_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.currentAddress || ""} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currentAddress: c })} editable={vGuardRishtaUser?.addDiff === 0 ? false : true} placeholder='Current Address*House/Flat/Block No.' />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_street_locality')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.currStreetAndLocality} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currStreetAndLocality: c })} editable={vGuardRishtaUser?.addDiff === 0 ? false : true} placeholder='Street/Colony/Locality Name*' />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_landmark')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.currLandmark} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currLandmark: c })} editable={vGuardRishtaUser?.addDiff === 0 ? false : true} placeholder='Landmark' />
					</View>
					<Text style={styles.textLabel}>{t('strings:pincode')}</Text>

					<DropDownPicker
						mode="BADGE"
						showBadgeDot={true}
						searchable={true}
						searchPlaceholder='Search Your Pincode'
						loading={isLoading}

						placeholder={vGuardRishtaUser?.currPinCode === null ? 'Search Pincode' : `${vGuardRishtaUser?.currPinCode || ""}`}
						searchablePlaceholder="Search Pincode"


						// placeholder={value}
						searchTextInputProps={{
							maxLength: 6,
							keyboardType: "number-pad"

						}}

						listMode="SCROLLVIEW"
						scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
						open={uiSwitch.currentpincode}
						items={pincode_suggestions.map((item) => ({
							label: item.pinCode,
							value: item.pinCode,

						}
						))}
						setOpen={() => setUIswitch({ currentpincode: !uiSwitch.currentpincode })}
						value={vGuardRishtaUser?.currPinCode}
						onSelectItem={(item) => {
							console.log(item)
							setVGuardRishtaUser({ ...vGuardRishtaUser, currPinCode: item.label, currPinCodeId: item.value })
							processPincode(`${item.value}`, 'current')

							// pinocdefeting(item.value);
							//console.log(value);





						}}



						onChangeSearchText={(text) => processPincode(text, 'current')}
						dropDownContainerStyle={{
							maxWidth: width * 0.8,
							height: height / 5,
							borderWidth: 1,

							borderColor: "black",

							elevation: 0,
							backgroundColor: "white"
						}}
						style={{
							backgroundColor: 'white',


							elevation: 50,
							opacity: 0.9,
							borderWidth: 1,
							maxWidth: width * 0.8,
							height: height / 15,


							elevation: 0,

							borderColor: "black",
						}}
					/>

					<Text style={styles.textLabel}>{t('strings:select_state')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.currState || ""} editable={false} onChangeText={(p) => { processPincode(p) }} />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_district')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.currDist || ""} editable={false} onChangeText={(p) => { processPincode(p) }} />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_city')}</Text>
					<View style={styles.inputContainer}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={vGuardRishtaUser?.addDiff === 0 ? false : true}
							onValueChange={(m) => setCurrCity(m)}
							selectedValue={vGuardRishtaUser?.currCityId || ""}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{currCityList.map(l =>
								<Picker.Item label={l?.cityName} value={l?.id} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{t('strings:select_profession')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(v) => {

								processSubProfession(v)

								setVGuardRishtaUser({ ...vGuardRishtaUser, profession: profession[v].label, professionId: v })
							}}
							selectedValue={vGuardRishtaUser?.professionId || 0}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{profession.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					{vGuardRishtaUser?.professionId == 2 &&
						<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
							<Picker
								style={styles.pickerStyle}
								dropdownIconColor="#c4c4c4"
								enabled={true}
								onValueChange={(v) => {



									setVGuardRishtaUser({ ...vGuardRishtaUser, subProfession: subProfession[v].label, subProfessionId: v })

								}}
								selectedValue={vGuardRishtaUser?.subProfessionId || ""}
								onFocus={() => console.log('h')}
								onBlur={() => console.log('h')}>
								{subProfession.map(l =>
									<Picker.Item label={l.label} value={l.value} />
								)}

							</Picker>
						</View>}
					<Text style={styles.textLabel}>{t('strings:select_marital_status')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(m) => setVGuardRishtaUser({ ...vGuardRishtaUser, maritalStatus: m, maritalStatusId: m })}
							selectedValue={vGuardRishtaUser?.maritalStatus || ""}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{maritalStatus.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{t('strings:already_enrolled_into_loyalty_scheme')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(a) => setVGuardRishtaUser({ ...vGuardRishtaUser, enrolledOtherScheme: a, enrolledOtherSchemeYesNo: alreadyenrolled[a].label })}
							selectedValue={vGuardRishtaUser?.enrolledOtherScheme || ""}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{alreadyenrolled.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.otherSchemeBrand || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand: e })} placeholder='If yes please mention scheme and brand name.' />

					</View>
					<View style={{ flexDirection: 'row', maxWidth: width }}>
						<View style={styles.inputContainer}>
							<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.abtOtherSchemeLiked || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked: e })} placeholder='If yes, what you liked about the program.' />

						</View>
						<Pressable style={styles.schemeIcon} onPress={() => setScheme(scheme + 1)}>

							<Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
						</Pressable>
					</View>
					{(scheme > 0 || vGuardRishtaUser?.otherSchemeBrand2) &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.otherSchemeBrand2 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand2: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={styles.inputContainer}>
									<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.abtOtherSchemeLiked2 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked2: e })} placeholder='If yes, what you liked about the program.' />

								</View>
								<Pressable style={styles.schemeIcon} onPress={() => setScheme(scheme + 1)}>
									<Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
								</Pressable>
							</View>
						</>
					}
					{(scheme > 1 || vGuardRishtaUser?.otherSchemeBrand3) &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.otherSchemeBrand3 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand3: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={styles.inputContainer}>
									<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.abtOtherSchemeLiked3 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked3: e })} placeholder='If yes, what you liked about the program.' />

								</View>
								<Pressable style={styles.schemeIcon} onPress={() => setScheme(scheme + 1)}>

									<Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
								</Pressable>
							</View>
						</>
					}
					{(scheme > 2 || vGuardRishtaUser?.otherSchemeBrand4) &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.otherSchemeBrand4 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand4: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={styles.inputContainer}>
									<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.abtOtherSchemeLiked4 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked4: e })} placeholder='If yes, what you liked about the program.' />

								</View>
								<Pressable style={styles.schemeIcon} onPress={() => setScheme(scheme + 1)}>
									<Image style={{ resizeMode: 'contain', width: 20, height: 20, justifyContent: 'center', alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
								</Pressable>
							</View>
						</>
					}
					{(scheme > 3 || vGuardRishtaUser?.otherSchemeBrand5) &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.otherSchemeBrand5 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand5: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={styles.inputContainer}>
									<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.abtOtherSchemeLiked5 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked5: e })} placeholder='If yes, what you liked about the program.' />

								</View>
								<Pressable style={styles.schemeIcon} onPress={() => setScheme(scheme + 1)}>
									<Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
								</Pressable>
							</View>
						</>
					}
					<Text style={styles.textLabel}>{t('strings:annual_business_potential')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.annualBusinessPotential || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, annualBusinessPotential: e })} placeholder={t('strings:annual_business_potential')} />

					</View>

					<Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'PROFILE' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput editable={false} placeholder={t('strings:selfie')} placeholderTextColor={"#b8b8b8"} />
						{vGuardRishtaUser?.kycDetails?.selfie ?
							<Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.selfie || "" }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />
						}
					</Pressable>
					<Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'ID_CARD_FRONT' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} editable={false} placeholder={t('strings:aadhar_card_front')} placeholderTextColor={"#b8b8b8"} />
						{vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDLFront ?
							<Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDLFront }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</Pressable>
					<Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'ID_CARD_BACK' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput editable={false} placeholder={t('strings:addhar_card_back')} placeholderTextColor={"#b8b8b8"} />
						{vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlBack ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlBack }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</Pressable>
					<Text style={styles.textLabel}>{t('strings:aadhar_card_no')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} value={vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlNo || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlNo: e } }))} placeholder={t('strings:update_aadhar_voter_id_dl_manually')} keyboardType='number-pad' />

					</View>
					<Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'PAN_CARD_FRONT' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput editable={false} placeholder={t('strings:update_pan_card_front')} placeholderTextColor={"#b8b8b8"} />
						{vGuardRishtaUser?.kycDetails?.panCardFront ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.panCardFront }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</Pressable>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.kycDetails?.panCardNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardNo: e } }))} placeholder={t('strings:update_pan_number_manually')} />

					</View>
					<Text style={styles.textHeader2}>{t('strings:lbl_bank_details')}</Text>
					<Text style={styles.textLabel}>{t('strings:please_enter_bank_account_number')}</Text>


					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.bankAccNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, bankAccNo: e } }))} placeholder={t('strings:lbl_account_number')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:please_enter_account_holder_name')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.bankAccHolderName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, bankAccHolderName: e } }))} placeholder={t('strings:lbl_account_holder_name')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_account_type')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(e) => {
								setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankAccType: accountType?.[e]?.label, bankAccTypePos: e } }))
								console.log(vGuardRishtaUser?.bankDetail?.bankAccType)
							}}
							// setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankAccType: accountType[e].label, bankAccTypePos: e } }))}
							selectedValue={vGuardRishtaUser?.bankDetail?.bankAccTypePos || 0}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{accountType.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<Text style={styles.textLabel}>{t('strings:bank_name')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<Picker
							style={styles.pickerStyle}
							dropdownIconColor="#c4c4c4"
							enabled={true}
							onValueChange={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankNameAndBranch: banks[e].label, bankId: e } }))}
							selectedValue={vGuardRishtaUser?.bankDetail?.bankId}
							onFocus={() => console.log('h')}
							onBlur={() => console.log('h')}>
							{banks.map(l =>
								<Picker.Item label={l.label} value={l.value} />
							)}

						</Picker>
					</View>
					<Text style={styles.textHeader2}>{t('strings:ifsc')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.bankIfsc || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankIfsc: e } }))} placeholder={t('strings:ifsc')} />

					</View>
					<Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'CHEQUE' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} editable={false} placeholder={t('strings:lbl_upload_cancelled_cheque')} />
						{vGuardRishtaUser?.bankDetail?.checkPhoto ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.bankDetail?.checkPhoto }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</Pressable>
					<Text style={styles.textHeader2}>{t('strings:lbl_nominee_details')}</Text>
					<Text style={styles.textLabel}>{t('strings:lbl_name_of_nominee')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.nomineeName || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeName: e } }))} placeholder={t('strings:lbl_name_of_nominee')} />

					</View>
					<Text style={styles.textHeader2}>{t('strings:lbl_date_of_birth_mandatory')}</Text>
					<View style={styles.inputContainer}>
						<DatePicker date={vGuardRishtaUser?.bankDetail?.nomineeDob} onDateChange={(event, date) => {
							if (event.type == 'set') {
								setVGuardRishtaUser({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeDob: date } })
								setUIswitch({ ...uiSwitch, Nomineedob: !uiSwitch.Nomineedob })
							}
						}}
							// setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeDob: e } }))} 
							label={vGuardRishtaUser?.bankDetail?.nomineeDob ? vGuardRishtaUser?.bankDetail?.nomineeDob : 'Date of Birth DD/MM/YYYY*'} onShowDatePicker={() => setUIswitch({ ...uiSwitch, Nomineedob: !uiSwitch.Nomineedob })} showDatePicker={uiSwitch.Nomineedob} />
					</View>
					<Text style={styles.textLabel}>{t('strings:mobile_number')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.nomineeMobileNo || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeMobileNo: e } }))} placeholder={t('strings:lbl_mobile_number')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_email')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.nomineeEmail || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, nomineeEmail: e } }))} />

					</View>
					<Text style={styles.textLabel}>{t('strings:address')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.nomineeAdd || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeAdd: e } }))} placeholder={t('strings:lbl_address')} />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_relationship_with_you')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput style={styles.value} placeholderTextColor={"#b8b8b8"} value={vGuardRishtaUser?.bankDetail?.nomineeRelation || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeRelation: e } }))} placeholder='Relationship with you' />

					</View>
				</View>
				<Pressable onPress={() => InitatePreview()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
					<Text style={{ fontWeight: 'bold', color: 'black' }}>Preview</Text>
				</Pressable>
			</ScrollView>



		</View>
	)
}

const styles = StyleSheet.create({
	kycContainer: {
		backgroundColor: "white",
	},
	remarkLabel: {
		color: "#75736f",
		fontWeight: "bold",
		fontSize: 18,
	},
	textLabel: {
		color: "#2b2b2a",
	},
	textHeader: {
		color: "#2b2b2a",
		fontSize: 18,
	},
	diabledColor: {
		color: "#c4c4c4",
	},
	inputContainer: {
		maxWidth: width * 0.8,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
	},
	pickerStyle: {
		maxWidth: width * 0.8,
		borderWidth: 1,
		borderColor: "black",
		color: "black",
	},
	formContainer: {
		paddingLeft: width * 0.1,
		gap: 10,
		backgroundColor: "white",
	},
	value: {
		color: "black",
	},
	textHeader2: {
		color: "#2b2b2a",
		fontSize: 16,
	},
	schemeIcon: {
		display: "flex",
		justifyContent: "center",
		marginLeft: "5%",
	},
});

export default ReUpdateKyc