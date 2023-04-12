import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import GlobalStyles from '../styles/GlobalStyles';
import styles from '../styles/WorkoutScreenStyles';

const WorkoutScreen = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const selectedExercises = [
  'Bench Press',
  'Biceps curl',
  'Crunch',
  'Deadlift',
  'Lunge',
  'Plank',
  'Pull up',
  'Push up',
  'Sit-up',
  'Squat',
];


// Modify the fetchWorkoutsFromAPI function
useEffect(() => {
  const fetchWorkoutsFromAPI = async () => {
  try {
    const apiUrl = 'https://wger.de/api/v2/exercise/?language=2&limit=100';

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Token 5bca046583c512c3ca985b43e09dfdac7b68bf5a'
      }
    });
    const data = await response.json();
    const englishExercises = data.results;
    const filteredExercises = englishExercises.filter((exercise) =>
      selectedExercises.includes(exercise.name)
    );
    setAllWorkouts(filteredExercises);
    setWorkouts(filteredExercises);
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
};



  fetchWorkoutsFromAPI();
}, []);

  const categories = ['All', 'Strength Training', 'Cardio', 'Flexibility'];

  const fetchWorkouts = (category) => {
    if (category === 'All') {
      return allWorkouts;
    } else {
      return allWorkouts.filter((workout) => workout.category.name === category);
    }
  };

  const filterWorkouts = (category) => {
    setSelectedCategory(category);
    setWorkouts(fetchWorkouts(category));
  };

  const renderItem = ({ item }) => <WorkoutCard workout={item} />;

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const scrollViewStyles = StyleSheet.create({
  scrollView: {
    justifyContent: 'space-evenly',
  },
});

export default WorkoutScreen;
