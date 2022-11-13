import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import Modal from 'react-native-modal';

import ConfettiAnimation from '../../../assets/animation/confetti.json';
import LoadingMapAnimation from '../../../assets/animation/map.json';
import RoadAnimation from '../../../assets/animation/road.json';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const CollectingItemModal = ({
	itemDetail,
	showModal,
	status,
	onClose,
	onCloseAll,
}) => {
	const navigation = useNavigation();

	return (
		<Modal animationIn="zoomIn" animationOut="zoomOut" isVisible={showModal}>
			<View style={styles.container}>
				{status === 'unreachable' && (
					<>
						<LottieView
							autoPlay
							style={styles.loadingMapAnimation}
							source={RoadAnimation}
						/>
						<Text style={styles.title}>You're too far</Text>
						<TouchableNativeFeedback onPress={onClose}>
							<Text style={styles.dismissText}>Close</Text>
						</TouchableNativeFeedback>
					</>
				)}
				{status === 'loading' && (
					<>
						<LottieView
							autoPlay
							style={styles.loadingMapAnimation}
							source={LoadingMapAnimation}
						/>
						<Text style={styles.title}>Collecting NFT</Text>
					</>
				)}
				{status === 'success' && (
					<>
						<Image source={{ uri: itemDetail.images }} style={styles.image} />
						<LottieView
							autoPlay
							style={styles.confettiAnimation}
							source={ConfettiAnimation}
						/>
						<Text style={styles.title}>
							<Text style={{ fontFamily: Font.Bold }}>
								{itemDetail.name} collected
							</Text>
						</Text>
						<TouchableNativeFeedback
							onPress={() => {
								onClose();
								onCloseAll();
								navigation.navigate(Routes.Profile);
							}}
						>
							<Text style={styles.collectiblesText}>
								See on my collectibles
							</Text>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={onClose}>
							<Text style={styles.dismissText}>Dismiss</Text>
						</TouchableNativeFeedback>
					</>
				)}
			</View>
		</Modal>
	);
};

export default CollectingItemModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors['dark-gray-1.5'],
		padding: 24,
		margin: 60,
		borderRadius: 16,
		position: 'relative',
		alignItems: 'center',
	},
	image: {
		width: 140,
		height: 140,
	},
	title: {
		color: Colors.white,
		fontFamily: Font.Bold,
		marginTop: 20,
		textAlign: 'center',
		fontSize: ResponsiveFont(13),
	},
	loadingMapAnimation: {
		width: 120,
		height: 80,
	},
	confettiAnimation: {
		width: 270,
		height: 270,
		position: 'absolute',
	},
	collectiblesText: {
		fontFamily: Font.Regular,
		color: Colors.orange,
		marginTop: 4,
	},
	dismissText: {
		fontFamily: Font.Regular,
		color: Colors.white,
		marginTop: 16,
		fontSize: ResponsiveFont(11),
	},
});
