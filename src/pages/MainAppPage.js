// src/pages/MainAppPage.js
import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
import WorkoutCard from '../components/WorkoutCard';
import ProfileEditScreen from './ProfileEditScreen';

const HomeScreen = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    workoutsCompleted: 5,
    totalTimeSpent: '2 hours',
    avatarUrl: 'https://via.placeholder.com/150',
  });

  useEffect(() => {
    // Fetch user data and workout progress from the database
    // setUserData(fetchedUserData);
  }, []);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
        <Text style={CommonStyles.title}>Welcome, {userData.name}!</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={CommonStyles.title}>Your Workout Progress:</Text>
        <Text>Workouts completed: {userData.workoutsCompleted}</Text>
        <Text>Total time spent: {userData.totalTimeSpent}</Text>
        {/* Display recent achievements here... */}
      </View>
    </View>
  );
};

const WorkoutsScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Cardio', 'Strength', 'Yoga', 'Pilates'];

  useEffect(() => {
    // Fetch workouts data from the database
    // setWorkouts(fetchedWorkouts);
  }, [selectedCategory]);
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const filterWorkouts = (category) => {
    setSelectedCategory(category);
    // Fetch workouts data for the selected category from the database
    // setWorkouts(filteredWorkouts);
  };
  const renderItem = ({ item }) => <WorkoutCard workout={item} />;

  return (
    <SafeAreaView style={styles.workoutsScreenContainer}>
      <ScrollView contentContainerStyle={styles.workoutsScreenContentContainer}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category
                  ? styles.selectedFilterButton
                  : null,
              ]}
              onPress={() => filterWorkouts(category)}
            >
              <Text style={CommonStyles.title}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={workouts}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const ProgressScreen = () => <Text>Progress Screen</Text>;
const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <View style={styles.profileContainer}>
      <Text>Name: John Doe</Text>
      <Text>Age: 25</Text>
      <Text>Weight: 70 kg</Text>
      <Text>Height: 180 cm</Text>
      <Text>Gender: Male</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }} // Hide the header for the Profile screen
      />
      <ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainAppPage = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  workoutsScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  workoutsScreenContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20, // Add borderRadius
    marginHorizontal: 5, // Add marginHorizontal
  },
  selectedFilterButton: {
    backgroundColor: '#eee',
  },
  workoutCard: {
  padding: 15,
  borderBottomWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
  borderRadius: 5,
  marginBottom: 10,
  elevation: 2,
},
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  progressContainer: {
    paddingHorizontal: 20,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
profileImage: {
width: 150,
height: 150,
borderRadius: 75,
marginBottom: 20,
},
name: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 5,
},
username: {
fontSize: 18,
color: '#777',
marginBottom: 20,
},
bio: {
fontSize: 16,
textAlign: 'center',
paddingHorizontal: 20,
marginBottom: 20,
},
editButton: {
backgroundColor: '#3498db',
paddingHorizontal: 30,
paddingVertical: 10,
borderRadius: 5,
},
editText: {
color: '#fff',
fontSize: 16,
},
});
export default MainAppPage;
