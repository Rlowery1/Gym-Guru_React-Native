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
        <Text>No profile found. Please create your profile.</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProfile}>
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
      <Text style={GlobalStyles.age}>{userData.name}</Text>
      <Text style={GlobalStyles.age}>Age: {userData.age}</Text>
      <Text style={GlobalStyles.age}>Weight: {userData.weight} kg</Text>
      <Text style={GlobalStyles.age}>Height: {userData.height} cm</Text>
      <Text style={GlobalStyles.age}>Gender: {userData.gender}</Text>
      <Text style={GlobalStyles.age}>Fitness Goal: {userData.fitnessGoal}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  age: {
    fontSize: 18,
    marginBottom: 10,
  },
  weight: {
    fontSize: 18,
    marginBottom: 10,
  },
  height: {
    fontSize: 18,
    marginBottom: 10,
  },
  gender: {
    fontSize: 18,
    marginBottom: 10,
  },
  fitnessGoal: {
    fontSize: 18,
    marginBottom: 20,
  },
 createButton: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  marginTop: 20,
},
createText: {
  color: 'white',
  fontSize: 18,
},
  editButton: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  },
  editText: {
  color: 'white',
  fontSize: 18,
  },
});

export default ProfileScreen;
