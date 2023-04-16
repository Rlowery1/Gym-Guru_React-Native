import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData.age}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{userData.weight} lbs</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{userData.height} in</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{userData.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fitness Goal:</Text>
        <Text style={styles.value}>{userData.fitnessGoal}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Workout Days:</Text>
        <Text style={styles.value}>{userData.workoutDays} per week</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
      label: {
    fontSize: 18,
    fontWeight: '600',
    },
    value: {
    fontSize: 18,
    fontWeight: '400',
    },
    });

export default ProgressScreen;

