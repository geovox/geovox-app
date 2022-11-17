import { NFT_CONTRACT_ACCOUNT } from '../constants/Common';

export const parseImgUrl = (url) => {
	if (url.includes('ipfs')) {
		return url;
	}
	return `https://ipfs.fleek.co/ipfs/${url}`;
};

export const kFormatter = (num) => {
	return Math.abs(num) > 999
		? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
		: Math.sign(num) * Math.abs(num);
};

export const parseTokenData = (token) => {
	const extra = token.metadata.extra ? JSON.parse(token.metadata.extra) : {};
	return {
		name: token.metadata.title,
		city: token.metadata.city,
		address: token.metadata.address,
		longitude:
			token.longitude ||
			extra.longitude ||
			token.metadata.attributes?.find?.((a) => a.trait_type === 'longitude')
				.value,
		latitude:
			token.latitude ||
			extra.latitude ||
			token.metadata.attributes?.find?.((a) => a.trait_type === 'latitude')
				.value,
		images: parseImgUrl(token.metadata.media),
		tokenSeriesId: token.token_series_id || token.token_id?.split(':')[0],
		tokenId: token.token_id,
		contractId: token.contract_id || NFT_CONTRACT_ACCOUNT,
		ownerId: token.owner_id,
	};
};
