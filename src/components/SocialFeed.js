import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SocialFeed = () => {
  return (
  <TouchableOpacity onPress={() => navigation.navigate('SocialFeed')}>
    <View style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      {/* Add your content for social feed here */}
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#2A2A2D',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SocialFeed;
