import * as SecureStore from 'expo-secure-store';
import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { STORE_KEY } from '../../constants/Common';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import Avatar from '../common/Avatar';

const ProfileAccount = ({ navigation }) => {
	const { accountId, email, removeUser } = useStore();

	const onClickLogout = async () => {
		removeUser();
		await SecureStore.deleteItemAsync(STORE_KEY);
		navigation.navigate(Routes.AuthNavigator, { screen: Routes.Login });
	};

	return (
		<View>
			<TouchableNativeFeedback onPress={onClickLogout}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableNativeFeedback>
			<Avatar />
			<Text style={styles.accountText}>{accountId}</Text>
			<Text style={styles.accountEmailText}>{email}</Text>

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
	logoutText: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(11),
		color: Colors['emotion-red'],
		zIndex: 1,
	},
});
