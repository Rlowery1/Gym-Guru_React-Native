import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import GlobalStyles from '../styles/GlobalStyles';
import styles from '../styles/WorkoutScreenStyles';

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch workouts data from the database
    // setWorkouts(fetchedWorkouts);
  }, []);

  const categories = ['All', 'Strength Training', 'Cardio', 'Flexibility'];

  const filterWorkouts = (category) => {
    setSelectedCategory(category);
    // Fetch workouts data for the selected category from the database
    // setWorkouts(filteredWorkouts);
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
