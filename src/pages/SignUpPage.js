// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';


const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


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

  setLoading(true);

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
  } finally {
    setLoading(false);
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

  if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0E7C7B" />
    </View>
  );
}


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#ffffff" />
      </TouchableOpacity>
      {!confirmation ? (
        <>
          <Text style={styles.title}>Sign Up for GymGuru</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
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
            <Text style={styles.textWhite}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.textWhite}>Already have an account? Sign In</Text>
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
    backgroundColor: '#1A1A1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  textWhite: {
    color: '#ffffff',
  },
  error: {
    color: '#E63946',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    width: '80%',
    backgroundColor: '#2C2A33',
    color: '#E6E6E6',
  },
  showPassword: {
    marginBottom: 10,
    color: '#E6E6E6',
  },
  button: {
    backgroundColor: '#0E7C7B',
    padding: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signInText: {
    marginTop: 10,
    color: '#E6E6E6',
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  loadingContainer: {
  flex: 1,
  backgroundColor: '#1A1A1D',
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default SignUpPage;
