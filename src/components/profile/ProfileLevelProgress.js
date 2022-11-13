import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { LEVEL_BADGE } from '../../constants/Common';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const ProfileLevelProgress = ({ profile }) => {
	if (!profile) return <View style={{ marginVertical: 16 }} />;

	const progress =
		((profile.totalNftCollected - profile.levelStart) /
			(profile.levelEnd - profile.levelStart)) *
		100;

	return (
		<View style={styles.profileLevelContainer}>
			<Image
				source={LEVEL_BADGE[profile.nextLevel]}
				style={styles.imageBadge}
			/>
			<View style={styles.progressContainer}>
				<Text style={styles.progressText}>
					<Text>Collect </Text>
					<Text style={{ fontFamily: Font.Bold }}>
						{profile?.nextLevelRemaining} item
					</Text>
					<Text> to next level</Text>
				</Text>
				<View style={styles.progressBarBackground}>
					<View style={[styles.progressBarValue, { width: `${progress}%` }]} />
				</View>
			</View>
			<View>
				<Ionicons name="ios-chevron-forward-outline" size={24} color="white" />
			</View>
		</View>
	);
};

export default ProfileLevelProgress;

const styles = StyleSheet.create({
	profileLevelContainer: {
		marginTop: 18,
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		margin: 4,
		borderRadius: 12,
		borderColor: Colors['dark-gray-2'],
		borderWidth: 3,
	},
	imageBadge: {
		height: 55,
		width: 55,
		borderRadius: 6,
		marginRight: 12,
	},
	progressContainer: {
		flex: 1,
		marginRight: 16,
	},
	progressBarBackground: {
		backgroundColor: Colors['dark-gray-2'],
		height: 11,
		width: '100%',
		borderRadius: 6,
		position: 'relative',
		overflow: 'hidden',
	},
	progressText: {
		fontFamily: Font.Regular,
		color: Colors.white,
		marginBottom: 10,
		fontSize: ResponsiveFont(11),
	},
	progressBarValue: {
		position: 'absolute',
		backgroundColor: Colors.orange,
		height: '100%',
	},
});
