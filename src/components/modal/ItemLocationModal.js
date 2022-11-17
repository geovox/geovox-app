import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import calculateDistance from '@turf/distance';
import axios from 'axios';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RootSiblingParent } from 'react-native-root-siblings';
import useSWR from 'swr';

import { Button } from '../../components/common/Button';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { NFT_CONTRACT_ACCOUNT } from '../../constants/Common';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { viewFunction } from '../../lib/near';
import useStore from '../../lib/store';
import { kFormatter, parseImgUrl } from '../../utils';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../common/CustomToast';
import CollectingItemModal from './CollectingItemModal';

const ItemLocationModal = ({
	isVisible,
	onClose,
	userLocation,
	itemDetail,
	isCollected = false,
	backdropOpacity = 0.7,
}) => {
	const [isCollecting, setIsCollecting] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { token, accountId } = useStore();
	const navigation = useNavigation();

	const {
		data: tokenData,
		isValidating,
		mutate,
	} = useSWR(
		accountId && isVisible && !isCollected ? itemDetail.tokenSeriesId : null,
		async () => {
			const res = await viewFunction({
				methodName: 'is_account_has_series',
				args: {
					account_id: accountId,
					token_series_id: itemDetail.tokenSeriesId,
				},
				receiverId: NFT_CONTRACT_ACCOUNT,
			});
			return res;
		}
	);

	const distance = calculateDistance(
		[userLocation?.longitude, userLocation?.latitude],
		[itemDetail?.longitude, itemDetail?.latitude],
		{ units: 'meters' }
	);
	const isAbleToCollect = isVisible ? distance <= 10 : false;
	const hasCollected = tokenData || isCollected || false;

	if (!itemDetail) return null;

	const handleCollect = async () => {
		if (hasCollected) {
			onClose();
			navigation.navigate(Routes.Profile);
			return;
		}

		if (!isAbleToCollect) {
			setShowModal(true);
			return;
		}

		setIsCollecting(true);
		setShowModal(true);
		try {
			await axios.post(
				itemDetail.type === 'onboard'
					? `${API_URL}/mint-nft-onboard`
					: `${API_URL}/mint-nft`,
				{
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
					_id: itemDetail._id,
				},
				{ headers: { Authorization: token } }
			);
			setShowModal('success');
		} catch (error) {
			setShowModal(false);
			CustomToast({ message: error.response.data.message, type: 'error' });
		}
		setIsCollecting(false);
		setTimeout(mutate, 1000);
	};

	return (
		<Modal
			isVisible={isVisible}
			style={{
				justifyContent: 'flex-end',
				margin: 0,
			}}
			backdropOpacity={backdropOpacity}
			useNativeDriverForBackdrop
			swipeDirection={['down']}
			onSwipeComplete={onClose}
		>
			<CollectingItemModal
				itemDetail={itemDetail}
				showModal={Boolean(showModal)}
				onClose={() => setShowModal(false)}
				onCloseAll={onClose}
				status={
					!isAbleToCollect
						? 'unreachable'
						: isCollecting
						? 'loading'
						: showModal === 'success'
						? 'success'
						: 'error'
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
							source={{ uri: parseImgUrl(itemDetail.images) }}
							style={styles.imageStyle}
						/>
						<Text style={styles.titleStyle}>{itemDetail.name}</Text>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Smart Contract</Text>
							<Text
								style={styles.valueText}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{itemDetail.contractId}
							</Text>
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Series ID</Text>
							<Text style={styles.valueText}>{itemDetail.tokenSeriesId}</Text>
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.typeText}>Rarity</Text>
							<Text style={styles.valueText}>Rare</Text>
						</View>
						{itemDetail.city && (
							<View style={styles.detailContainer}>
								<Text style={styles.typeText}>City</Text>
								<Text style={styles.valueText}>{itemDetail.city}</Text>
							</View>
						)}
						{itemDetail.tokenId && (
							<View style={styles.detailContainer}>
								<Text style={styles.typeText}>Token Id</Text>
								<Text style={styles.valueText}>{itemDetail.tokenId}</Text>
							</View>
						)}
						{itemDetail.ownerId && (
							<View style={styles.detailContainer}>
								<Text style={styles.typeText}>Owned by</Text>
								<Text style={styles.valueText}>{itemDetail.ownerId}</Text>
							</View>
						)}
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
												: `${kFormatter(distance.toFixed(0))}m away`}
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
							isLoading={isCollecting || isValidating}
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
		overflow: 'hidden',
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
