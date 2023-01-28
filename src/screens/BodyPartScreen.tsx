import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, FlatList } from 'native-base';

import { fetchSingle } from '../api/axios';
import { RootStackParamList } from '../../navigation';

import { ExerciseComponent } from '../components/ExerciseComponent';
import { WhichTypeListComponent } from '../components/WhichTypeListComponent';

export function BodyPartScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'BodyPartScreen'>) {
  const [selected, setSelected] = useState<string>('back');
  const [exercises, setExercises] = useState<Array<any>>([]);

  useEffect(() => {
    fetchSingle(`local/exercises/body-part/${selected}`, 'get')
      .then(result => {
        setExercises(result);
      });
  }, [selected]);

  const handlePress = (exercise: any) => {
    navigation.navigate('ExerciseDetailScreen', { exercise });
  };

  const bodyParts = ['back', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
  ];

  return (
    <Box
      display="flex"
      flex="1"
      backgroundColor="primary.900"
      padding="5"
    >
      <Box
        alignItems="center"
        justifyContent="center"
      >
        <WhichTypeListComponent
          data={bodyParts}
          selected={selected}
          setSelected={setSelected}
          horizontal
        />
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExerciseComponent key={item.id} exercise={item} handlePress={handlePress} />
        )}
        marginTop="5"
        width="100%"
        maxWidth={400}
      />
    </Box>
  );
}
