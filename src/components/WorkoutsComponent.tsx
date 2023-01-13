import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const WorkoutsComponent = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateWorkout')}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate('WorkoutsList')}>
          <View style={styles.card}>
            <Text style={styles.cardText}>View Workouts</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    elevation: 1,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  createButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    elevation: 1,
  },
  createButtonText: {
    fontWeight: 'bold',
    color: 'black'
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 1,
    width: '100%',
    alignItems: 'center',
    height: 100
  },
  cardText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18
  }
});
