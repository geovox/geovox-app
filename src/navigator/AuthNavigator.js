import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Routes from '../constants/Routes';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.Login}>
			<Stack.Screen
				options={{ headerShown: false }}
				name={Routes.Login}
				listeners
				component={LoginScreen}
			/>
			<Stack.Screen
				options={{ headerShown: false }}
				name={Routes.Register}
				component={RegisterScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;
