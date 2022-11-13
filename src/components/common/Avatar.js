import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const HEX_STRING = '0123456789abcdef';
const randomGradientColorAvatar = (text) => {
	let hexCode = '#';
	for (let i = 0; i < 6; i++) {
		hexCode +=
			HEX_STRING[
				Math.floor(
					((text.charCodeAt(i) - 33) / (122 - 33)) * HEX_STRING.length - 1
				)
			];
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
				colors={[
					randomGradientColorAvatar(accountId.slice(0)),
					randomGradientColorAvatar(accountId.slice(2)),
					randomGradientColorAvatar(accountId.slice(4)),
				]}
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
