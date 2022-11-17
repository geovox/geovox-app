import axios from 'axios';
import { useEffect } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import Screen from '../../components/common/Screen';
import ProfileAccount from '../../components/profile/ProfileAccount';
import ProfileLevelProgress from '../../components/profile/ProfileLevelProgress';
import ProfileNFT from '../../components/profile/ProfileNFT';
import { API_URL } from '../../constants/Api';
import { Colors } from '../../constants/Colors';
import { NFT_CONTRACT_ACCOUNT, PAGE_SIZE } from '../../constants/Common';
import { Font } from '../../constants/Font';
import Routes from '../../constants/Routes';
import { viewFunction } from '../../lib/near';
import useStore from '../../lib/store';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

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

	const getKey = (pageIndex, previousPageData) => {
		if (previousPageData && !previousPageData.length) return null;
		return { index: pageIndex };
	};

	const fetcher = async ({ index }) => {
		const res = await viewFunction({
			receiverId: NFT_CONTRACT_ACCOUNT,
			methodName: 'nft_tokens_for_owner',
			args: {
				account_id: accountId,
				from_index: (index * PAGE_SIZE).toString(),
				limit: PAGE_SIZE,
			},
		});
		return res;
	};

	const {
		data,
		mutate: mutateToken,
		size,
		setSize,
		isValidating,
		error,
	} = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false });

	const tokenData = data ? [].concat(...data) : [];
	const isEmpty = data?.[0]?.length === 0;
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === 'undefined');
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			mutateToken();
			mutateProfile();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<Screen>
			<FlatList
				nestedScrollEnabled
				ListHeaderComponent={
					<>
						<ProfileAccount
							navigation={navigation}
							level={profileData?.level}
						/>
						<ProfileLevelProgress profile={profileData} />
					</>
				}
				style={{ marginTop: 16, paddingHorizontal: 16 }}
				ListEmptyComponent={
					!isLoadingInitialData && (
						<View style={styles.containerEmpty}>
							<Text style={styles.textEmptyInfo}>
								You haven't collect anything
							</Text>
							<TouchableNativeFeedback
								onPress={() => navigation.navigate(Routes.Map)}
							>
								<Text style={styles.textEmptyButton}>Start exploring</Text>
							</TouchableNativeFeedback>
						</View>
					)
				}
				ListFooterComponent={
					isLoadingMore && (
						<MaterialIndicator
							style={styles.text}
							size={18}
							color={Colors.white}
						/>
					)
				}
				data={tokenData || []}
				renderItem={({ item }) => <ProfileNFT data={item} />}
				keyExtractor={(item) => item.token_id}
				onEndReachedThreshold={0.9}
				onEndReached={
					!isReachingEnd && !isValidating ? () => setSize(size + 1) : null
				}
			/>
		</Screen>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	containerEmpty: {
		marginTop: 16,
	},
	textEmptyInfo: {
		color: Colors.white,
		textAlign: 'center',
		fontFamily: Font.Medium,
		fontSize: ResponsiveFont(11),
	},
	textEmptyButton: {
		color: Colors.orange,
		textAlign: 'center',
		fontFamily: Font.Bold,
		marginTop: 6,
		fontSize: ResponsiveFont(12),
	},
});
