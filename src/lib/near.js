import { Buffer } from 'buffer';
import { providers } from 'near-api-js';

import getConfig from './config';

const nearConfig = getConfig('development');

export const viewFunction = async ({ receiverId, methodName, args = '' }) => {
	const res = await new providers.JsonRpcProvider({
		url: nearConfig.nodeUrl,
	}).query({
		request_type: 'call_function',
		account_id: receiverId,
		method_name: methodName,
		args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
		finality: 'optimistic',
	});
	return JSON.parse(Buffer.from(res.result).toString());
};
