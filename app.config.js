module.exports = ({ config }) => {
	return ({
		...config,
		extra: {
			adMobAndroidApiId: process.env.AD_MOB_ANDROID_API_ID,
			adMobBannerId: process.env.AD_MOB_BANNER_ID,
			adMobInterstitialId: process.env.AD_MOB_INTERSTITIAL_ID,
			eas: {
				projectId: process.env.EXPO_EAS_PROJECT_ID,
			},
		},
		'react-native-google-mobile-ads': {
			android_app_id: process.env.AD_MOB_ANDROID_API_ID,
		},
	})
}
