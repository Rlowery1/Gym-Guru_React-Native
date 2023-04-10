import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={CommonStyles.title}>Welcome to GymGuru!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
      <Text style={CommonStyles.title}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
       <Text style={CommonStyles.title}>Sign In</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomePage;
