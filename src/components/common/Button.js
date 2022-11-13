import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import { Colors } from '../../constants/Colors';
import { Font } from '../../constants/Font';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

export const Button = ({
	onPress,
	title,
	containerStyle,
	textStyle,
	type = 'orange',
	isLoading = false,
	isDisable = false,
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

	const disabled = isLoading ? true : !!isDisable;

	return (
		<Pressable
			style={StyleSheet.flatten([
				styles.button,
				disabled && styles.disabledButton,
				buttonColor,
				containerStyle,
			])}
			disabled={disabled}
			onPress={onPress}
		>
			{isLoading ? (
				<MaterialIndicator
					style={styles.text}
					size={18}
					color={textColor.color}
				/>
			) : (
				<Text style={StyleSheet.flatten([styles.text, textColor, textStyle])}>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		paddingHorizontal: 32,
		minHeight: 48,
		borderRadius: 8,
		elevation: 3,
	},
	disabledButton: {
		opacity: 0.5,
	},
	text: {
		fontSize: ResponsiveFont(12),
		lineHeight: 21,
		fontFamily: Font.Regular,
		color: Colors.black,
	},
});
