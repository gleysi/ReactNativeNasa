import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, ScrollView } from 'react-native';
import styles from './styles';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {

    Alert.alert('Successful Register', `Name: ${name}, Email: ${email}`);

  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.textInput}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );

}

function WebApp() {
  return (
    <View style={styles.formContainer}>
      <Text>¡Hi, React!</Text>
      <Button onPress={() => Alert.alert('Button clicked')} title="Click Here" />
    </View>
  );
}

function ListView() {
  const items = Array.from({ length: 30 }, (_, i) => `Element ${i + 1}`);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {items.map(item => (
        <Text key={item} style={styles.text}>{item}</Text>
      ))}
    </ScrollView>
  );
}

function BoxContainer() {
  return(
    <View style={styles.boxContainer}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

function Profile() {

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profilePic} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.description}>Software Developer at XYZ Company</Text>
    </View>
  );

}

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <RegistrationForm />
        <WebApp />
        <ListView />
        <BoxContainer />
        <Profile />
      </ScrollView>
    </View>
  );
}
