import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { getWorkout } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutDaysSelector from '../components/WorkoutDaysSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';






const WorkoutScreen = ({ onDaysChange }) => {
  const navigation = useNavigation();
  const [week, setWeek] = useState(1);
  const [days, setDays] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout Reminder',
      body: 'Time for your daily workout!',
    },
    trigger: {
      seconds: 60 * 60 * 24, // Schedule a notification 24 hours from now
      repeats: true,
    },
  });
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

      // Call the scheduleNotification function here
      await scheduleNotification();
    };

    fetchWorkoutSettings();
  }, [])
);

  const handleWeekChange = (change) => {
  const newWeek = week + change;
  if (newWeek >= 1 && newWeek <= 4) {
    setWeek(newWeek);
  } else if (newWeek > 4) {
    setWeek(1);
  } else if (newWeek < 1) {
    setWeek(4);
  }
};

  const handleDayPress = (day) => {
    navigation.navigate('WorkoutDay', { week, day, days: daysPerWeek });
  };

  const searchYouTube = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
      params: { q: searchInput },
      headers: {
        'X-RapidAPI-Key': 'ad388b1d98mshf2c7750256ea7d2p1e67fcjsn4d1a44336865',
        'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => {
  if (index >= 3) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => {
        navigation.navigate('WebView', { uri: `https://www.youtube.com/watch?v=${item.id}` });
      }}
    >
      <Image style={styles.resultImage} source={{ uri: item.thumbnail }} />
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultChannel}>{item.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};


  useEffect(() => {
    if (searchInput.length > 0) {
      searchYouTube();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="white" />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder="Search for exercises on YouTube"
          placeholderTextColor="#FFFFFF"
        />
      </View>
      {searchInput.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
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
      )}
      <View style={styles.daysContainer}>
        {Array.from({ length: daysPerWeek }, (_, i) => (
      <TouchableOpacity key={i} onPress={() => handleDayPress(i + 1)}>
        <LinearGradient
          colors={['#0E7C7B', '#0A6969']} // Gradient colors
          start={[0, 0]}
          end={[1, 1]}
          style={styles.dayButton}
        >
          <Ionicons name="md-calendar" size={24} color="#FFFFFF" />
          <Text style={styles.dayText}>Day {i + 1}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ))}
        </View>
        <WorkoutDaysSelector daysPerWeek={daysPerWeek} />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
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
    color: '#0E7C7B',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginBottom: 20,
  flexGrow: 1,
  alignItems: 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
  dayText: {
    color: '#FFFFFF',
    fontSize: 16,
fontWeight: '500',
},
searchBar: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#0E7C7B',
paddingHorizontal: 10,
borderRadius: 5,
marginBottom: 20,
},
searchInput: {
flex: 1,
marginLeft: 10,
color: '#FFFFFF',
},
resultsContainer: {
paddingBottom: 20,
},
resultCard: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#f0f0f0',
borderRadius: 5,
padding: 10,
marginBottom: 10,
},
resultImage: {
width: 90,
height: 60,
borderRadius: 5,
},
resultTextContainer: {
flex: 1,
marginLeft: 10,
},
resultTitle: {
fontSize: 16,
fontWeight: '600',
marginBottom: 5,
},
resultChannel: {
fontSize: 14,
fontWeight: '400',
color: '#777',
},
});

export default WorkoutScreen;
