import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';

const ProgressScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const ownerId = currentUser.attributes.sub;
      const userData = await API.graphql(
        graphqlOperation(getUser, {
          id: ownerId,
        })
      );
      if (userData.data.getUser) {
        const fetchedUserProfile = userData.data.getUser.profile;
        setUserData(fetchedUserProfile);
      } else {
        console.error('Error fetching user profile: User not found');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Age: {userData.age}</Text>
      <Text>Weight: {userData.weight} lbs</Text>
      <Text>Height: {userData.height} in</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Fitness Goal: {userData.fitnessGoal}</Text>
      <Text>Workout Days: {userData.workoutDays} per week</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProgressScreen;
