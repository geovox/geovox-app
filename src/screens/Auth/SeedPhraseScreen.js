import * as Clipboard from 'expo-clipboard';
import { useEffect } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

import { Button } from '../../components/common/Button';
import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const SeedPhraseScreen = ({ navigation, route }) => {
	// const {
	// 	data = 'mantap betul ini seed phrase bukan maknaya lokasi lebih dadrinya',
	// } = route.params;
	const data = {
		seedPhrase:
			'mantap betul ini seed phrase bukan maknaya lokasi lebih dadrinya mengapa',
	};
	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(data.seedPhrase);
		// CustomToast('Seed password copied to clipboard', 0, 'default', 1000);
	};

	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
			Alert.alert(
				'Registration uncomplete',
				'You have not finish your registration yet. Are you sure to discard and leave the screen?',
				[
					{ text: 'Cancel', style: 'cancel', onPress: () => {} },
					{
						text: 'Discard',
						style: 'destructive',
						onPress: () => navigation.dispatch(e.data.action),
					},
				]
			);
		});
	}, [navigation]);

	return (
		<Screen style={{ margin: 32, flex: 1, justifyContent: 'center' }}>
			<Text style={styles.textDesc}>
				This is your seed password, it has 12 words and used as signature for
				your data so no one is able to modify or delete your data.
			</Text>
			<Text style={[styles.textDesc, { marginTop: 24 }]}>
				Keep this seed password save and do not share them with anyone. Paras
				will not be able to recover your account if this seed password is lost.
			</Text>
			<View
				style={{
					marginTop: 32,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text style={styles.textDesc}>Seed Password</Text>
				<TouchableNativeFeedback onPress={copyToClipboard}>
					<Text style={[styles.textDesc, styles.seedPhraseCopy]}>Copy</Text>
				</TouchableNativeFeedback>
			</View>
			<View style={styles.seedPhraseView}>
				<Text selectable style={styles.seedPhraseText}>
					{data.seedPhrase}
				</Text>
			</View>
			<Button
				title={"I've backup the seed phrase"}
				containerStyle={{ marginTop: 0, width: 'auto' }}
				onPress={() => {
					navigation.navigate(Routes.ConfirmSeedPhrase, { data });
				}}
			/>
		</Screen>
	);
};

export default SeedPhraseScreen;

const styles = StyleSheet.create({
	textDesc: {
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(12),
		color: Colors.white,
		lineHeight: 18,
	},
	seedPhraseView: {
		borderRadius: 8,
		marginVertical: 24,
		backgroundColor: Colors['dark-gray-3'],
	},
	seedPhraseCopy: {
		fontSize: ResponsiveFont(10),
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		overflow: 'hidden',
		backgroundColor: Colors['dark-gray-3'],
	},
	seedPhraseText: {
		fontFamily: Font.SemiBold,
		fontSize: ResponsiveFont(13),
		padding: 16,
		color: Colors.white,
		textAlign: 'center',
		alignSelf: 'center',
	},
});
