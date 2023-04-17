import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LoggedExerciseCard from '../components/WorkoutDay';
import { API, graphqlOperation } from 'aws-amplify';
import { createSessionExercise } from '../graphql/mutations';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'ad388b1d98mshf2c7750256ea7d2p1e67fcjsn4d1a44336865';

const ExerciseDetailsScreen = ({ route, navigation }) => {
  const { exercise, workoutSessionId } = route.params;
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchYoutubeVideo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
            exercise.name
          )}&type=video&key=${API_KEY}`
        );

        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
        }
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      }
    };

    fetchYoutubeVideo();
  }, [exercise]);

  const openYoutubeVideo = () => {
  if (videoId) {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  }
};


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
      {videoId && (
        <TouchableOpacity onPress={openYoutubeVideo} style={styles.videoLink}>
          <Text style={styles.videoLinkText}>Watch on YouTube</Text>
        </TouchableOpacity>
      )}
      <LoggedExerciseCard
        exercise={{ ...exercise, videoId }} // Pass videoId along with exercise
        onStopLogging={onStopLogging}
        workoutSessionId={workoutSessionId}
      />
    </View>
  );
};


const styles   = StyleSheet.create({
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
  videoLink: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  videoLinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ExerciseDetailsScreen;
