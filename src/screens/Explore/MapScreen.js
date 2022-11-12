import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Screen from '../../components/common/Screen';
import ItemLocationModal from '../../components/modal/ItemLocationModal';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MapScreen = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			await Location.watchPositionAsync(
				{
					accuracy: 6,
					distanceInterval: 3,
				},
				(location) => {
					console.log('listened location', location);
					setLocation(location);
				}
			);
		})();
	}, []);

	useEffect(() => {
		if (location && markers.length === 0) {
			setMarkers(
				generateMarkers({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				})
			);
		}
	}, [location]);

	const generateMarkers = ({ latitude, longitude }) => {
		return new Array(10).fill(0).map((o, i) => {
			return {
				latitude: latitude + (Math.random() - 0.5) * 0.005,
				longitude: longitude + (Math.random() - 0.5) * 0.005,
			};
		});
	};

	if (!location) return null;

	return (
		<Screen>
			<Text style={styles.titleText}>Explore</Text>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.002,
					longitudeDelta: 0.002,
				}}
				userInterfaceStyle="dark"
				showsUserLocation
				showsBuildings={false}
				showsCompass={false}
				showsTraffic={false}
				showsScale={false}
				showsMyLocationButton
				showsPointsOfInterest={false}
				showsIndoorLevelPicker={false}
				showsIndoors={false}
			>
				{markers.map((marker, index) => (
					<Marker
						key={`${marker.longitude}-${marker.latitude}-${index}`}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						onPress={() => {
							setModalVisible(true);
							setSelectedItem({ ...marker, name: index });
						}}
					>
						<View style={styles.markerContainer}>
							<Image
								source={{
									uri: 'https://paras-cdn.imgix.net/bafybeibfhclnik6rnc224z6hsjhmpa3xtfsj25ofejzgpo7goxrlyobewu',
								}}
								style={styles.markerImage}
							/>
							<Text
								style={styles.markerText}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{index} Mongkkk12312312
							</Text>
						</View>
					</Marker>
				))}
			</MapView>
			<ItemLocationModal
				isVisible={modalVisible}
				onClose={() => setModalVisible(false)}
				userLocation={location.coords}
				itemDetail={selectedItem}
			/>
		</Screen>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	titleText: {
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(18),
		color: Colors.white,
		position: 'absolute',
		top: 24,
		left: 24,
		zIndex: 1,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	markerContainer: {
		padding: 3,
		borderRadius: 8,
		backgroundColor: Colors.orange,
		overflow: 'hidden',
		width: 56,
	},
	markerImage: {
		width: 50,
		height: 50,
		borderRadius: 8,
	},
	markerText: {
		color: Colors.black,
		fontFamily: Font.Regular,
		textAlign: 'center',
		fontSize: ResponsiveFont(8),
	},
});
