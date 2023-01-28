import { useState } from 'react';
import { Pressable, Image, Text, Box } from 'native-base';
import { StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  set: any;
  handlePress: (exercise: any) => void;
}

export const SetComponent: React.FC<Props> = ({ set, handlePress }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Pressable
      flexDirection='row'
      alignItems='center'
      backgroundColor='primary.600'
      padding="3"
      marginBottom="4"
      borderRadius="5"
      onPress={() => handlePress(set.exercise)}
    >
      <Image
        width="90"
        height="90"
        borderRadius="5"
        marginRight="4"
        source={{ uri: set.exercise.url }}
        onLoad={() => setImageLoaded(true)}
      />
      {
        !imageLoaded && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            size="large"
            color="#0000ff"
          />
        )
      }
      {
        imageLoaded && (
          <Box
            display='flex'
            flex="1"
          >
            <Text
              fontSize="18"
              fontWeight='bold'
              color='general.900'
            >
              {set.exercise.name}
            </Text>
            <Text

              fontSize="16"
              color='general.900'
              marginTop="2"
            >
              Repetitions: {set.repetitions}x
            </Text>
            <Text

              fontSize="16"
              color='general.900'
              marginTop="2"
            >
              Weight: {set.weight}kg
            </Text>
            <Text
              fontSize="16"
              color='general.900'
              marginTop="2"
            >
              Series: {set.series}x
            </Text>
          </Box>
        )
      }
    </Pressable>
  );
}
