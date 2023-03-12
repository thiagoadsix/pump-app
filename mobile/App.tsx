import React from 'react';

if (__DEV__) {
  import('./src/configurations/reactotron').then(() =>
    console.log('Reactotron Configured'),
  );
}

import {NativeBaseProvider, StatusBar} from 'native-base';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {Routes} from './src/routes';
import {WorkoutContextProvider} from './src/contexts/WorkoutContext';
import {theme} from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <WorkoutContextProvider>
          <Routes />
        </WorkoutContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
