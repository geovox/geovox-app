import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const url =
	'https://paras-cdn.imgix.net/e5abc27249c2f187b9519855a854221193abf412';

const ProfileNFT = () => {
	return (
		<TouchableOpacity
			onPress={() => console.log('click parent')}
			style={styles.profileNFTContainer}
		>
			<Image source={{ uri: url }} style={styles.image} />
			<View style={styles.detailContainer}>
				<Text style={styles.title}>Mr Lucky grantt</Text>
				<Text style={styles.subtitle}>Collected on 17 Jan</Text>
				<TouchableOpacity
					style={styles.mapstext}
					onPress={() => console.log('click see on maps')}
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
