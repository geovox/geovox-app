import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigator/AuthNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';
import ProfileScreen from './src/screens/User/ProfileScreen';

export default function App() {
	return (
		<NavigationContainer>
			{/* <AuthNavigator /> */}
			{/* <ProfileScreen /> */}
			<HomeNavigator />
		</NavigationContainer>
	);
}
