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

const WorkoutScreen = ({ onDaysChange }) => {
  const navigation = useNavigation();
  const [week, setWeek] = useState(1);
  const [days, setDays] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleWeekChange = (change) => {
    const newWeek = week + change;
    if (newWeek >= 1 && newWeek <= 4) {
      setWeek(newWeek);
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
   const renderItem = ({ item }) => {
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
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder="Search for exercises on YouTube"
        />
      </View>
      <View style={styles.container}>
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
        <View style={styles.daysContainer}>
          {Array.from({ length: daysPerWeek }, (_, i) => (
            <TouchableOpacity
              key={i}
              style={styles.dayButton}
              onPress={() => handleDayPress(i + 1)}
            >
              <Text style={styles.dayText}>Day {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <WorkoutDaysSelector daysPerWeek={daysPerWeek} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#1E90FF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E90FF',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});

export default WorkoutScreen;

