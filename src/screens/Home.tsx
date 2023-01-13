import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { global } from '../../styles';

type WhichScreen = 'BodyPartScreen' | 'WorkoutsScreen'

export function Home({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const onButtonPress = (title: WhichScreen) => {
    navigation.navigate(title)
  };

  return (
    <View style={styles.container}>
      <Text style={global.title}>Find your exercise</Text>
      <NavigationCard title="BODY PART" onPress={() => onButtonPress('BodyPartScreen')} />
      <Text style={global.title}>Start your workout</Text>
      <NavigationCard title="WORKOUTS" onPress={() => onButtonPress('WorkoutsScreen')} />
    </View>
  );
};

const NavigationCard = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.bodyPartCard} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  bodyPartCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
    backgroundColor: 'gray',
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 24
  },
});

