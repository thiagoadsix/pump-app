import Reactotron from 'reactotron-react-native'

if (__DEV__) {
	Reactotron.configure({ host: '192.168.1.11', name: 'Pump' })
		.useReactNative()
		.connect()
}
