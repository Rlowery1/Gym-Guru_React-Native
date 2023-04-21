//src/pages/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Auth, API } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import GlobalStyles from '../styles/GlobalStyles';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        console.log('Current user:', currentUser);
        const userProfileData = await API.graphql({
          query: getUserProfile,
          variables: { id: currentUser.attributes.sub },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });

        setUserData(userProfileData.data.getUserProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      fetchUserProfile();
    });
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleCreateProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  if (loading) {
    return (
      <View style={styles.profileContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.noProfileText}>
        No profile found. Please create your profile.
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateProfile}
      >
        <Text style={styles.createText}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.age}>Age: {userData.age}</Text>
      <Text style={styles.age}>Weight: {userData.weight} kg</Text>
      <Text style={styles.age}>Height: {userData.height} cm</Text>
      <Text style={styles.age}>Gender: {userData.gender}</Text>
      <Text style={styles.age}>Workout Days: {userData.workoutDays}</Text>
      <Text style={styles.age}>Fitness Goal: {userData.fitnessGoal}</Text>
      <Text style={styles.currentWorkoutStreak}>Current Workout Streak: {userData.workoutDays}</Text>
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#1A1A1D',
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
    color: '#E6E6E6',
    marginBottom: 10,
  },
  age: {
    fontSize: 18,
    color: '#E6E6E6',
    marginBottom: 10,
  },
  noProfileText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#0E7C7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#0E7C7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#E6E6E6',
    fontSize: 18,
  },
  currentWorkoutStreak: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default ProfileScreen;
