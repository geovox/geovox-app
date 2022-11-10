import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import FontLoaderWrapper from '../../components/wrapper/FontLoader';
import { Colors } from '../../constants/Colors';

const Screen = ({ children, style, transparent = false, containerStyle }) => {
	return (
		<FontLoaderWrapper>
			<View
				style={[
					{
						flex: 1,
						backgroundColor: transparent
							? 'transparent'
							: Colors['dark-gray-1'],
						width: '100%',
						height: '100%',
					},
					containerStyle,
				]}
			>
				<SafeAreaView style={[{ flex: 1 }]}>
					<StatusBar
						barStyle="light-content"
						backgroundColor={Colors['dark-gray-1']}
					/>
					<View style={[{ flex: 1 }, style]}>{children}</View>
				</SafeAreaView>
			</View>
		</FontLoaderWrapper>
	);
};

export default Screen;
