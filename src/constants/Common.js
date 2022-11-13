import { Dimensions, Platform } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const ROOT_ACCOUNT = '.johncena.testnet';
export const STORE_KEY = 'LOGGED_IN_USER';
