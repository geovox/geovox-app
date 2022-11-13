import axios from 'axios';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import useSWR from 'swr';

import Screen from '../../components/common/Screen';
import ProfileAccount from '../../components/profile/ProfileAccount';
import ProfileLevelProgress from '../../components/profile/ProfileLevelProgress';
import ProfileNFT from '../../components/profile/ProfileNFT';
import { API_URL, PARAS_API_URL } from '../../constants/Api';
import useStore from '../../lib/store';

const ProfileScreen = ({ navigation }) => {
	const { accountId } = useStore();
	const { data: profileData, mutate: mutateProfile } = useSWR(
		accountId ? '/api/profile' : null,
		async () => {
			const res = await axios.get(`${API_URL}/profile`, {
				params: { accountId },
			});
			return res.data;
		}
	);

	const { data: tokenData, mutate: mutateToken } = useSWR(
		accountId ? '/api/token' : null,
		async () => {
			const res = await axios.get(`${PARAS_API_URL}/token`, {
				params: { owner_id: accountId },
			});
			return res.data.data.results;
		}
	);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			mutateToken();
			mutateProfile();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<Screen>
			<ScrollView
				bounces={false}
				style={{ marginTop: 16, paddingHorizontal: 16 }}
			>
				<ProfileAccount navigation={navigation} level={profileData?.level} />
				<ProfileLevelProgress profile={profileData} />
				{tokenData?.map((token) => (
					<ProfileNFT key={token._id} data={token} />
				))}
			</ScrollView>
		</Screen>
	);
};

export default ProfileScreen;
