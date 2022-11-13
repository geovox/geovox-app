import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
} from 'react-native';

import { Button } from '../../components/common/Button';
import { CustomToast } from '../../components/common/CustomToast';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import Screen from '../../components/common/Screen';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { isIOS } from '../../constants/Common';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const RegisterScreen = ({ navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const res = await axios.post(`${API_URL}/register`, {
				accountId: data.username,
				email: data.email,
			});
			navigation.navigate(Routes.SeedPhrase, { data: res.data });
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
					<Text style={_styles.title}>{'Create\nAccount'}</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="username"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={_styles.textInput}
								autoCorrect={false}
								autoCapitalize="none"
								selectionColor={Colors['white']}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Username"
								placeholderTextColor={Colors['dark-gray-4']}
							/>
						)}
					/>
					{errors.username && (
						<Text style={_styles.errorText}>Username is required</Text>
					)}
					<Controller
						control={control}
						rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
						name="email"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={_styles.textInput}
								autoCorrect={false}
								autoCapitalize="none"
								selectionColor={Colors['white']}
								placeholder="Email"
								placeholderTextColor={Colors['dark-gray-4']}
								keyboardType="email-address"
							/>
						)}
					/>
					{errors.email && (
						<Text style={_styles.errorText}>Please enter valid email</Text>
					)}
					<Button
						title="Register"
						isLoading={isSubmitting}
						onPress={handleSubmit(onSubmit)}
						containerStyle={_styles.buttonContainer}
					/>
					<Text style={_styles.loginText}>
						{'Already have an account? '}
						<TouchableWithoutFeedback
							onPress={() => navigation.navigate(Routes.Login)}
						>
							<Text style={{ fontFamily: Font.SemiBold }}>Login</Text>
						</TouchableWithoutFeedback>
					</Text>
				</DismissKeyboard>
			</KeyboardAvoidingView>
		</Screen>
	);
};

export default RegisterScreen;

const _styles = StyleSheet.create({
	title: {
		fontSize: ResponsiveFont(36),
		color: Colors.white,
		fontFamily: Font.Bold,
		marginBottom: 16,
	},
	textInput: {
		fontFamily: Font.Regular,
		color: Colors.white,
		fontSize: ResponsiveFont(14),
		padding: 12,
		paddingRight: 4,
		borderRadius: 4,
		backgroundColor: Colors['dark-gray-2'],
		marginTop: 12,
	},
	errorText: {
		fontFamily: Font.Light,
		fontSize: ResponsiveFont(10),
		color: 'red',
		marginBottom: 8,
		marginLeft: 4,
	},
	loginText: {
		fontFamily: Font.Regular,
		color: Colors.white,
		fontSize: ResponsiveFont(12),
		marginTop: 32,
	},
	buttonContainer: {
		marginTop: 16,
	},
});
