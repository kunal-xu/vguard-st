import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import Message from "../../../components/Message";
import { generateOtpForLogin, generateOtpForReverify, getUser, loginwithotpApi, otpviacall, validateReverifyOtp } from "../../../utils/apiservice";
import Popup from '../../../components/Popup';
import { width, height } from '../../../utils/dimensions';
import { Colors } from '../../../utils/constants';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../../../utils/interfaces';


const ReUpdateKycOTP = ({ navigation }: NavigationProps) => {

	const [number, setNumber] = useState('');
	const [preferedLanguage, setpreferedLanguage] = useState(1);
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');

	const [selectedOption, setSelectedOption] = useState('retailer');
	const [countdown, setCounter] = useState(0);

	const [otpsentflag, setotpsentflag] = useState(false);
	const [otp, setOtp] = useState('');
	useEffect(() => {
		let intervalId;
		if (countdown > 0) {
			intervalId = setInterval(() => {
				setCounter(prevCounter => prevCounter - 1);
			}, 1000);
		}

		//    else if (countdown <= 0) {
		//         intervalId = setInterval(() => {
		//             setCounter(null);
		//         }, 1000);
		//     }

		// // Return a cleanup function to stop the counter when the component is unmounted
		return () => clearInterval(intervalId);
	}, [countdown]);

	const handleGetOtpViaCall = () => {
		// Implement your logic for getting OTP via call
		// This function will be called when the "GET OTP VIA CALL" button is pressed
	};


	const handleValidation = async () => {
		try {
			let pattern = /^[3-9][0-9]{9}$/
			if (!number) {
				ToastAndroid.show(t("strings:enter_registered_mobile_no"), ToastAndroid.SHORT)
			} else if (!pattern.test(number)) {
				ToastAndroid.show(t("strings:enter_valid_registered_mobile_no"), ToastAndroid.SHORT)
			} else {
				let payload = { loginOtpUserName: number, otpType: "" };
				let validationResponse = await generateOtpForReverify(
					payload
				);
				if (validationResponse.code === 200) {
					setCounter(60);
					setotpsentflag(true);
					const successMessage = validationResponse.message;
					setIsPopupVisible(true);
					setPopupMessage(successMessage);
				} else {
					const errorMessage = validationResponse.message;
					setIsPopupVisible(true);
					setPopupMessage(errorMessage);
				}
			}
		} catch (error) {
			console.error('Error during validation:', error);
		}
	};

	const loginUserWithOtp = async () => {
		try {
			let pattern = /^[3-9][0-9]{9}$/
			if (!number) {
				ToastAndroid.show(t("strings:enter_registered_mobile_no"), ToastAndroid.SHORT)
			} else if (!pattern.test(number)) {
				ToastAndroid.show(t("strings:enter_valid_registered_mobile_no"), ToastAndroid.SHORT)
			} else if (!otp || otp.length < 4) {
				ToastAndroid.show(t("strings:enter_otp"), ToastAndroid.SHORT)
			} else {
				let userCredentials = {
					loginOtpUserName: number,
					otp: otp,

				};
				let response = await validateReverifyOtp(userCredentials);
				let message = response.message;
				if (response.code === 200) {
					let response = await getUser()
					response = await response.data;

					await AsyncStorage.setItem("reUpdateKycDetails", JSON.stringify(response))
					navigation.navigate('ReUpdateKyc')
				} else {
					setIsPopupVisible(true);
					setPopupMessage(message);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	const calltogetopt = async () => {
		try {
			let userCredentials = {
				loginOtpUserName: number,
				otpType: "voice"

			};

			let response = await otpviacall(userCredentials);
			let message = response.message;
			if (response.code === 200) {
				setCounter(60);
				setotpsentflag(true);
				setIsPopupVisible(true);
				setPopupMessage(message);
			} else {
				setIsPopupVisible(true);
				setPopupMessage(message);
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};


	const placeholderColor = colors.grey;

	const { t } = useTranslation();


	const handleOptionSelect = (option) => {
		setSelectedOption(option);
	};




	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			{isPopupVisible && (<Popup isVisible={isPopupVisible} children={<Text>{popupMessage}</Text>} onClose={() => setIsPopupVisible(false)}>


			</Popup>
			)}
			<View style={styles.registerUser}>
				<View style={styles.mainWrapper}>
					<Image
						source={require('../../../assets/images/group_907.png')}
						style={styles.imageSaathi}
					/>
					<Text style={styles.mainHeader}>{t('strings:lbl_welcome')}</Text>
					<View style={styles.formContainer}>
						<View style={styles.containter}>
							<Text style={styles.textHeader}>{t('strings:enter_registered_mobile_no_to_continue')}</Text>
							<TextInput
								style={styles.input}
								placeholder={t('strings:enter_your_mobile_number')}
								placeholderTextColor={placeholderColor}
								value={number}
								keyboardType='number-pad'
								onChangeText={(text) => setNumber(text)}
								maxLength={10}
							/>
						</View>
						{otpsentflag == true && <View style={styles.containter2}>

							<TextInput
								style={styles.input}
								placeholder={t('strings:enter_otp')}
								placeholderTextColor={placeholderColor}
								keyboardType='number-pad'
								value={otp}
								onChangeText={(text) => setOtp(text)}
								maxLength={6}
							/>
						</View>}
						{!otpsentflag && <View style={styles.buttonContainer}>
							<Buttons
								style={styles.button}
								label={t('strings:send_otp')}
								variant="filled"
								//  onPress={() => navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption })}
								onPress={() => handleValidation()}
								width="100%"
								iconHeight={10}
								iconWidth={30}
								iconGap={30}
								icon={arrowIcon}
							/>
						</View>}
						{otpsentflag && <View style={styles.buttonContainer2}>
							<Buttons
								style={styles.button}
								label={t('strings:login_with_otp')}
								variant="filled"
								//  onPress={() => navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption })}
								onPress={() => loginUserWithOtp()}
								width="100%"
								iconHeight={10}
								iconWidth={30}
								iconGap={30}
								icon={arrowIcon}
							/>
						</View>}
						<Text style={styles.or}>{t('strings:or')}</Text>
						<TouchableOpacity onPress={() => calltogetopt()}>
							<View style={styles.otpPhone}>
								<Image source={require('../../../assets/images/group_501.png')} style={styles.phone} />
								<Text style={styles.greyText}>Click Here to get OTP through phone call</Text>
							</View>
						</TouchableOpacity>

						<View style={{ backgroundColor: 'transparent', height: height / 25, flexDirection: "row", justifyContent: "space-evenly", width: width / 1.3, marginTop: 20, marginLeft: 15 }}>
							<View>
								<Text style={{ color: "black" }}>OTP Not Received ?</Text>
							</View>
							<TouchableOpacity onPress={() => countdown === 0 && handleValidation()}>
								<View style={{ right: 28 }}>
									<Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.5) }}>RESEND OTP</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ marginLeft: 15 }} >
							<Text style={{ color: "grey", fontSize: responsiveFontSize(2), alignSelf: "center", }}>or</Text>
						</View>
						<View style={{ backgroundColor: 'transparent', height: 40, flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', paddingTop: 10, alignSelf: 'center' }}>

							<TouchableOpacity>
								<View >
									<Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), left: 10 }}>GET OTP VIA CALL</Text>
								</View>
							</TouchableOpacity>
							{countdown > 0 && <Text style={{ fontSize: responsiveFontSize(1.8), paddingLeft: 5, paddingRight: 5, color: "black" }}> in </Text>}
							{countdown > 0 && <View >
								<Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), right: 15 }}>{countdown} s</Text>
							</View>}
						</View>

					</View>
				</View>
				<View style={styles.footer}>
					<View style={styles.footerContainer}>
						<Text style={styles.footergreyText}>{t('strings:powered_by_v_guard')}</Text>
						<Image
							source={require('../../../assets/images/group_910.png')}
							style={styles.imageVguard}
						/>
					</View>
				</View>
			</View>
		</ScrollView >

	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	registerUser: {
		height: '100%',
		backgroundColor: colors.white,
		display: 'flex',
	},
	mainWrapper: {
		padding: 30,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flexGrow: 1
	},
	textHeader: {
		color: colors.grey,
		fontSize: 14,
		fontWeight: 'bold'
	},
	mainHeader: {
		color: colors.black,
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	},
	imageSaathi: {
		width: 100,
		height: 98,
		marginBottom: 30
	},
	imageVguard: {
		width: 100,
		height: 36,
	},
	formContainer: {
		width: '100%',
		// justifyContent: 'center',
		padding: 16,
		flex: 2,
	},
	input: {
		height: 40,
		padding: 10,
		borderRadius: 5,
		color: colors.black,
		backgroundColor: colors.white,
		shadowColor: 'rgba(0, 0, 0, 0.8)',
		elevation: 5,
	},
	or: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.black,
		marginBottom: 20,
		marginTop: 20
	},
	tick: {
		height: 15,
		width: 15
	},
	footergreyText: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.grey,
		paddingBottom: 5,
	},
	footerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'center',
		backgroundColor: colors.lightGrey,
		width: '100%',
		paddingVertical: 10
	},
	option: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center'
	},
	radioButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 30,
		alignItems: 'center'
	},
	containter: {
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		marginBottom: 20,
	},
	containter2: {


		Bottom: 10,
		gap: 5,
		marginBottom: 20,

	},
	phone: {
		height: 50,
		width: 50
	},
	greyText: {
		fontSize: 14,
		color: colors.grey,
	},
	otpPhone: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 50,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default ReUpdateKycOTP