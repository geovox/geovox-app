import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
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
import { isIOS, ROOT_ACCOUNT } from '../../constants/Common';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const LoginScreen = ({ navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser } = useStore();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const res = await axios.post(`${API_URL}/login`, {
				accountId: data.username + ROOT_ACCOUNT,
				seed: data.seedphrase,
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
		<Screen style={{ flex: 1, padding: 48 }}>
			<KeyboardAvoidingView
				behavior={isIOS ? 'padding' : 'height'}
				style={{ flex: 1, justifyContent: 'center' }}
			>
				<DismissKeyboard style={{ justifyContent: 'center' }}>
					<Text style={_styles.title}>{'Welcome\nBack'}</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="username"
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={_styles.formContainer}>
								<TextInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									style={_styles.textInput}
									selectionColor={Colors['white']}
									autoCorrect={false}
									autoCapitalize="none"
									placeholder="Username"
									placeholderTextColor={Colors['dark-gray-4']}
								/>
								<Text style={_styles.textHelper}>{ROOT_ACCOUNT}</Text>
							</View>
						)}
					/>
					{errors.username && (
						<Text style={_styles.errorText}>Username is required</Text>
					)}
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="seedphrase"
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={_styles.formContainer}>
								<TextInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									style={[_styles.textInput, { paddingRight: 12 }]}
									selectionColor={Colors['white']}
									autoCorrect={false}
									autoCapitalize="none"
									placeholder="Seed Phrase"
									placeholderTextColor={Colors['dark-gray-4']}
									keyboardType="default"
									secureTextEntry
								/>
								<TouchableWithoutFeedback
									onPress={async () => {
										const seedphrase = await Clipboard.getStringAsync();
										setValue('seedphrase', seedphrase);
									}}
								>
									<Text style={_styles.textHelper}>paste</Text>
								</TouchableWithoutFeedback>
							</View>
						)}
					/>
					{errors.seedphrase && (
						<Text style={_styles.errorText}>Seed phrase is required </Text>
					)}
					<Button
						containerStyle={_styles.buttonContainer}
						title="Login"
						isLoading={isSubmitting}
						onPress={handleSubmit(onSubmit)}
					/>
					<Text style={_styles.registText}>
						{'Dont have an account? '}
						<TouchableWithoutFeedback
							onPress={() => navigation.navigate(Routes.Register)}
						>
							<Text style={{ fontFamily: Font.SemiBold }}>Sign up</Text>
						</TouchableWithoutFeedback>
					</Text>
				</DismissKeyboard>
			</KeyboardAvoidingView>
		</Screen>
	);
};

export default LoginScreen;

const _styles = StyleSheet.create({
	title: {
		fontSize: ResponsiveFont(36),
		color: Colors.white,
		fontFamily: Font.Bold,
		marginBottom: 16,
	},
	formContainer: {
		borderRadius: 4,
		backgroundColor: Colors['dark-gray-1.5'],
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 12,
	},
	textInput: {
		fontFamily: Font.Regular,
		color: Colors.white,
		fontSize: ResponsiveFont(14),
		padding: 12,
		paddingRight: 4,
		flex: 1,
	},
	textHelper: {
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(14),
		color: Colors.white,
		marginRight: 16,
	},
	errorText: {
		fontFamily: Font.Light,
		fontSize: ResponsiveFont(10),
		color: 'red',
		marginBottom: 8,
		marginLeft: 4,
	},
	registText: {
		fontFamily: Font.Regular,
		color: Colors.white,
		fontSize: ResponsiveFont(12),
		marginTop: 32,
	},
	buttonContainer: {
		marginTop: 16,
	},
});
