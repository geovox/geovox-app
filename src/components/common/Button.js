import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

export const Button = ({ onPress, title, containerStyle, textStyle }) => {
	return (
		<Pressable
			style={StyleSheet.flatten([styles.button, containerStyle])}
			onPress={onPress}
		>
			<Text style={StyleSheet.flatten([styles.text, textStyle])}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.orange,
	},
	text: {
		fontSize: ResponsiveFont(12),
		lineHeight: 21,
		fontFamily: Font.Regular,
		color: Colors.black,
	},
});
