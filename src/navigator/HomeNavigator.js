import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { Colors } from '../constants/Colors';
import Routes from '../constants/Routes';
import ConfirmSeedPhraseScreen from '../screens/Auth/ConfirmSeedPhraseScreen';
import MapScreen from '../screens/Explore/Map';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBarStyle,
			}}
		>
			<Tab.Screen
				name={Routes.Guide}
				component={ConfirmSeedPhraseScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="home"
							size={21}
							color={focused ? Colors.orange : Colors['light-gray']}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={Routes.Map}
				component={MapScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="find"
							size={36}
							color={focused ? Colors.orange : Colors['light-gray']}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={Routes.Profile}
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Feather
							name="user"
							size={21}
							color={focused ? Colors.orange : Colors['light-gray']}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		bottom: 55,
		left: 40,
		right: 40,
		paddingBottom: 0,
		backgroundColor: Colors['dark-gray-2'],
		borderTopColor: 'transparent',
		borderRadius: 30,
		height: 60,
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4.5,
		elevation: 5,
	},
});
