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
      <Text style={styles.title}>GymGuru</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#E6E6E6',
    fontFamily: 'Arial',
  },
  error: {
    color: '#E6E6E6',
    marginBottom: 10,
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#E6E6E6',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default SignInPage;
