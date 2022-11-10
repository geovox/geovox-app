import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigator/AuthNavigator';

export default function App() {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
}
