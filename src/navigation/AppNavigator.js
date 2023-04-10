import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import MainAppPage from '../pages/MainAppPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{ title: 'GymGuru' }} />
      <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="SignIn" component={SignInPage} options={{ title: 'Sign In' }} />
      <Stack.Screen name="MainApp" component={MainAppPage} options={{ title: 'Main App' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;