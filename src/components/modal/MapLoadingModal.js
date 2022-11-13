import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import LoadingMapAnimation from '../../../assets/animation/map.json';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MapLoadingModal = ({ showModal }) => {
	return (
		<Modal animationIn="zoomIn" animationOut="zoomOut" isVisible={showModal}>
			<View style={styles.container}>
				<LottieView
					autoPlay
					style={styles.loadingMapAnimation}
					source={LoadingMapAnimation}
				/>
				<Text style={styles.title}>Loading...</Text>
			</View>
		</Modal>
	);
};

export default MapLoadingModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors['dark-gray-1.5'],
		padding: 24,
		margin: 60,
		borderRadius: 16,
		position: 'relative',
		alignItems: 'center',
	},
	loadingMapAnimation: {
		width: 120,
		height: 80,
	},
	title: {
		color: Colors.white,
		fontFamily: Font.Bold,
		marginTop: 20,
		textAlign: 'center',
		fontSize: ResponsiveFont(13),
	},
});
