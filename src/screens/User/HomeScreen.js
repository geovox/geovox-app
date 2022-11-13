import { AntDesign } from '@expo/vector-icons';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const HomeScreen = ({ navigation }) => {
	return (
		<Screen>
			<ScrollView bounces={false}>
				<View style={{ marginTop: 30, paddingHorizontal: 30 }}>
					<View style={styles.iconContainer}>
						<AntDesign name="find" size={36} color={Colors.black} />
					</View>
					<Text style={styles.title}>
						Find and collect items while you travel
					</Text>
					<Text style={styles.subtitle}>
						Collect Items for your greatest adventure
					</Text>
				</View>
				<Image
					source={require('../../../assets/illustration.png')}
					style={{ width: '100%', height: 250, marginTop: 30 }}
				/>
				<TouchableNativeFeedback
					onPress={() => navigation.navigate(Routes.Map)}
				>
					<Text style={styles.button}>Lets Start!</Text>
				</TouchableNativeFeedback>
			</ScrollView>
		</Screen>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	iconContainer: {
		borderRadius: 32,
		backgroundColor: Colors.orange,
		padding: 12,
		width: 60,
		marginVertical: 12,
	},
	title: {
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(36),
		color: Colors.white,
		marginBottom: 8,
	},
	subtitle: {
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
		color: Colors.white,
	},
	button: {
		margin: 30,
		textAlign: 'right',
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(13),
		color: Colors.orange,
	},
});
