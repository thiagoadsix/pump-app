import React from 'react';

import {useTheme, Box} from 'native-base';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8333238844262290~6520523739';

import {useAuth} from '../hooks/useAuth';

import {AuthRoutes} from './auth.routes';
import {AppRoutes} from './app.routes';

export function Routes() {
  const {colors} = useTheme();
  const {user} = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
      <GAMBannerAd
        unitId={adUnitId}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </Box>
  );
}
