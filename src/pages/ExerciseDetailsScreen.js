import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LoggedExerciseCard from '../components/WorkoutDay';
import { API, graphqlOperation } from 'aws-amplify';
import { createSessionExercise } from '../graphql/mutations';
import { google } from 'googleapis';
import { LinearGradient } from 'expo-linear-gradient';


const AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4 = 'AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4';
const ExerciseDetailsScreen = ({ route, navigation }) => {
  const { exercise, workoutSessionId } = route.params;
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchYoutubeVideo = async () => {
      try {
        const youtube = google.youtube({
          version: 'v3',
          auth: AIzaSyCrpCL8JdtQaUXYnmA9wNQezOrN4YZwle4,
        });

        const response = await youtube.search.list({
          part: 'snippet',
          type: 'video',
          q: exercise.name,
          maxResults: 1,
        });

        if (response.data.items && response.data.items.length > 0) {
          setVideoId(response.data.items[0].id.videoId);
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
