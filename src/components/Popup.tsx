import React, { ReactNode } from 'react';
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native';
import closeIcon from '../assets/images/ic_close.png';
import checkIcon from '../assets/images/ic_tick_black.png';
import colors from '../../colors';
import {
	responsiveFontSize,
	responsiveHeight,
} from 'react-native-responsive-dimensions';

const Popup = ({ isVisible, onClose, children, acceptUpdate }: PopupProps) => {
	if (!isVisible) {
		return null;
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.popupText}>{children}</Text>

					{acceptUpdate && <TouchableOpacity style={styles.checkButton} onPress={acceptUpdate}>
						<Image
							source={checkIcon}
							style={{ flex: 1, width: '100%', height: '100%' }}
							resizeMode="contain"
						/>
					</TouchableOpacity>}

					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Image
							source={closeIcon}
							style={{ flex: 1, width: '100%', height: '100%' }}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		height: '30%',
		width: '80%',
		padding: 30,
		backgroundColor: colors.yellow,
		borderRadius: 10,
		borderBottomRightRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButton: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		width: responsiveHeight(8),
		height: responsiveHeight(8),
	},
	checkButton: {
		position: 'absolute',
		bottom: 23,
		right: 80,
		width: responsiveHeight(5.5),
		height: responsiveHeight(5.5),
		// padding:2
	},
	closeButtonText: {
		color: 'blue',
	},
	popupText: {
		color: colors.black,
		fontSize: responsiveFontSize(2.2),
		textAlign: 'center',
		fontWeight: 'bold',
		lineHeight: responsiveHeight(3),
		width: '70%',
	},
});

export default Popup;
