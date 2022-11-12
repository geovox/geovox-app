import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

export const Button = ({
	onPress,
	title,
	containerStyle,
	textStyle,
	type = 'orange',
}) => {
	let buttonColor;
	let textColor;

	if (type === 'orange') {
		buttonColor = { backgroundColor: Colors.orange };
		textColor = { color: Colors.black };
	} else if (type === 'white') {
		buttonColor = { backgroundColor: Colors.white };
		textColor = { color: Colors.black };
	} else if (type === 'transparent') {
		buttonColor = {
			backgroundColor: 'transparent',
			borderColor: Colors.orange,
			borderWidth: 1,
		};
		textColor = { color: Colors.orange };
	}

	return (
		<Pressable
			style={StyleSheet.flatten([styles.button, buttonColor, containerStyle])}
			onPress={onPress}
		>
			<Text style={StyleSheet.flatten([styles.text, textColor, textStyle])}>
				{title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		paddingHorizontal: 32,
		borderRadius: 8,
		elevation: 3,
	},
	text: {
		fontSize: ResponsiveFont(12),
		lineHeight: 21,
		fontFamily: Font.Regular,
		color: Colors.black,
	},
});
