// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCQ2_ci-hBvZhlt0n093g2hsE9j5s-r5X4',
	authDomain: 'pump-1ce03.firebaseapp.com',
	projectId: 'pump-1ce03',
	storageBucket: 'pump-1ce03.appspot.com',
	messagingSenderId: '1028592033837',
	appId: '1:1028592033837:web:6d2cc0e03ddcfcd1d858a4',
	measurementId: 'G-RD64FVS37G'
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export { auth }