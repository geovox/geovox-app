import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useSWR from 'swr';

import { CustomToast } from '../../components/common/CustomToast';
import Screen from '../../components/common/Screen';
import ItemLocationModal from '../../components/modal/ItemLocationModal';
import MapLoadingModal from '../../components/modal/MapLoadingModal';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MapScreen = () => {
	const [location, setLocation] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const { token } = useStore();

	const {
		data: markersData,
		mutate,
		isValidating,
	} = useSWR(location ? '/api/locations' : null, async () =>
		axios
			.get(`${API_URL}/locations`, {
				params: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				},
				headers: { Authorization: token },
			})
			.then((res) => res.data)
	);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				CustomToast({
					message: 'Permission to access location was denied',
					type: 'error',
				});

				return;
			}
			await Location.watchPositionAsync(
				{ accuracy: 6, distanceInterval: 3 },
				(location) => {
					console.log('listened location', location);
					setLocation(location);
				}
			);
		})();
	}, []);

	if (!location) return null;

	return (
		<Screen>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Explore</Text>
			</View>
			<TouchableNativeFeedback onPress={mutate}>
				<View style={styles.refreshIconContainer}>
					<MaterialIcons name="refresh" size={24} color="black" />
				</View>
			</TouchableNativeFeedback>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: location.coords?.latitude || 0,
					longitude: location.coords?.longitude || 0,
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
				{markersData?.results?.map((marker, index) => (
					<Marker
						key={`${marker.longitude}-${marker.latitude}-${index}`}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						onPress={() => {
							setModalVisible(true);
							setSelectedItem(marker);
						}}
					>
						<View style={styles.markerContainer}>
							<Image
								source={{ uri: marker.images }}
								style={styles.markerImage}
							/>
							<Text
								style={styles.markerText}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{marker.name}
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
			<MapLoadingModal showModal={Boolean(isValidating && markersData)} />
		</Screen>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	titleContainer: {
		position: 'absolute',
		top: 32,
		left: 0,
		zIndex: 1,
		paddingLeft: 12,
		paddingRight: 16,
		paddingVertical: 8,
		borderTopRightRadius: 16,
		borderBottomRightRadius: 16,
		backgroundColor: Colors.orange,
	},
	refreshIconContainer: {
		position: 'absolute',
		top: 40,
		right: 8,
		padding: 4,
		borderRadius: 20,
		zIndex: 1,
		backgroundColor: Colors.orange,
	},
	titleText: {
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(18),
		color: Colors.black,
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
