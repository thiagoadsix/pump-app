import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

interface WhichTypeListContainerProps {
  selected: string;
  setSelected: (item: string) => void;
  data: string[];
  horizontal?: boolean;
}

export const WhichTypeListComponent: React.FC<WhichTypeListContainerProps> = ({ selected, setSelected, data, horizontal }) => {
  return (
      <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item}
          renderItem={({ item }) => (
              <TouchableOpacity
                  style={[
                      styles.button,
                      { backgroundColor: item === selected ? 'gray' : 'white' }
                  ]}
                  onPress={() => setSelected(item)}
              >
                  <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
          )}
          horizontal={horizontal}
      />
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  }
});