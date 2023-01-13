import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export function Header () {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise List</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

