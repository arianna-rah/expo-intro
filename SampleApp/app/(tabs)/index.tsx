import 'react-native-reanimated';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default function Layout() {
  const [textInput, setTextInput] = useState("");
  const [hello, setHello] = useState("Hello World!");

  const handlePress = () => {
    setHello(`Hello ${textInput}`);
    setTextInput('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>
        {hello}
      </Text>
      <View style={styles.rowContainer}>
        <TextInput 
        style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '100%', padding: 5, borderRadius: 10 }}
        onChangeText={(val) => setTextInput(val)} 
        value={textInput}
        placeholder="What's your name?"
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  helloText: {
    fontSize: 30,
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'blue',
    margin: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});