import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listExerciseLogs } from '../graphql/queries';
import { Card, Title } from 'react-native-paper';
import moment from 'moment';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { Badge } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';



const WorkoutStreak = ({ exerciseLogs }) => {
  if (exerciseLogs.length === 0) {
    return (
      <Card style={progressStyles.card}>
        <Card.Content>
          <Title>Current Workout Streak</Title>
          <Text style={progressStyles.noDataText}>No data available</Text>
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
    <Card style={progressStyles.card}>
      <Card.Content>
        <Title>Current Workout Streak</Title>
        <Text style={progressStyles.streakText}>{streak} days</Text>
      </Card.Content>
    </Card>
  );
};

const ProgressChart = ({ exerciseLogs }) => {
  // Transform data for the chart
  const chartData = exerciseLogs.map((log) => ({
    x: moment(log.date).format('MMM Do'),
    y: log.duration,
  }));
  return (
    <Card style={progressStyles.card}>
      <Card.Content>
        <Title>Workout Duration</Title>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis style={{ tickLabels: { angle: -45, fontSize: 10 } }} />
          <VictoryAxis dependentAxis />
          <VictoryBar data={chartData} />
        </VictoryChart>
      </Card.Content>
    </Card>
  );
};


const QuoteOfTheDay = ({ quote }) => {
  if (!quote) return null;

  return (
    <View style={progressStyles.quoteContainer}>
      <Text style={progressStyles.quoteText}>Quote of the day:</Text>
      <Text style={progressStyles.quoteText}>"{quote.text}"</Text>
      <Text style={progressStyles.quoteAuthor}>- {quote.author}</Text>
    </View>
  );
};

const ProgressScreen = () => {
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [quote, setQuote] = useState(null);






  const fetchQuote = async () => {
  const options = {
    method: 'GET',
    url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
    params: { token: 'ipworld.info' },
    headers: {
      'X-RapidAPI-Key': 'ad388b1d98mshf2c7750256ea7d2p1e67fcjsn4d1a44336865',
      'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    setQuote(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};

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
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <ScrollView style={progressStyles.container}>
      <Text style={progressStyles.headerText}>Progress Screen</Text>
      <QuoteOfTheDay quote={quote} />
      <WorkoutStreak exerciseLogs={exerciseLogs} />
      <ProgressChart exerciseLogs={exerciseLogs} />
    </ScrollView>
  );
};


const progressStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#0E7C7B',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  noDataText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  streakText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quoteContainer: {
  backgroundColor: '#0E7C7B',
  padding: 10,
  borderRadius: 10,
  marginVertical: 10,
},
quoteText: {
  fontSize: 16,
  color: '#FFFFFF',
  textAlign: 'center',
},
quoteAuthor: {
  fontSize: 14,
  color: '#FFFFFF',
  textAlign: 'center',
  fontStyle: 'italic',
  marginTop: 5,
},
});



export default ProgressScreen;
