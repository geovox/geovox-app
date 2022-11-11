import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import Avatar from '../common/Avatar';

const ProfileAccount = () => {
	return (
		<View>
			<Avatar />
			<Text style={styles.accountText}>brown.xq.near</Text>
			<Text style={styles.accountEmailText}>brown123@gmail.com</Text>

			<View style={styles.accountLevelContainer}>
				<Image
					source={require('../../../assets/badge/1.png')}
					style={styles.accountLevelBadge}
				/>
				<Text style={styles.accountLevelText}>Alpha Level</Text>
			</View>
		</View>
	);
};

export default ProfileAccount;

const styles = StyleSheet.create({
	accountText: {
		color: Colors.white,
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(16),
		textAlign: 'center',
		marginTop: 12,
	},
	accountEmailText: {
		color: Colors.white,
		fontFamily: Font.Light,
		fontSize: ResponsiveFont(12),
		textAlign: 'center',
	},
	accountLevelContainer: {
		width: '50%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginTop: 8,
	},
	accountLevelBadge: {
		height: 28,
		width: 28,
		borderRadius: 6,
		marginRight: 8,
	},
	accountLevelText: {
		fontFamily: Font.Bold,
		color: Colors.white,
		fontSize: ResponsiveFont(11),
	},
});
