import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { parseImgUrl } from '../../utils';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const ItemDetailScreen = ({ navigation, route }) => {
	const { data } = route.params;
	const [dimension, setDimension] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const img = parseImgUrl(data.metadata.media);
		Image.getSize(img, (width, height) => {
			const screenWidth = Dimensions.get('window').width - 32;
			const scaleFactor = width / screenWidth;
			const imageHeight = height / scaleFactor;
			setDimension({ width: screenWidth, height: imageHeight });
		});
	}, []);

	const extra = data.metadata.extra ? JSON.parse(data.metadata.extra) : {};

	return (
		<Screen>
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				style={{ marginTop: 16, paddingHorizontal: 16 }}
				stickyHeaderIndices={[0]}
			>
				<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
					<View style={styles.backButton}>
						<Ionicons
							name="ios-chevron-back-outline"
							size={24}
							color={Colors.orange}
						/>
						<Text style={styles.backButtonText}>Back</Text>
					</View>
				</TouchableWithoutFeedback>
				<Image
					source={{ uri: parseImgUrl(data.metadata.media) }}
					style={{ width: dimension.width, height: dimension.height }}
				/>
				<View style={styles.detailContainer}>
					<View style={styles.titleContainer}>
						<View>
							<Text style={styles.title}>{data.metadata.title}</Text>
							<TouchableWithoutFeedback
								onPress={() =>
									navigation.navigate(Routes.ItemLocationMap, { data })
								}
							>
								<View style={styles.seeOnMapsContainer}>
									<FontAwesome5 name="map" size={18} color={Colors.orange} />
									<Text style={styles.seeOnMapsText}>See on maps</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<TouchableWithoutFeedback onPress={() => console.log('share')}>
							<FontAwesome5
								name="share-square"
								size={16}
								color={Colors.white}
							/>
						</TouchableWithoutFeedback>
					</View>

					<Text style={styles.headingText}>Token Info</Text>
					<View style={styles.infoContainer}>
						<Text style={styles.typeText}>Smart Contract</Text>
						<Text style={styles.valueText}>{data.contract_id}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.typeText}>Token ID</Text>
						<Text style={styles.valueText}>{data.token_id}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.typeText}>Edition</Text>
						<Text style={styles.valueText}>#{data.edition_id}</Text>
					</View>
					{data.owner_id && (
						<View style={styles.infoContainer}>
							<Text style={styles.typeText}>Owned by</Text>
							<Text style={styles.valueText}>{data.owner_id}</Text>
						</View>
					)}
					<View style={styles.infoContainer}>
						<Text style={styles.typeText}>Rarity</Text>
						<Text style={styles.valueText}>Rare</Text>
					</View>
					<Text style={styles.headingText}>Description</Text>
					<Text style={styles.typeText}>
						{data.metadata.description || extra.description}
					</Text>
				</View>
			</ScrollView>
		</Screen>
	);
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
	backButton: {
		marginBottom: 24,
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButtonText: {
		color: Colors.orange,
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
	},
	detailContainer: {
		padding: 16,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
	},
	title: {
		color: Colors.white,
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(18),
	},
	seeOnMapsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	seeOnMapsText: {
		color: Colors.orange,
		fontFamily: Font.Medium,
		marginLeft: 8,
		fontSize: ResponsiveFont(12),
	},
	headingText: {
		marginTop: 16,
		marginBottom: 8,
		fontFamily: Font.SemiBold,
		color: Colors.white,
		fontSize: ResponsiveFont(12),
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
});
