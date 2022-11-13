import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Routes from '../constants/Routes';
import ConfirmSeedPhraseScreen from '../screens/Auth/ConfirmSeedPhraseScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SeedPhraseScreen from '../screens/Auth/SeedPhraseScreen';
import LandingScreen from '../screens/Landing/LandingScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
			initialRouteName={Routes.Landing}
		>
			<Stack.Screen name={Routes.Login} listeners component={LoginScreen} />
			<Stack.Screen name={Routes.Register} component={RegisterScreen} />
			<Stack.Screen
				name={Routes.ConfirmSeedPhrase}
				component={ConfirmSeedPhraseScreen}
			/>
			<Stack.Screen name={Routes.Landing} component={LandingScreen} />
			<Stack.Screen name={Routes.SeedPhrase} component={SeedPhraseScreen} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
