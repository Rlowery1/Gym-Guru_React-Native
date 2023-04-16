// src/pages/HomePage.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const HomePage = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Welcome to GymGuru!</Text>
      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={GlobalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={GlobalStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
