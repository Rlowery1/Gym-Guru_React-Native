// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>Reset Password</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomInput
        onChangeText={setConfirmationCode}
        value={confirmationCode}
        placeholder="Confirmation Code"
        keyboardType="numeric"
        textContentType="oneTimeCode"
        placeholderTextColor="#FFFFFF"
      />
      <CustomInput
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New Password"
        secureTextEntry
        textContentType="password"
        placeholderTextColor="#FFFFFF"
      />
      <CustomButton title="Reset Password" onPress={resetPassword} />
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  error: {
    color: '#E63946',
    marginBottom: 10,
  },
});

export default ResetPasswordPage;
