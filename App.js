import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import AppNavigator from './src/navigation/AppNavigator';
import config from './src/aws-exports';
Amplify.configure(awsconfig);
Amplify.configure(config);
function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);
export default App;
