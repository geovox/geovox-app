import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { parseImgUrl } from '../../utils';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const ProfileNFT = ({ data }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(Routes.ItemDetail, { data })}
			style={styles.profileNFTContainer}
		>
			<Image
				source={{ uri: parseImgUrl(data.metadata.media) }}
				style={styles.image}
			/>
			<View style={styles.detailContainer}>
				<Text style={styles.title}>{data.metadata.title}</Text>
				<Text style={styles.subtitle}>
					Collected on {dayjs(data.metadata.issued_at).format('D MMM')}
				</Text>
				<TouchableOpacity
					style={styles.mapstext}
					onPress={() => navigation.navigate(Routes.ItemLocationMap, { data })}
				>
					<Text style={styles.mapstext}>See on Maps</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

export default ProfileNFT;

const styles = StyleSheet.create({
	profileNFTContainer: {
		borderRadius: 8,
		marginVertical: 4,
		backgroundColor: Colors['dark-gray-1'],
		padding: 8,
		flexDirection: 'row',
	},
	detailContainer: {
		padding: 12,
		position: 'relative',
		flex: 1,
	},
	image: {
		height: 80,
		width: 80,
		borderRadius: 8,
	},
	title: {
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(12),
		color: Colors.white,
	},
	subtitle: {
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(9),
		color: Colors.white,
	},
	mapstext: {
		position: 'absolute',
		bottom: 0,
		padding: 2,
		right: 0,
		fontFamily: Font.Medium,
		fontSize: ResponsiveFont(9),
		color: Colors.white,
	},
});
