import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const WebScreen = ({ navigation, route }) => {
	const { url } = route.params;
	return (
		<Screen>
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
			<WebView
				source={{ uri: url }}
				style={{ flex: 1, backgroundColor: Colors.black }}
			/>
		</Screen>
	);
};

export default WebScreen;

const styles = StyleSheet.create({
	backButton: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButtonText: {
		color: Colors.orange,
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
	},
});
