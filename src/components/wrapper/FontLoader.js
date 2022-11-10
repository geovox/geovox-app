import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Font } from '../../constants/Font';

const FontLoaderWrapper = ({ children }) => {
	const [fontsLoaded] = useFonts({
		[Font.Bold]: require('../../../assets/fonts/Montserrat-Bold.ttf'),
		[Font.Light]: require('../../../assets/fonts/Montserrat-Light.ttf'),
		[Font.Medium]: require('../../../assets/fonts/Montserrat-Medium.ttf'),
		[Font.Regular]: require('../../../assets/fonts/Montserrat-Regular.ttf'),
		[Font.SemiBold]: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
	});

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			{children}
		</View>
	);
};

export default FontLoaderWrapper;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
