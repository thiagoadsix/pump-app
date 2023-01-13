import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ host: '192.168.100.72', name: 'Pump' })
    .useReactNative()
    .connect();
}
