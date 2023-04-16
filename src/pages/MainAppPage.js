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
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ProfileEditScreen from './ProfileEditScreen';
import ProfileScreen from './ProfileScreen';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import WorkoutScreen from './WorkoutScreen';
import WorkoutDay from '../components/WorkoutDay';
import ProgressScreen from './ProgressScreen';
import WorkoutStreak from './ProgressScreen'; // Import WorkoutStreak component
import { listExerciseLogs } from '../graphql/queries';
import { StyleSheet } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
import yourLogo from '../../assets/gainguru-high-resolution-logo-black-on-transparent-background.png';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userId, setUserId] = useState(null);

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

      fetchUserData();
      fetchExerciseLogs();
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={yourLogo} style={styles.logo} />
        </View>
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
            <Text style={styles.title}>Welcome, {userData.name}!</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.subtitle}>Your Workout Progress:</Text>
            <WorkoutStreak exerciseLogs={exerciseLogs} />
            <Text>Total time spent: {userData.totalTimeSpent}</Text>
            <Text>Last updated: {lastUpdated}</Text>
            {/* Display recent achievements here... */}
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileButtonText}>View your profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    elevation: 3,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
});

export default MainAppPage;

