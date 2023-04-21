import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CommonStyles from '../styles/GlobalStyles';
const CustomInput = ({ onChangeText, value, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#FFFFFF"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 5,
    backgroundColor: '#1A1A1D',
    color: '#FFFFFF',
  },
});

export default CustomInput;
