import { Ionicons } from '@expo/vector-icons';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { Button } from '../../components/common/Button';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const numb = Math.floor(Math.random() * 12 + 1);

const ConfirmSeedPhraseScreen = ({ navigation }) => {
	return (
		<Screen style={{ margin: 32, flex: 1 }}>
			<DismissKeyboard style={{ justifyContent: 'center' }}>
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
				<Text style={styles.textDesc}>{`Whats the ${numb} word?`}</Text>
				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					selectionColor={Colors.white}
				/>
				<Button title="Confirm" />
			</DismissKeyboard>
		</Screen>
	);
};

export default ConfirmSeedPhraseScreen;

const styles = StyleSheet.create({
	backButton: {
		position: 'absolute',
		top: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButtonText: {
		color: Colors.orange,
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
	},
	textDesc: {
		fontFamily: Font.SemiBold,
		fontSize: ResponsiveFont(13),
		color: Colors.white,
	},
	textInput: {
		marginTop: 8,
		fontFamily: Font.Regular,
		color: Colors.white,
		borderRadius: 4,
		fontSize: ResponsiveFont(13),
		padding: 12,
		backgroundColor: Colors['dark-gray-2'],
		marginBottom: 24,
	},
});
