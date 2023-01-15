import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const NavigationCardComponent = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.bodyPartCard} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
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