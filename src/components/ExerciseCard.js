import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput,  TouchableOpacity } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { createExerciseLog } from '../graphql/mutations';
import { getLatestExerciseLog } from '../graphql/queries';
import { LinearGradient } from 'expo-linear-gradient';


const ExerciseCardWrapper = ({ exercise, navigation, workoutSessionId }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [lastSetInput, setLastSetInput] = useState('');
  const [lastWeightInput, setLastWeightInput] = useState('');

  const toggleLogging = () => {
    setIsLogging(!isLogging);
    if (!isLogging) {
      fetchLatestLoggedExerciseData(exercise.name);
    }
  };

  useEffect(() => {
    if (isLogging) {
      fetchLatestLoggedExerciseData(exercise.name)
    }
  }, [isLogging]);

  const fetchLatestLoggedExerciseData = async (exercise) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const userId = currentUser.attributes.sub;
      const exerciseName = exercise.name;

      const exerciseLogData = await API.graphql(
        graphqlOperation(getLatestExerciseLog, {
          exerciseName: exerciseName,
          userId: userId,
        })
      );

      if (exerciseLogData.data.getLatestExerciseLog) {
        const latestLog = exerciseLogData.data.getLatestExerciseLog;
        setLastSetInput(latestLog.reps[latestLog.reps.length - 1]);
        setLastWeightInput(latestLog.weights[latestLog.weights.length - 1]);
      }
    } catch (error) {
      console.error('Error fetching latest logged exercise data:', error);
    }
  };

  return (
    <>
      {isLogging ? (
        <LoggedExerciseCard
          exercise={exercise}
          onStopLogging={toggleLogging}
          workoutSessionId={workoutSessionId}
          lastSetInput={lastSetInput}
          lastWeightInput={lastWeightInput}
          setLastSetInput={setLastSetInput}
          setLastWeightInput={setLastWeightInput}
          // Remove the line below
          // navigation={navigation}
        />
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
    <TouchableOpacity activeOpacity={1}>
      <LinearGradient
        colors={['#1E90FF', '#1E90FF']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.info}>
            Equipment: {exercise.equipment}{'\n'}
            Target: {exercise.target}{'\n'}
            Body Part: {exercise.bodyPart}{'\n'}
            Sets: {exercise.sets}{'\n'}
            Reps: {exercise.reps.join('/')}
          </Text>
          <Image style={styles.gif} source={{ uri: exercise.gifUrl }} />
        </View>
        <TouchableOpacity onPress={onStartLogging} style={styles.logButton} activeOpacity={0.8}>
          <Text style={styles.logButtonText}>Log Exercise</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const LoggedExerciseCard = ({
  exercise,
  onStopLogging,
  lastSetInput,
  lastWeightInput,
  setLastSetInput,
  setLastWeightInput,
}) => {
  const [sets, setSets] = useState(Array(exercise.sets).fill(''));
  const [weights, setWeights] = useState(Array(exercise.sets).fill(''));


  const updateSets = (index, value) => {
    const newSets = [...sets];
    newSets[index] = value;
    setSets(newSets);
    setLastSetInput(value);
  };

  const updateWeights = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
    setLastWeightInput(value);
  };



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
            placeholder={lastSetInput || "Reps"}
          />
          <TextInput
            style={styles.setInput}
            keyboardType="numeric"
            onChangeText={(value) => updateWeights(index, value)}
            value={weights[index]}
            placeholder={lastWeightInput || "Weight"}
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
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  gif: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 10,
  },
  logButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  logButtonText: {
    color: '#1E90FF',
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

