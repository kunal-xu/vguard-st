import { View, Text, ScrollView, TextInput, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { height, width } from '../../../utils/dimensions'
import { Colors } from '../../../utils/constants'
import Loader from '../../../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { reUpdateUserForKyc, sendFile } from '../../../utils/apiservice'
import { useTranslation } from 'react-i18next'

const PreviewReUpdateKyc = ({ navigation }) => {
	const { t } = useTranslation();
	React.useEffect(() => {
		AsyncStorage.getItem('VGUSER').then(result => {
			let parsedData = JSON.parse(result)
			parsedData.dob = parsedData.dob ? formatDate(parsedData.dob) : ""
			parsedData.bankDetail.nomineeDob = parsedData.bankDetail.nomineeDob ? formatDate(parsedData.bankDetail.nomineeDob) : ""
			setVGuardRishtaUser(parsedData)
		})
	}, [])

	const [isLoading, setIsLoading] = React.useState(false)
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
	const [imageData, setImageData] = React.useState([{
		documentType: null,
		path: null,
		filename: null,
		type: null
	}])



	function InitatePreview() {
		setIsLoading(true)
		var postData = vGuardRishtaUser
		AsyncStorage.getItem("IMAGE_DATA").then(async (result) => {
			let Images = JSON.parse(result);
			for await (i of Images) {
				try {
					if (i.documentType && i.filename && i.path && i.type) {
						const formData = new FormData();
						formData.append('file', { uri: i.path, type: i.type, name: i.filename });
						formData.append('imageRelated', i.documentType);
						formData.append('userRole', "1");
						const result = await sendFile(formData);
						if (result.data.entityUid) {
							console.log(result.data.entityUid, i.documentType)
							switch (i.documentType) {
								case 'CHEQUE':
									if (postData.bankDetail) {
										postData.bankDetail.checkPhoto = result.data.entityUid
									} else {
										postData.bankDetail = {
											checkPhoto: result.data.entityUid
										}
									}

									break;
								case "PAN_CARD_FRONT":
									if (postData.kycDetails) {
										postData.kycDetails.panCardFront = result.data.entityUid
									} else {
										postData.kycDetails = {
											panCardFront: result.data.entityUid
										}
									}

									break;
								case 'ID_CARD_BACK':
									if (postData.kycDetails) {
										postData.kycDetails.aadharOrVoterOrDlBack = result.data.entityUid
									} else {
										postData.kycDetails = {
											aadharOrVoterOrDlBack: result.data.entityUid
										}
									}

									break;
								case 'ID_CARD_FRONT':
									if (postData.kycDetails) {
										postData.kycDetails.aadharOrVoterOrDLFront = result.data.entityUid
									} else {
										postData.kycDetails = {
											aadharOrVoterOrDLFront: result.data.entityUid
										}
									}
									break;
								case 'PROFILE':
									if (postData.kycDetails) {
										postData.kycDetails.selfie = result.data.entityUid
									} else {
										postData.kycDetails = {
											selfie: result.data.entityUid
										}
									}
									break;
								default:
									break;
							}

						}
					}
				} catch (error) {
					setIsLoading(false)
					console.log(error);
				} finally {
					setIsLoading(false)
				}
			}

			reUpdateUserForKyc(postData).then(response => {
				setIsLoading(false)
				console.log(response);
				if (response.code == 200) {
					navigation.navigate('login')
				}
			}).catch(e => {
				console.log(error)
			}).finally(() => {
				setIsLoading(false)
			});
		})
	}

	function formatDate(dateString) {
		const dateObject = new Date(dateString);
		const year = dateObject.getFullYear();
		const month = dateObject.getMonth() + 1;
		const day = dateObject.getDate();
		const formattedDate = `${day} ${getMonthName(month)} ${year}`;
		return formattedDate;
	}

	function getMonthName(month) {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return monthNames[month - 1];
	}

	return (
		<View style={{ backgroundColor: "white" }}>
			{isLoading &&
				<Loader />}

			<ScrollView>

				<View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
					<Text style={{ fontWeight: 'bold', color: 'black' }}>Preview</Text>
				</View>
				<View style={{ paddingLeft: width * 0.1, gap: 10 }}>

					<Text style={styles.textLabel}>{t('strings:lbl_preferred_language')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.preferredLanguage} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_name_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.name} />
					</View>

					<Text style={styles.textLabel}>{t('strings:lbl_gender_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.gender} />


					</View>
					<Text style={styles.textLabel}>{t("strings:lbl_date_of_birth_mandatory")}</Text>
					<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.dob} />

					</View>
					<Text style={styles.textLabel}>{t("strings:contact_number")}</Text>
					<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.contactNo} />
					</View>
					<Text style={styles.textLabel}>{t('strings:_is_what_s_app_contact_same_as_above')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.isWhatsAppSame ? 'Yes' : 'No'} />


					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_whats_app_number')}</Text>
					<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.whatsappNo} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_email')}</Text>
					<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.emailId} />
					</View>
					<Text style={styles.textHeader}>{t('strings:permanent_address')}</Text>
					<Text style={styles.textLabel}>{t('strings:lbl_permanent_address_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.permanentAddress} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_street_locality')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.streetAndLocality} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_landmark')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.landmark} />
					</View>
					<Text style={styles.textLabel}>{t('strings:pincode')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>

						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.pinCode} />
					</View>


					<Text style={styles.textLabel}>{t('strings:state')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} value={vGuardRishtaUser.state} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

					</View>
					<Text style={styles.textLabel}>{t('strings:district')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} value={vGuardRishtaUser.dist} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

					</View>
					<Text style={styles.textLabel}>{t('strings:city')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} value={vGuardRishtaUser.city} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_current_address_mandatory')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currentAddress} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_street_locality')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currStreetAndLocality} />
					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_landmark')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currLandmark} />
					</View>
					<Text style={styles.textLabel}>{t('strings:pincode')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currPinCode} />
					</View>
					<Text style={styles.textLabel}>{t('strings:state')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currState} />

					</View>
					<Text style={styles.textLabel}>{t('strings:district')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currDist} />

					</View>
					<Text style={styles.textLabel}>{t('strings:city')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.currCity} />

					</View>
					<Text style={styles.textLabel}>{t('strings:profession')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.profession} />

					</View>
					{vGuardRishtaUser.professionId == 2 &&
						<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
							<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.subProfession} />

						</View>}
					<Text style={styles.textLabel}>{t('strings:select_marital_status')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.maritalStatus} />

					</View>
					<Text style={styles.textLabel}>{t('strings:already_enrolled_into_loyalty_scheme')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.enrolledOtherSchemeYesNo} />

					</View>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.otherSchemeBrand} />

					</View>
					<View style={{ flexDirection: 'row', maxWidth: width }}>
						<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
							<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked} />

						</View>

					</View>
					{vGuardRishtaUser.otherSchemeBrand2 &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.otherSchemeBrand2} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand2: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
									<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked2} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked2: e })} placeholder='If yes, what you liked about the program.' />

								</View>

							</View>
						</>
					}
					{vGuardRishtaUser.otherSchemeBrand3 &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.otherSchemeBrand3} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand3: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
									<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked3} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked3: e })} placeholder='If yes, what you liked about the program.' />

								</View>

							</View>
						</>
					}
					{vGuardRishtaUser.otherSchemeBrand4 &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand4} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand4: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
									<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked4} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked4: e })} placeholder='If yes, what you liked about the program.' />

								</View>

							</View>
						</>
					}
					{vGuardRishtaUser.otherSchemeBrand5 &&
						<>
							<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
								<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.otherSchemeBrand5} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand5: e })} placeholder='If yes please mention scheme and brand name.' />

							</View>
							<View style={{ flexDirection: 'row', maxWidth: width }}>
								<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
									<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked5} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked5: e })} placeholder='If yes, what you liked about the program.' />

								</View>

							</View>
						</>
					}
					<Text style={styles.textLabel}>{t('strings:annual_business_potential')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.annualBusinessPotential} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, annualBusinessPotential: e })} />

					</View>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} placeholder='Selfie' />
						{vGuardRishtaUser.kycDetails.selfie ?
							<Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.selfie }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />
						}
					</View>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} placeholder='Aadhar Card (Front)' />
						{vGuardRishtaUser.kycDetails.aadharOrVoterOrDLFront ?
							<Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.aadharOrVoterOrDLFront }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</  View>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} placeholder='Aadhar Card (Back)' />
						{vGuardRishtaUser.kycDetails.aadharOrVoterOrDlBack ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.aadharOrVoterOrDlBack }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</  View>
					<Text style={styles.textLabel}>{t('strings:aadhar_card_no')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.kycDetails.aadharOrVoterOrDlNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, aadharOrVoterOrDlNo: e } }))} placeholder='Aadhar Card No' />

					</View>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} placeholder='Update Pan Card (Front)' />
						{vGuardRishtaUser.kycDetails.panCardFront ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.panCardFront }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</View>
					<Text style={styles.textLabel}>{t('strings:update_pan_number_manually')} </Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.kycDetails.panCardNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, panCardNo: e } }))} />

					</View>
					<Text style={styles.textHeader}>{t('strings:lbl_bank_details')}</Text>
					<Text style={styles.textLabel}>{t('strings:lbl_account_number')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.bankAccNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankAccNo: e } }))} placeholder='Account Number' />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_account_holder_name')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.bankAccHolderName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankAccHolderName: e } }))} placeholder='Account Holder Name' />

					</View>
					<Text style={styles.textLabel}>{t('strings:select_account_type')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.bankAccType} />

					</View>
					<Text style={styles.textLabel}>{t('strings:bank_name')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.bankNameAndBranch} />

					</View>
					<Text style={styles.textLabel}>{t('strings:ifsc')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.bankIfsc} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankIfsc: e } }))} placeholder='IFSC Code' />

					</View>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} placeholder='Cancelled cheque copy' />
						{vGuardRishtaUser.bankDetail.checkPhoto ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.bankDetail.checkPhoto }} /> :
							<Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
					</View>
					<Text style={styles.textHeader2}>{t('strings:lbl_nominee_details')}</Text>
					<Text style={styles.textLabel}>{t('strings:lbl_name_of_nominee')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeName: e } }))} placeholder='Name of Nominee' />

					</View>
					<Text style={styles.textLabel}>{t('strings:date_of_birth')}</Text>
					<View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeDob} />
					</View>
					<Text style={styles.textLabel}>{t('strings:mobile_number')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeMobileNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeMobileNo: e } }))} placeholder='Mobile Number' />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_email')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeEmail} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeEmail: e } }))} placeholder='E-mail' />

					</View>
					<Text style={styles.textLabel}>{t('strings:address')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeAdd} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeAdd: e } }))} placeholder='Address' />

					</View>
					<Text style={styles.textLabel}>{t('strings:lbl_relationship_with_you')}</Text>
					<View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
						<TextInput placeholderTextColor={"black"} style={styles.value} editable={false} value={vGuardRishtaUser.bankDetail.nomineeRelation} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeRelation: e } }))} placeholder='Relationship with you' />

					</View>
				</View>
				<View style={{ flexDirection: 'row', width: width, justifyContent: 'space-around' }}>
					<Pressable onPress={() => navigation.pop()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.3, height: 40, backgroundColor: 'black' }}>
						<Text style={{ fontWeight: 'bold', color: 'white' }}>Edit</Text>
					</Pressable>
					<Pressable onPress={() => InitatePreview()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.4, height: 40, backgroundColor: Colors.colorPrimary }}>
						<Text style={{ fontWeight: 'bold', color: 'black' }}>Submit</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	value: {
		color: "black",
	},
	textLabel: {
		color: "#2b2b2a",
	},
	textHeader: {
		color: "#2b2b2a",
		fontSize: 18,
	},
	textHeader2: {
		color: "#2b2b2a",
		fontSize: 16,
	},
})

export default PreviewReUpdateKyc