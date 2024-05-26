import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Linking, Image, View, Modal } from 'react-native';
import colors from '../utils/colors';

const PointsPopup = () => {
	const [isModalVisible, setModalVisible] = useState(true);

	useEffect(() => {
		setModalVisible(true);
	}, []);

	return (
		<Modal
			transparent={true}
			animationType="slide"
			visible={isModalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Image
						source={require('../assets/images/PointsScheme.jpg')}
						style={styles.image}
						resizeMode="contain"
					/>
					<TouchableOpacity style={styles.viewTouchable} onPress={() => console.log("Pressed")}>
						<Text style={styles.viewText}>View</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
						<Image
							source={require('../assets/images/ic_close.png')}
							style={styles.closeButtonIcon}
							resizeMode='contain'
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
		height: 600,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		borderBottomEndRadius: 20,
		borderBottomStartRadius: 20,
	},
	image: {
		width: '100%',
		height: '90%',
	},
	viewText: {
		color: colors.black,
		fontWeight: 'bold',
	},
	viewTouchable: {
		backgroundColor: colors.yellow,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginTop: 5,
	},
	closeButton: {
		height: 50,
		width: 50,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	closeButtonIcon: {
		height: '100%',
		width: '100%',
	},
});

export default PointsPopup;
