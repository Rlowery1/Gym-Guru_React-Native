import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoggedExerciseCard from '../components/WorkoutDay';
import { API, graphqlOperation } from 'aws-amplify';
import { createSessionExercise } from '../graphql/mutations';


const ExerciseDetailsScreen = ({ route, navigation }) => {
  const { exercise, workoutSessionId } = route.params;

  const onStopLogging = async (workoutSessionId, exerciseId, sets, weights) => {
    await saveLoggedDataToDatabase(workoutSessionId, exerciseId, sets, weights);
    navigation.goBack();
  };

  const saveLoggedDataToDatabase = async (workoutSessionId, exerciseId, sets, weights) => {
  try {
    const sessionExerciseData = {
      workoutSessionId: workoutSessionId,
      exerciseId: exerciseId, // Include this field
      sets: JSON.stringify(sets),
      weights: JSON.stringify(weights),
    };
    await API.graphql(graphqlOperation(createSessionExercise, { input: sessionExerciseData }));
  } catch (error) {
    console.error('Error saving session exercise data:', error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <LoggedExerciseCard
        exercise={exercise}
        onStopLogging={onStopLogging}
        workoutSessionId={workoutSessionId}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ExerciseDetailsScreen;
