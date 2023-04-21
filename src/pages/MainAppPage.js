// src/pages/MainAppPage.js
import React, { useState, useEffect } from 'react';
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
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import ProfileEditScreen from './ProfileEditScreen';
import ProfileScreen from './ProfileScreen';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native';
import WorkoutScreen from './WorkoutScreen';
import WorkoutDay from '../components/WorkoutDay';
import ProgressScreen from './ProgressScreen';
import { listExerciseLogs } from '../graphql/queries';
import CommonStyles from '../styles/GlobalStyles';
import yourLogo from '../../assets/gainguru-high-resolution-logo-black-on-transparent-background.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DailyNutritionTips from '../components/DailyNutritionTips';
import SocialFeed from '../components/SocialFeed';
import FeaturedChallenges from '../components/FeaturedChallenges';
import WorkoutOfTheDay from '../components/WorkoutOfTheDay';
import DailyNutritionTipsDetails from '../pages/DailyNutritionTipsDetails';
import SocialFeedDetails from '../pages/SocialFeedDetails';
import FeaturedChallengesDetails from '../pages/FeaturedChallengesDetails';
import WorkoutOfTheDayDetails from '../pages/WorkoutOfTheDayDetails';




const DailyNutritionTipsStack = createStackNavigator();

const DailyNutritionTipsStackNavigator = () => {
  return (
    <DailyNutritionTipsStack.Navigator>
      <DailyNutritionTipsStack.Screen
        name="DailyNutritionTips"
        component={DailyNutritionTips}
        options={{ headerShown: false }}
      />
      <DailyNutritionTipsStack.Screen
        name="DailyNutritionTipsDetails"
        component={DailyNutritionTipsDetails}
        options={{ headerShown: false }}
      />
    </DailyNutritionTipsStack.Navigator>
  );
};

const SocialFeedStack = createStackNavigator();

const SocialFeedStackNavigator = () => {
  return (
    <SocialFeedStack.Navigator>
      <SocialFeedStack.Screen
        name="SocialFeed"
        component={SocialFeed}
        options={{ headerShown: false }}
      />
      <SocialFeedStack.Screen
        name="SocialFeedDetails"
        component={SocialFeedDetails}
        options={{ headerShown: false }}
      />
    </SocialFeedStack.Navigator>
  );
};

const FeaturedChallengesStack = createStackNavigator();

const FeaturedChallengesStackNavigator = () => {
  return (
    <FeaturedChallengesStack.Navigator>
      <FeaturedChallengesStack.Screen
        name="FeaturedChallenges"
        component={FeaturedChallenges}
        options={{ headerShown: false }}
      />
      <FeaturedChallengesStack.Screen
        name="FeaturedChallengesDetails"
        component={FeaturedChallengesDetails}
        options={{ headerShown: false }}
      />
    </FeaturedChallengesStack.Navigator>
  );
};

const WorkoutOfTheDayStack = createStackNavigator();

const WorkoutOfTheDayStackNavigator = () => {
  return (
    <WorkoutOfTheDayStack.Navigator>
      <WorkoutOfTheDayStack.Screen
        name="WorkoutOfTheDay"
        component={WorkoutOfTheDay}
        options={{ headerShown: false }}
      />
      <WorkoutOfTheDayStack.Screen
        name="WorkoutOfTheDayDetails"
        component={WorkoutOfTheDayDetails}
        options={{ headerShown: false }}
      />
    </WorkoutOfTheDayStack.Navigator>
  );
};



const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  // const allExercises = []; Replace this with your actual list of exercises

  const filterExercises = (query) => {
  if (query === '') {
    setFilteredExercises([]);
  } else {
    const filtered = allExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredExercises(filtered);
  }
};

  useEffect(() => {
    filterExercises(searchQuery);
  }, [searchQuery]);

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
          fetchedExerciseLogs.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
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
          <Text style={[CommonStyles.title, { color: '#FFFFFF' }]}>Welcome!</Text>
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
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for exercises or workouts"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={styles.exercisesContainer}>
          {filteredExercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exerciseItem}
              onPress={() => navigation.navigate('ExerciseDetails', { exerciseId: exercise.id })}
            >
              <Text style={styles.exerciseName}>{exercise.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DailyNutritionTips')}
        >
          <Text style={styles.cardText}>Daily Nutrition Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate( 'SocialFeedDetails' )}
        >
          <Text style={styles.cardText}>Social Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('FeaturedChallengesDetails' )}
        >
          <Text style={styles.cardText}>Featured Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate( 'WorkoutOfTheDayDetails' )}
        >
          <Text style={styles.cardText}>Workout Of The Day</Text>
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
const [username, setUsername] = useState('');
useEffect(() => {
const fetchUser = async () => {
try {
const user = await Auth.currentAuthenticatedUser();
            setUsername(user.username);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

fetchUser();
  }, []);

      return (
      <View style={styles.container}>
      <Text style={styles.title}>Hello, {username}!</Text>
      <Text style={styles.subtitle}>Welcome to GymGuru!</Text>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'ios-home' : 'ios-home-outline';
      } else if (route.name === 'Workout') {
        iconName = focused ? 'ios-fitness' : 'ios-fitness-outline';
      } else if (route.name === 'Progress') {
        iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'ios-person' : 'ios-person-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#0E7C7B',
    tabBarInactiveTintColor: '#E6E6E6',
    tabBarStyle: { backgroundColor: '#1A1A1D' },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
  <Tab.Screen name="Progress" component={ProgressScreen} />
  <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  <Tab.Screen name="DailyNutritionTips" component={DailyNutritionTipsStackNavigator} options={{ tabBarButton: () => null }} />
  <Tab.Screen name="SocialFeed" component={SocialFeedStackNavigator} options={{ tabBarButton: () => null }} />
  <Tab.Screen name="FeaturedChallenges" component={FeaturedChallengesStackNavigator} options={{ tabBarButton: () => null }} />
  <Tab.Screen name="WorkoutOfTheDay" component={WorkoutOfTheDayStackNavigator} options={{ tabBarButton: () => null }} />
</Tab.Navigator>
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#1A1A1D',
  },
  exercisesContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  exerciseItem: {
    backgroundColor: '#0E7C7B',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    backgroundColor: '#0E7C7B',
    borderRadius: 5,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  dashboardContainer: {
    marginTop: 20,
  },
  dashboardCard: {
    backgroundColor: '#2A2A2D',
    borderRadius: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dashboardTitle: {
    color: '#E6E6E6',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dashboardNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 205,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#444444',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1A1A1D',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    color: '#E6E6E6',
    fontSize: 24,
  },
  footerText: {
    color: '#E6E6E6',
    fontSize: 12,
    marginTop: 5,
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
    color: '#E6E6E6',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E6E6E6',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainAppPage;




