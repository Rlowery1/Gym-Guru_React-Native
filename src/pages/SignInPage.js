// src/pages/SignInPage.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { validateEmail, validatePassword } from '../utils/validate';
import CommonStyles from '../styles/GlobalStyles';

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = async () => {
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      await Auth.signIn(email, password);
      console.log('Sign in successful!');
      navigation.navigate('MainApp'); // Replace with your main app screen
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={CommonStyles.title}>GymGuru</Text>
      {error ? <Text style={CommonStyles.title}>{error}</Text> : null}
      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        textContentType="password"
      />
      <CustomButton title="Sign In" onPress={signIn} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={CommonStyles.title}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d2c4f',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#0d2c4f',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignInPage;
