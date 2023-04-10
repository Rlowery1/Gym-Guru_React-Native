import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';

const ProfileScreen = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');

  const fetchUserProfile = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const ownerId = currentUser.attributes.sub;

      const response = await API.graphql(
        graphqlOperation(getUserProfile, { id: ownerId }),
      );

      if (response.data.getUserProfile) {
        const userProfile = response.data.getUserProfile;
        setAge(userProfile.age);
        setWeight(userProfile.weight);
        setHeight(userProfile.height);
        setGender(userProfile.gender);
        setFitnessGoal(userProfile.fitnessGoal);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Age: {age}</Text>
      <Text>Weight: {weight} kg</Text>
      <Text>Height: {height} cm</Text>
      <Text>Gender: {gender}</Text>
      <Text>Fitness Goal: {fitnessGoal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;
