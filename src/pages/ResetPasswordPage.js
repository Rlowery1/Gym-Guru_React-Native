// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CommonStyles from '../styles/GlobalStyles';

const ResetPasswordPage = ({ route, navigation }) => {
  const { email } = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const resetPassword = async () => {
    setError('');

    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
      console.log('Password reset successful!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Invalid confirmation code or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={CommonStyles.title}>Reset Password</Text>
      {error ? <Text style={CommonStyles.title}>>{error}</Text> : null}
      <CustomInput
        onChangeText={setConfirmationCode}
        value={confirmationCode}
        placeholder="Confirmation Code"
        keyboardType="numeric"
        textContentType="oneTimeCode"
      />
      <CustomInput
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New Password"
        secureTextEntry
        textContentType="password"
      />
      <CustomButton title="Reset Password" onPress={resetPassword} />
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
});

export default ResetPasswordPage;
