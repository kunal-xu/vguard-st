
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import colors from '../utils/colors'

import { useTranslation } from 'react-i18next';

const NeedHelp = () => {
	const { t } = useTranslation();

	const phoneNumber = '9717500011';
	const email = 'info@vguardrishta.com';
	const whatsappNumber = '9818900011';

	const callPhoneNumber = () => {
		Linking.openURL(`tel:${phoneNumber}`);
	};

	const sendEmail = () => {
		Linking.openURL(`mailto:${email}`);
	};

	const openWhatsApp = () => {
		Linking.openURL(`https://wa.me/${whatsappNumber}`);
	};
	return (
		<View style={styles.contact}>
			<Text style={styles.textHeader}>
				{t('strings:need_help')}
			</Text>
			<Pressable onPress={callPhoneNumber}>
				<View style={styles.helpContainer}>
					<Image
						source={require('../assets/images/ic_phone_call_2.png')}
						style={styles.icon}
					/>
					<Text style={styles.textHelp}>
						{phoneNumber}
					</Text>
				</View>
			</Pressable>
			<Pressable onPress={sendEmail}>
				<View style={styles.helpContainer}>
					<Image
						source={require('../assets/images/ic_email.png')}
						style={styles.icon}
					/>
					<Text style={styles.textHelp}>
						{email}
					</Text>
				</View>
			</Pressable>
			<Pressable onPress={openWhatsApp}>
				<View style={styles.helpContainer}>
					<Image
						source={require('../assets/images/ic_whatsapp.webp')}
						style={styles.icon}
					/>
					<Text style={styles.textHelp}>
						{whatsappNumber}
					</Text>
				</View>

			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	contact: {
		width: '100%',
		marginTop: 20,
		textAlign: 'left',
	},
	textHeader: {
		fontWeight: 'bold',
		color: colors.black,
		fontSize: 25,
	},
	helpContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center',
		gap: 10,
	},
	icon: {
		height: 20,
		width: 20,
	},
	textHelp: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.black,
	},
});

export default NeedHelp;
