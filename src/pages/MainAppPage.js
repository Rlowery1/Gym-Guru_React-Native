// src/pages/MainAppPage.js
import React, { useState } from 'react';
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
import ProfileEditScreen from './ProfileEditScreen';
import ProfileScreen from './ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import WorkoutScreen from './WorkoutScreen';
import WorkoutDay from '../components/WorkoutDay';
import ProgressScreen from './ProgressScreen';

const HomeScreen = ({ navigation }) => { // Add navigation prop here
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
          onPress={() => navigation.navigate('ProfileEdit')} // Use the navigation prop here
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
const WorkoutStack = createStackNavigator();

const WorkoutStackNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen name="WorkoutDay" component={WorkoutDay} />
    </WorkoutStack.Navigator>
  );
};


const Tab = createBottomTabNavigator();

const MainAppPage = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainAppPage;

