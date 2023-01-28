import Reactotron from 'reactotron-react-native'

if (__DEV__) {
	Reactotron.configure({ host: '127.0.0.1', name: 'Pump' })
		.useReactNative()
		.connect()
}
