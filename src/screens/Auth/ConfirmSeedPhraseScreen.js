import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { Button } from '../../components/common/Button';
import { CustomToast } from '../../components/common/CustomToast';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import Screen from '../../components/common/Screen';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const numb = Math.floor(Math.random() * 12 + 1);

const ConfirmSeedPhraseScreen = ({ navigation, route }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [confirmText, setConfirmText] = useState(null);

	const { setUser } = useStore();

	const { data } = route.params;
	const seedPhrase = data.seedPhrase.split(' ');

	const onSubmit = async () => {
		Keyboard.dismiss();
		const isCorrect = seedPhrase[numb - 1] === confirmText;
		if (!isCorrect) {
			CustomToast({
				message: 'Please enter the correct word',
				delay: 0,
				type: 'error',
				duration: 1000,
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await axios.post(`${API_URL}/login`, {
				accountId: data.accountId,
				seed: data.seedPhrase,
			});
			setUser({
				accountId: res.data.accountId,
				email: res.data.email,
				token: res.data.token,
			});
			navigation.navigate(Routes.HomeNavigator, { screen: Routes.Guide });
		} catch (error) {
			CustomToast({ message: error.response.data.message, type: 'error' });
		}
		setIsSubmitting(false);
	};

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
					value={confirmText}
					onChangeText={setConfirmText}
					style={styles.textInput}
					autoCapitalize="none"
					selectionColor={Colors.white}
				/>
				<Button title="Confirm" onPress={onSubmit} isLoading={isSubmitting} />
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
