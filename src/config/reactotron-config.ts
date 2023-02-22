import Reactotron from 'reactotron-react-native'

if (__DEV__) {
	Reactotron.configure({ host: '192.168.0.73', name: 'Pump' })
		.useReactNative()
		.connect()
}
