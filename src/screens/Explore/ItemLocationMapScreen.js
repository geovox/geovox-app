import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Screen from '../../components/common/Screen';
import ItemLocationModal from '../../components/modal/ItemLocationModal';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { parseTokenData } from '../../utils';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const ItemLocationMapScreen = ({ navigation, route }) => {
	const marker = parseTokenData(route.params?.data);

	const [modalVisible, setModalVisible] = useState(true);

	return (
		<Screen>
			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
				<View style={styles.backButton}>
					<Ionicons
						name="ios-chevron-back-outline"
						size={24}
						color={Colors.black}
					/>
					<Text style={styles.backButtonText}>Back</Text>
				</View>
			</TouchableWithoutFeedback>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: parseFloat(marker.latitude) - 0.001,
					longitude: parseFloat(marker.longitude),
					latitudeDelta: 0.002,
					longitudeDelta: 0.002,
				}}
				userInterfaceStyle="dark"
				showsBuildings={false}
				showsCompass={false}
				showsTraffic={false}
				showsScale={false}
				showsMyLocationButton
				showsPointsOfInterest={false}
				showsIndoorLevelPicker={false}
				showsIndoors={false}
			>
				<Marker
					key={`${marker.longitude}-${marker.latitude}`}
					coordinate={{
						latitude: parseFloat(marker.latitude),
						longitude: parseFloat(marker.longitude),
					}}
					onPress={() => setModalVisible(true)}
				/>
			</MapView>
			<ItemLocationModal
				isVisible={modalVisible}
				onClose={() => setModalVisible(false)}
				isCollected
				backdropOpacity={0}
				itemDetail={marker}
			/>
		</Screen>
	);
};

export default ItemLocationMapScreen;

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	markerContainer: {
		padding: 5,
		borderRadius: 8,
		backgroundColor: Colors.orange,
		overflow: 'hidden',
		width: 110,
	},
	markerImage: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	markerText: {
		color: Colors.black,
		fontFamily: Font.Regular,
		textAlign: 'center',
		marginTop: 4,
		fontSize: ResponsiveFont(10),
	},
	backButton: {
		position: 'absolute',
		padding: 8,
		paddingRight: 12,
		borderTopRightRadius: 16,
		borderBottomRightRadius: 16,
		backgroundColor: Colors.orange,
		top: 16,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 9999,
	},
	backButtonText: {
		color: Colors.black,
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
	},
});
