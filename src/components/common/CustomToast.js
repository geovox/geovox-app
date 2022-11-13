import Toast from 'react-native-root-toast';

import { Colors } from '../../constants/Colors';
import { isIOS } from '../../constants/Common';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

export const CustomToast = ({
	message,
	delay = 0,
	type = 'default',
	duration = Toast.durations.LONG,
}) => {
	Toast.show(message, {
		delay,
		shadow: !isIOS,
		duration,
		containerStyle: {
			top: 16,
		},
		position: Toast.positions.TOP,
		keyboardAvoiding: true,
		textStyle: {
			fontFamily: Font.SemiBold,
			textAlign: 'left',
			fontSize: ResponsiveFont(12),
			color: Colors.white,
		},
		backgroundColor: colorBasedOnType(type),
	});
};

const colorBasedOnType = (type) => {
	if (type === 'error') {
		return Colors['emotion-red'];
	} else if (type === 'success') {
		return Colors['emotion-green'];
	} else {
		return Colors['dark-gray-3'];
	}
};
