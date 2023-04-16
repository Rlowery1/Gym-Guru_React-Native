import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getWorkout } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutDaysSelector from '../components/WorkoutDaysSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const WorkoutScreen = ({ onDaysChange }) => {
  const navigation = useNavigation();
  const [week, setWeek] = useState(1);
  const [days, setDays] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState(null);


  const handleWeekChange = (change) => {
    const newWeek = week + change;
    if (newWeek >= 1 && newWeek <= 4) {
      setWeek(newWeek);
    }
  };

  const handleDayPress = (day) => {
  navigation.navigate('WorkoutDay', { week, day, days: daysPerWeek });
};

useFocusEffect(
    React.useCallback(() => {
      const fetchWorkoutSettings = async () => {
        const savedWorkoutDays = await AsyncStorage.getItem('workoutDays');
        const savedFitnessGoal = await AsyncStorage.getItem('fitnessGoal');

        if (savedWorkoutDays) {
          setDaysPerWeek(parseInt(savedWorkoutDays, 10));
        }

        if (savedFitnessGoal) {
          setFitnessGoal(savedFitnessGoal);
        }
      };

      fetchWorkoutSettings();
    }, [])
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleWeekChange(-1)}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Week {week} - {daysPerWeek} Days
        </Text>
        <TouchableOpacity onPress={() => handleWeekChange(1)}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysContainer}>
        {Array.from({ length: daysPerWeek }, (_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.dayButton}
            onPress={() => handleDayPress(i + 1)}
          >
            <Text style={styles.dayText}>Day {i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    <WorkoutDaysSelector daysPerWeek={daysPerWeek} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E90FF',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WorkoutScreen;
