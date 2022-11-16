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
