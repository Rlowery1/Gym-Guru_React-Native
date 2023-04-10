// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
import CustomInput from '../components/CustomInput';
const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    let errorMessage = '';

    if (!email) {
      errorMessage += 'Email is missing.\n';
    }

    if (!name) {
      errorMessage += 'Name is missing.\n';
    }

    if (!phoneNumber) {
      errorMessage += 'Phone number is missing.\n';
    }

    if (!password) {
      errorMessage += 'Password is missing.\n';
    }

    if (errorMessage) {
      Alert.alert('Please fix the following errors:', errorMessage.trim());
      return false;
    }

    return true;
  };

  const signUp = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          name: name,
          phone_number: phoneNumber,
        },
      });
      console.log(user);
      setConfirmation(true);
    } catch (err) {
      console.error('Error signing up:', err);
      Alert.alert('Error signing up', err.message);
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      navigation.navigate('SignIn');
    } catch (err) {
      console.error('Error confirming sign up:', err);
      Alert.alert('Error confirming sign up', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {!confirmation ? (
        <>
          <Text style={CommonStyles.title}>Sign Up for GymGuru</Text>
          {error ? <Text style={CommonStyles.title}>{error}</Text> : null}
          <CustomInput
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          />
          <CustomInput
          onChangeText={setName}
          value={name}
          placeholder="Name"
          textContentType="name"
          />
          <CustomInput
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone Number (+1234567890)"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          />
          <CustomInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password (StrongPassword123)"
          secureTextEntry={!showPassword}
          textContentType="password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
            <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={CommonStyles.title}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={CommonStyles.title}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={CommonStyles.title}>Confirm Sign Up</Text>
          {error ? <Text style={CommonStyles.title}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            onChangeText={setConfirmationCode}
            value={confirmationCode}
            placeholder="Confirmation Code"
            keyboardType="numeric"
            textContentType="oneTimeCode"
          />
          <TouchableOpacity style={styles.button} onPress={confirmSignUp}>
            <Text style={CommonStyles.title}>Confirm Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    width: '80%',
  },
  showPassword: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpPage;
