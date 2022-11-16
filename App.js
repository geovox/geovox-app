import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import { STORE_KEY } from './src/constants/Common';
import Routes from './src/constants/Routes';
import useStore from './src/lib/store';
import AuthNavigator from './src/navigator/AuthNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';
import ItemLocationMapScreen from './src/screens/Explore/ItemLocationMapScreen';
import ItemDetailScreen from './src/screens/User/ItemDetailScreen';
import WebScreen from './src/screens/Web';

const Stack = createNativeStackNavigator();

export default function App() {
	const { accountId, email, token, setUser } = useStore();

	useEffect(() => {
		if (accountId) {
			SecureStore.setItemAsync(
				STORE_KEY,
				JSON.stringify({ accountId, email, token })
			);
		}
	}, [accountId]);

	useEffect(() => {
		const checkIfUserIsLoggedIn = async () => {
			await SplashScreen.preventAutoHideAsync();

			const store = await SecureStore.getItemAsync(STORE_KEY);
			if (store) setUser(JSON.parse(store));

			await SplashScreen.hideAsync();
		};
		checkIfUserIsLoggedIn();
	}, []);

	return (
		<RootSiblingParent>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ headerShown: false, gestureEnabled: false }}
				>
					{!accountId && (
						<Stack.Screen
							name={Routes.AuthNavigator}
							component={AuthNavigator}
						/>
					)}
					<Stack.Screen name={Routes.HomeNavigator} component={HomeNavigator} />
					<Stack.Screen name={Routes.ItemDetail} component={ItemDetailScreen} />
					<Stack.Screen name={Routes.Webview} component={WebScreen} />
					<Stack.Screen
						name={Routes.ItemLocationMap}
						component={ItemLocationMapScreen}
						options={{ gestureEnabled: true }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</RootSiblingParent>
	);
}
