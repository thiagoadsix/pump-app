import Reactotron from 'reactotron-react-native'

if (__DEV__) {
	Reactotron.configure({ host: '10.0.0.2', name: 'Pump' })
		.useReactNative()
		.connect()
}
