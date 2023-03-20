/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')

fs.writeFile(
	'app.json',
	JSON.stringify({
		expo: {
			extra: {
				adMobAndroidApiId: process.env.AD_MOB_ANDROID_API_ID,
				adMobBannerId: process.env.AD_MOB_BANNER_ID,
				adMobInterstitialId: process.env.AD_MOB_INTERSTITIAL_ID
			},
			'name': 'pump',
			'slug': 'pump',
			'version': '1.0.0',
			'orientation': 'portrait',
			'icon': './assets/icon.png',
			'userInterfaceStyle': 'light',
			'splash': {
				'image': './assets/splash.png',
				'resizeMode': 'contain',
				'backgroundColor': '#ffffff'
			},
			'updates': {
				'fallbackToCacheTimeout': 0,
				'enabled': true
			},
			'assetBundlePatterns': [
				'**/*'
			],
			'ios': {
				'supportsTablet': true,
				'bundleIdentifier': 'com.mobile.pump'
			},
			'android': {
				'adaptiveIcon': {
					'foregroundImage': './assets/adaptive-icon.png',
					'backgroundColor': '#FFFFFF'
				},
				'package': 'com.mobile.pump'
			},
			'web': {
				'favicon': './assets/favicon.png'
			},
			'plugins': [
				[
					'expo-build-properties',
					{
						'ios': {
							'useFrameworks': 'static'
						}
					}
				]
			],
			'owner': 'thiago.adisx'
		},
		'react-native-google-mobile-ads': {
			android_app_id: String(process.env.AD_MOB_ANDROID_API_ID),
		},
	}),
	(error) => {
		if (error) throw error
	}
)
