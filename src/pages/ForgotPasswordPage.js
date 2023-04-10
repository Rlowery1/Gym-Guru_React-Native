// src/pages/ForgotPasswordPage.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CommonStyles from '../styles/GlobalStyles';

const ForgotPasswordPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [disableResetButton, setDisableResetButton] = useState(false);
  const [resetButtonTimeout, setResetButtonTimeout] = useState(null);

  useEffect(() => {
    return () => {
      if (resetButtonTimeout) {
        clearTimeout(resetButtonTimeout);
      }
    };
  }, [resetButtonTimeout]);

  const requestPasswordReset = async () => {
    setError('');

    try {
      await Auth.forgotPassword(email);
      console.log('Password reset request successful!');

      setDisableResetButton(true);
      setResetButtonTimeout(setTimeout(() => {
        setDisableResetButton(false);
      }, 60000)); // 60 seconds

      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setError('Invalid email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={CommonStyles.title}>Forgot Password</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <CustomButton title="Request Password Reset" onPress={requestPasswordReset} disabled={disableResetButton} />
      <Text style={CommonStyles.title}>{disableResetButton ? 'Please wait 60 seconds before requesting another password reset' : ''}</Text>
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
  timerText: {
    color: '#0d2c4f',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ForgotPasswordPage;
