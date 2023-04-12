// src/pages/MainAppPage.js
import React, { useState } from 'react';
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
import ProfileScreen from './ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import WorkoutScreen from './WorkoutScreen';
const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          const ownerId = currentUser.attributes.sub;

          const userProfileData = await API.graphql(
            graphqlOperation(getUserProfile, { id: ownerId }),
          );
          const userProfile = userProfileData.data.getUserProfile;

          if (userProfile) {
            setUserData({
              name: userProfile.name,
              workoutsCompleted: userProfile.workoutsCompleted,
              totalTimeSpent: userProfile.totalTimeSpent,
              avatarUrl: userProfile.avatarUrl,
            });
            setLastUpdated(userProfile.updatedAt);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserData();
    }, []),
  );

  if (!userData) {
    return (
      <View style={styles.homeContainer}>
        <Text style={CommonStyles.title}>Welcome!</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileEdit')}
        >
          <Text style={styles.profileButtonText}>Create your profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <Text>Last updated: {lastUpdated}</Text>
        {/* Display recent achievements here... */}
      </View>
    </View>
  );
};


const ProgressScreen = () => <Text>Progress Screen</Text>;


const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen} // Use the imported ProfileScreen
        options={{ headerShown: false }}
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
        <Tab.Screen name="Workouts" component={WorkoutScreen} />
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
