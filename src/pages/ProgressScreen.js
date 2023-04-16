import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listExerciseLogs } from '../graphql/queries';
import { Card, Title } from 'react-native-paper';
import moment from 'moment';

const WorkoutStreak = ({ exerciseLogs }) => {
  if (exerciseLogs.length === 0) {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Content>
          <Title>Current Workout Streak</Title>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>No data available</Text>
        </Card.Content>
      </Card>
    );
  }
  const sortedLogs = exerciseLogs.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  let streak = 0;
  let currentDay = moment(sortedLogs[0].date).startOf('day');
  let workoutDays = new Set();

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDay = moment(sortedLogs[i].date).startOf('day');
    if (logDay.isSame(currentDay, 'day')) {
      workoutDays.add(logDay.format('YYYY-MM-DD'));
    } else {
      const daysDifference = currentDay.diff(logDay, 'days');
      if (daysDifference === 1) {
        workoutDays.add(logDay.format('YYYY-MM-DD'));
        currentDay = logDay;
      } else {
        break;
      }
    }
  }

  streak = workoutDays.size;

  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content>
        <Title>Current Workout Streak</Title>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{streak} days</Text>
      </Card.Content>
    </Card>
  );
};

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
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Progress Screen
      </Text>
      <WorkoutStreak exerciseLogs={exerciseLogs} />
    </ScrollView>
  );
};

export default ProgressScreen;
