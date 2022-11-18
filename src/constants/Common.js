import { Dimensions, Platform } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const ROOT_ACCOUNT = '.gvx.testnet';
export const NFT_CONTRACT_ACCOUNT = 'nft.gvx.testnet';

export const STORE_KEY = 'LOGGED_IN_USER';

export const LEVEL_BADGE = {
	Lurker: require('../../assets/badge/1.png'),
	Craftsman: require('../../assets/badge/2.png'),
	Adventurer: require('../../assets/badge/3.png'),
	Demigod: require('../../assets/badge/4.png'),
};

export const PAGE_SIZE = 10;
