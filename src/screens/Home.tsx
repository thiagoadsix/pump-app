import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { global } from '../../styles';
import { NavigationCardComponent } from '../components/NavigationCardComponents';

type WhichScreen = 'BodyPartScreen' | 'WorkoutsScreen'

export function Home({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const onButtonPress = (title: WhichScreen) => {
    navigation.navigate(title)
  };

  return (
    <View style={styles.container}>
      <Text style={global.title}>Find your exercise</Text>
      <NavigationCardComponent title="BODY PART" onPress={() => onButtonPress('BodyPartScreen')} />
      <Text style={global.title}>Start your workout</Text>
      <NavigationCardComponent title="WORKOUTS" onPress={() => onButtonPress('WorkoutsScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  }
});

