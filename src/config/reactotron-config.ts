import Reactotron from 'reactotron-react-native'

if (__DEV__) {
	Reactotron.configure({ host: '192.168.68.105', name: 'Pump' })
		.useReactNative()
		.connect()
}
