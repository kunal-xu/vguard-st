import React, { ReactNode } from 'react';
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	Image,
	Linking,
} from 'react-native';
import closeIcon from '../assets/images/ic_close.png';
import checkIcon from '../assets/images/ic_tick_black.png';
import { PopupProps } from '../utils/interfaces';
import colors from '../utils/colors';

const Popup = ({ isVisible, onClose, children, acceptUpdate }: PopupProps) => {
	if (!isVisible) {
		return null;
	}
	const replaceLinkWithComponent = (content: string) => {
    const textContent = String(content);
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = textContent.match(urlRegex);
    if (matches && matches.length > 0) {
      const link = matches[0];
      const beforeLink = textContent.split(link)[0];
      const afterLink = textContent.split(link)[1];
      return (
        <Text>
          {beforeLink}
          <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <Text style={styles.linkText}>Play Store</Text>
          </TouchableOpacity>
          {afterLink}
        </Text>
      );
    }
    return <Text style={styles.popupText}>{content}</Text>;
  };

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.popupText}>{replaceLinkWithComponent(children)}</Text>
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
		height: '35%',
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
		width: 10,
		height: 10,
	},
	checkButton: {
		position: 'absolute',
		bottom: 23,
		right: 80,
		width: 10,
		height: 10,
		// padding:2
	},
	closeButtonText: {
		color: 'blue',
	},
	popupText: {
		color: colors.black,
		fontSize: 22,
		textAlign: 'center',
		fontWeight: 'bold',
		lineHeight: 30,
		width: '70%',
	},
	linkText: {
		fontSize: 20,
		fontWeight: 'bold',
		height: 21,
		lineHeight: 30,
		textDecorationLine: 'underline',
		color: 'blue',
	}
});

export default Popup;
