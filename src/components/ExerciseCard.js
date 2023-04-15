import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createSessionExercise } from '../graphql/mutations';
import { Auth } from 'aws-amplify';
import {createExerciseLog} from '../graphql/mutations';

const ExerciseCardWrapper = ({ exercise, navigation, workoutSessionId }) => {
  const [isLogging, setIsLogging] = useState(false);

  const toggleLogging = () => {
    setIsLogging(!isLogging);
  };

  return (
    <>
      {isLogging ? (
        <LoggedExerciseCard exercise={exercise} onStopLogging={toggleLogging} workoutSessionId={workoutSessionId} />
      ) : (
        <ExerciseCard exercise={exercise} onStartLogging={toggleLogging} navigation={navigation} />
      )}
    </>
  );
};


const ExerciseCard = ({ exercise, onStartLogging, navigation }) => {
  const handleCardPress = () => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.info}>
          Equipment: {exercise.equipment}{'\n'}
          Target: {exercise.target}{'\n'}
          Body Part: {exercise.bodyPart}{'\n'}
          Sets: {exercise.sets}{'\n'}
          Reps: {exercise.reps.join('/')}
        </Text>
        <Image style={styles.gif} source={{ uri: exercise.gifUrl }} />
        <TouchableOpacity onPress={onStartLogging} style={styles.logButton} activeOpacity={0.8}>
          <Text style={styles.logButtonText}>Log Exercise</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const LoggedExerciseCard = ({ exercise, onStopLogging, workoutSessionId }) => {
  const [sets, setSets] = useState(Array(exercise.sets).fill(''));
  const [weights, setWeights] = useState(Array(exercise.sets).fill(''));


  const saveLoggedExercise = async () => {
  try {
    const setsData = sets.map((set, index) => parseInt(set, 10));
    const weightsData = weights.map((weight) => parseFloat(weight));

    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;

    const exerciseData = {
      exerciseName: exercise.name,
      date: new Date().toISOString(),
      reps: setsData,
      weights: weightsData,
      userId: userId,
    };

    console.log('exerciseData:', exerciseData);

    await API.graphql(graphqlOperation(createExerciseLog, { input: exerciseData }));
  } catch (error) {
    console.error('Error saving logged exercise:', error);
  }
};







  const updateSets = (index, value) => {
    const newSets = [...sets];
    newSets[index] = value;
    setSets(newSets);
  };

  const updateWeights = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };

  return (
    <>
      <Text style={styles.name}>{exercise.name}</Text>
      {sets.map((_, index) => (
        <View key={index} style={styles.inputRow}>
          <Text style={styles.setInputLabel}>Set {index + 1}</Text>
          <TextInput
            style={styles.setInput}
            keyboardType="numeric"
            onChangeText={(value) => updateSets(index, value)}
            value={sets[index]}
            placeholder="Reps"
          />
          <TextInput
            style={styles.setInput}
            keyboardType="numeric"
            onChangeText={(value) => updateWeights(index, value)}
            value={weights[index]}
            placeholder="Weight"
          />
        </View>
      ))}
      <TouchableOpacity
          onPress={async () => {
            await saveLoggedExercise();
            onStopLogging();
          }}
          style={styles.stopLoggingButton}
        >
        <Text style={styles.logButtonText}>Stop Logging</Text>
    </TouchableOpacity>

    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    },
gif: {
width: '100%',
height: 200,
marginTop: 10,
},
logButton: {
backgroundColor: '#1E90FF',
borderRadius: 5,
paddingVertical: 8,
paddingHorizontal: 20,
marginTop: 10,
},
logButtonText: {
color: '#FFFFFF',
fontSize: 16,
fontWeight: '500',
},
inputRow: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginTop: 10,
},
setInputLabel: {
fontSize: 16,
fontWeight: '500',
},
setInput: {
backgroundColor: '#F0F0F0',
borderRadius: 5,
paddingVertical: 5,
paddingHorizontal: 10,
width: '35%',
textAlign: 'center',
},
stopLoggingButton: {
backgroundColor: '#FF6347',
borderRadius: 5,
paddingVertical: 8,
paddingHorizontal: 20,
marginTop: 20,
},
});

export default ExerciseCardWrapper;

