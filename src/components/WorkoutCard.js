import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
import { Image } from 'react-native';
import placeholderImage from '../../assets/cover_photo_1.png';

const WorkoutCard = ({ workout }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={workout ? { uri: workout.image } : placeholderImage} />
      <Text style={CommonStyles.title}>{workout ? workout.title : 'Workout Title'}</Text>
      <Text>Description: {workout ? workout.description : 'Workout Description'}</Text>
      <Text>Duration: {workout ? workout.duration : '00'} minutes</Text>
      <Text>Difficulty: {workout ? workout.difficulty : 'Easy'}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    card: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    },
    image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    },
});

export default WorkoutCard;
