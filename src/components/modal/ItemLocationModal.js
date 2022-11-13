import { FontAwesome, AntDesign } from '@expo/vector-icons';
import calculateDistance from '@turf/distance';
import axios from 'axios';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RootSiblingParent } from 'react-native-root-siblings';

import { Button } from '../../components/common/Button';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../common/CustomToast';
import CollectingItemModal from './CollectingItemModal';

const ItemLocationModal = ({
	isVisible,
	onClose,
	userLocation,
	itemDetail,
}) => {
	const [isCollecting, setIsCollecting] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { token } = useStore();

	const distance = calculateDistance(
		[userLocation?.longitude, userLocation?.latitude],
		[itemDetail?.longitude, itemDetail?.latitude],
		{ units: 'meters' }
	);
	const isAbleToCollect = distance <= 10;
	const hasCollected = false;

	if (!itemDetail) return null;

	const handleCollect = async () => {
		if (!isAbleToCollect) {
			setShowModal(true);
			return;
		}

		setIsCollecting(true);
		setShowModal(true);
		try {
			await axios.post(
				`${API_URL}/mint-nft`,
				{
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
					_id: itemDetail._id,
				},
				{ headers: { Authorization: token } }
			);
		} catch (error) {
			setShowModal(false);
			CustomToast({ message: error.response.data.message, type: 'error' });
		}
		setIsCollecting(false);
	};

	return (
		<Modal
			isVisible={isVisible}
			style={{
				justifyContent: 'flex-end',
				margin: 0,
			}}
			useNativeDriverForBackdrop
			swipeDirection={['down']}
			onSwipeComplete={onClose}
		>
			<CollectingItemModal
				itemDetail={itemDetail}
				showModal={showModal}
				onClose={() => setShowModal(false)}
				onCloseAll={onClose}
				status={
					!isAbleToCollect
						? 'unreachable'
						: isCollecting
						? 'loading'
						: 'success'
				}
			/>
			<RootSiblingParent>
				<SafeAreaView style={styles.safeAreaContainer}>
					<View style={styles.container}>
						<AntDesign
							name="close"
							size={24}
							color={Colors.white}
							onPress={onClose}
							style={{ position: 'absolute', right: 8, top: 8 }}
						/>
						<Image
							source={{ uri: itemDetail.images }}
							style={styles.imageStyle}
						/>
						<Text style={styles.titleStyle}>{itemDetail.name}</Text>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Smart Contract</Text>
							<Text style={styles.valueText}>nft.xq.testnet</Text>
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Token ID</Text>
							<Text style={styles.valueText}>2883</Text>
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Collected</Text>
							<Text style={styles.valueText}>23/50</Text>
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Rarity</Text>
							<Text style={styles.valueText}>Super Rare</Text>
						</View>
						<View>
							<View style={styles.positionDistance}>
								{!hasCollected && (
									<>
										<FontAwesome
											name="location-arrow"
											size={18}
											color={Colors.white}
										/>

										<Text style={styles.positionText}>
											{isAbleToCollect
												? "You're here"
												: `${distance.toFixed(0)}m away`}
										</Text>
									</>
								)}
							</View>
							{(!isAbleToCollect || hasCollected) && (
								<Text style={styles.tofar}>
									{hasCollected
										? 'You’ve collected this item'
										: "You're to far, come closer to the location to collect"}
								</Text>
							)}
						</View>
						<Button
							title={
								hasCollected
									? 'See on my collections'
									: isAbleToCollect
									? 'Collect'
									: 'Too far'
							}
							isLoading={isCollecting}
							onPress={handleCollect}
							containerStyle={{
								width: '100%',
								marginTop: 16,
							}}
							type={
								hasCollected
									? 'white'
									: isAbleToCollect
									? 'orange'
									: 'transparent'
							}
						/>
					</View>
				</SafeAreaView>
			</RootSiblingParent>
		</Modal>
	);
};

export default ItemLocationModal;

const styles = StyleSheet.create({
	safeAreaContainer: {
		backgroundColor: Colors['dark-gray-2'],
	},
	container: {
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		padding: 24,
		paddingTop: 24,
		alignItems: 'center',
	},
	imageStyle: {
		height: 144,
		width: 144,
		borderRadius: 12,
		marginBottom: 12,
		borderColor: Colors.white,
		borderWidth: 4,
	},
	titleStyle: {
		fontFamily: Font.Medium,
		color: Colors.white,
		marginBottom: 12,
		fontSize: ResponsiveFont(16),
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
		paddingVertical: 4,
		width: '100%',
	},
	typeText: {
		fontFamily: Font.Regular,
		color: Colors['light-gray'],
		fontSize: ResponsiveFont(12),
	},
	valueText: {
		fontFamily: Font.Medium,
		color: Colors.white,
		fontSize: ResponsiveFont(12),
	},
	positionDistance: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 12,
	},
	positionText: {
		fontFamily: Font.Regular,
		color: Colors.white,
		fontSize: ResponsiveFont(12),
		marginLeft: 8,
	},
	tofar: {
		marginTop: 8,
		fontFamily: Font.Regular,
		color: Colors['light-gray'],
		fontSize: ResponsiveFont(10),
	},
});
