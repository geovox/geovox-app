import { Text, View, ImageBackground, Image, StyleSheet } from 'react-native';

import { Button } from '../../components/common/Button';
import Screen from '../../components/common/Screen';
import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const LandingScreen = ({ navigation }) => {
	return (
		<ImageBackground
			source={require('../../../assets/background2.png')}
			style={styles.imageBacgroundView}
			imageStyle={styles.imageBackground}
		>
			<Screen style={{ flex: 1, justifyContent: 'center' }} transparent>
				<View style={styles.imageContainerView}>
					<Image
						source={require('../../../assets/logo.png')}
						style={styles.imageLogo}
					/>
				</View>
				<Text style={styles.textDesc}>
					from geotag: To augment (photographs or other items) with metadata
					indicating a geographic location.
				</Text>
				<Button
					title="Get Started"
					containerStyle={{ width: 'auto', margin: 8, marginTop: 24 }}
					type="transparent"
					onPress={() => navigation.navigate(Routes.Login)}
				/>
			</Screen>
		</ImageBackground>
	);
};

export default LandingScreen;

const styles = StyleSheet.create({
	imageContainerView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageLogo: {
		width: 151,
		height: 32,
		padding: 8,
		marginLeft: 8,
		marginBottom: 8,
	},
	imageBackground: {
		opacity: 0.08,
	},
	imageBacgroundView: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		padding: 48,
		backgroundColor: '#000000',
	},
	textTitle: {
		fontFamily: Font.Bold,
		fontSize: ResponsiveFont(28),
		color: Colors.white,
		marginLeft: 16,
	},
	textDesc: {
		fontFamily: Font.Regular,
		fontSize: ResponsiveFont(14),
		color: Colors.white,
		marginTop: 16,
		marginHorizontal: 8,
		lineHeight: 20,
	},
});
