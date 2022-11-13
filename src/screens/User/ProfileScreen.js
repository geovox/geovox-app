import { ScrollView } from 'react-native';

import Screen from '../../components/common/Screen';
import ProfileAccount from '../../components/profile/ProfileAccount';
import ProfileLevelProgress from '../../components/profile/ProfileLevelProgress';
import ProfileNFT from '../../components/profile/ProfileNFT';

const ProfileScreen = ({ navigation }) => {
	return (
		<Screen>
			<ScrollView style={{ marginTop: 16, paddingHorizontal: 16 }}>
				<ProfileAccount navigation={navigation} />
				<ProfileLevelProgress />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
				<ProfileNFT />
			</ScrollView>
		</Screen>
	);
};

export default ProfileScreen;
