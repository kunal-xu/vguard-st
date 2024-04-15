import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Buttons from '../../../components/Buttons';
import colors from '../../../../colors';
import language from '../../../assets/images/language.png';
import { useTranslation } from 'react-i18next';
import blackTickImage from '../../../assets/images/ic_tick_black.png';
import whiteTickImage from '../../../assets/images/ic_tick_white.png';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LanguagePicker from '../../../components/LanguagePicker';
import arrowIcon from '../../../assets/images/arrow.png';
import { NavigationProps } from '../../../utils/interfaces';
import { useAuth } from '../../../components/AuthContext';
import { Constants } from '../../../utils/constants';

const CategorySelection = ({ navigation }: NavigationProps) => {
	const { t, i18n } = useTranslation();
	const [showLanguagePicker, setShowLanguagePicker] = useState(false);
	const { professionId, setProfessionId } = useAuth();

	const handleLanguageButtonPress = () => {
		setShowLanguagePicker(true);
	};

	const handleCloseLanguagePicker = () => {
		setShowLanguagePicker(false);
	};

	useEffect(() => {
		console.log('Language changed:', i18n.language);
	}, [i18n.language]);

	const handleOptionSelect = (option: string) => {
		setProfessionId(option);
	};
	
	return (
		<ScrollView style={styles.mainWrapper}>
			<View style={styles.buttonContainer}>
				<Buttons
					style={styles.button}
					label=""
					variant="outlined"
					onPress={handleLanguageButtonPress}
					iconHeight={30}
					iconWidth={30}
					iconGap={0}
					icon={language}
				/>
			</View>
			<View style={styles.imageContainer}>
				<Image
					source={require('../../../assets/images/group_907.png')}
					style={styles.imageSaathi}
				/>
			</View>
			<View style={styles.categories}>
				<TouchableOpacity
					style={styles.oval}
					onPress={() => handleOptionSelect(Constants.ELECTRICAL_AND_PLUMBING_EXPERT_PID)}
				>
					<Image
						source={require('../../../assets/images/ic_influencer.png')}
						style={[
							styles.categoryIcon,
						]}
						resizeMode="contain"

					/>
					<Text style={styles.categoryText}>
						{t('strings:electrical_amp_plumbing_expert')}
					</Text>
					<View>
						<Image
							source={professionId === Constants.ELECTRICAL_AND_PLUMBING_EXPERT_PID ? blackTickImage : whiteTickImage}
							style={styles.tick}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.oval}
					onPress={() => handleOptionSelect(Constants.AC_SERVICE_ENGINEER_PID)}
				>
					<Image
						source={require('../../../assets/images/ic_retailer_1.png')}
						style={[
							styles.categoryIcon,
						]}
						resizeMode="contain"
					/>
					<Text style={styles.categoryText}>
						{t('strings:ac_service_engineer')}
					</Text>
					<View>
						<Image
							source={professionId === Constants.AC_SERVICE_ENGINEER_PID ? blackTickImage : whiteTickImage}
							style={styles.tick}
						/>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.startButtonContainer}>
				<Buttons
					label={t('strings:start')}
					variant="filledButton"
					onPress={() => navigation.navigate('login')}
					iconHeight={10}
					iconWidth={30}
					iconGap={30}
					icon={arrowIcon}
					width="90%"
				/>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={showLanguagePicker}
				onRequestClose={handleCloseLanguagePicker}
			>
				<View style={styles.languagePickerContainer}>
					<LanguagePicker onCloseModal={handleCloseLanguagePicker} />
					<TouchableOpacity onPress={handleCloseLanguagePicker}>
						<Text style={styles.closeText}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		padding: 25,
		paddingBottom: 40,
		backgroundColor: colors.white,

	},
	buttonContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	button: {
		alignSelf: 'flex-end',
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginVertical: responsiveHeight(8),
	},
	imageSaathi: {
		width: responsiveHeight(20),
		height: responsiveHeight(19.6),
	},
	oval: {
		height: responsiveHeight(30),
		width: responsiveWidth(25),
		backgroundColor: colors.yellow,
		borderRadius: 50,
		paddingHorizontal: 8,
		paddingVertical: 30,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.8)',
		elevation: 5,
		gap: 10
	},
	categories: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
		width: '100%',
		marginBottom: responsiveHeight(5)
	},
	startButtonContainer: {
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginBottom: 50
		// height: '40%',
		// backgroundColor: colors.yellow
	},
	categoryIcon: {
		height: 50,
		width: 50,
		flex: 1
	},
	categoryText: {
		color: colors.black,
		fontSize: responsiveFontSize(1.5),
		flex: 1,
		fontWeight: 'bold'
	},
	option: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		flex: 1
	},
	tick: {
		height: 15,
		width: 15
	},
	languagePickerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	closeText: {
		marginTop: 20,
		color: colors.black,
		backgroundColor: colors.yellow,
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 5,
		fontWeight: 'bold'
	},
});

export default CategorySelection;
