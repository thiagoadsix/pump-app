import React from 'react';

import {Pressable, Text} from 'native-base';

interface NavigationCardComponentProps {
  title: string;
  onPress: () => void;
}

export const NavigationCardComponent: React.FC<
  NavigationCardComponentProps
> = ({title, onPress}) => (
  <Pressable
    alignItems="center"
    justifyContent="center"
    height="25%"
    backgroundColor="primary.600"
    borderRadius="16"
    borderColor="secondary.600"
    borderWidth="2"
    marginTop="4"
    marginBottom="6"
    onPress={onPress}>
    <Text color="secondary.600" fontWeight="bold" fontSize="24">
      {title}
    </Text>
  </Pressable>
);
