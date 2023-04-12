import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WorkoutCard = ({ workout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.category}>{workout.category.name}</Text>
      {workout.image && (
        <Image
          source={{ uri: `https://wger.de${workout.image}` }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}
      {workout.video && (
        <Image
          source={{ uri: `https://i.ytimg.com/vi/${workout.video}/hqdefault.jpg` }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}
      <Text style={styles.description}>{workout.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom:20,
},
});

export default WorkoutCard;
