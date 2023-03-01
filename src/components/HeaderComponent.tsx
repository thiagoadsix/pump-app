import { Box, HStack, Text } from 'native-base'

interface HeaderComponentProps {
  user: {
    name: string;
  } 
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ user }) => {
	return (
		<>
			<Box safeAreaTop bg="secondary.600" />

			<HStack bg="secondary.600" p="5" justifyContent="space-between" alignItems="center" w="100%">
				<HStack alignItems="center">
					<Text color="white" fontSize="20" fontWeight="bold">
            Hello, {user?.name.split(' ').shift()}
					</Text>
				</HStack>
			</HStack>
		</>
	)
}
