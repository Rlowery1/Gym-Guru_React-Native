// src/pages/ProgressScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listExerciseLogs } from '../graphql/queries';
import { LineChart, Grid, BarChart, PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';

const ProgressScreen = () => {
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch user's exercise logs
  useEffect(() => {
    const fetchExerciseLogs = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const ownerId = currentUser.attributes.sub;
        setUserId(ownerId);
        const exerciseLogData = await API.graphql(
          graphqlOperation(listExerciseLogs, {
            filter: { userId: { eq: ownerId } },
          })
        );
        const fetchedExerciseLogs = exerciseLogData.data.listExerciseLogs.items;
        setExerciseLogs(fetchedExerciseLogs);
      } catch (error) {
        console.error('Error fetching exercise logs:', error);
      }
    };

    fetchExerciseLogs();
  }, []);

  return (
    <View>
      <Text>Progress Screen</Text>
      <FlatList
        data={exerciseLogs}
        renderItem={({ item }) => (
          <View>
            <Text>{item.exerciseName}</Text>
            <Text>{item.date}</Text>
            <Text>{item.reps.toString()}</Text>
            <Text>{item.weights.toString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProgressScreen;
