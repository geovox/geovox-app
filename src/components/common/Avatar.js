import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

const HEX_STRING = '0123456789abcdef';
const randomGradientColorAvatar = () => {
	let hexCode = '#';
	for (let i = 0; i < 6; i++) {
		hexCode += HEX_STRING[Math.floor(Math.random() * HEX_STRING.length)];
	}
	return hexCode;
};

const Avatar = ({ accountId }) => {
	return (
		<View
			style={{
				height: 80,
				borderRadius: 50,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<LinearGradient
				// Background Linear Gradient
				colors={['#4c669f', '#3b5998', '#192f6a']}
				style={{
					height: 80,
					width: 80,
					borderRadius: 50,
					textAlign: 'center',
				}}
			/>
		</View>
	);
};

export default Avatar;
