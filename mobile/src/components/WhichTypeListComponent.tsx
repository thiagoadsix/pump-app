import React from 'react';

import {FlatList, Pressable, Text} from 'native-base';

interface WhichTypeListContainerProps {
  selected: string;
  setSelected: (item: string) => void;
  data: string[];
  horizontal?: boolean;
}

export const WhichTypeListComponent: React.FC<WhichTypeListContainerProps> = ({
  selected,
  setSelected,
  data,
  horizontal,
}) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => item}
      horizontal={horizontal}
      renderItem={({item}) => (
        <Pressable
          padding="4"
          borderRadius="5"
          marginRight="3"
          alignItems="center"
          justifyContent="center"
          backgroundColor={item === selected ? 'secondary.600' : 'primary.600'}
          onPress={() => setSelected(item)}>
          <Text
            color="general.900"
            fontWeight={item === selected ? 'bold' : 'normal'}
            fontSize="16">
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
};
