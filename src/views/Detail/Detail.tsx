import React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';

type Props = NativeStackScreenProps<RootStackParams, 'Detail'>;

const Detail: React.FC<Props> = ({ route }) => {
  const { title, url, date, explanation } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.explanation}>{explanation}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#071a5d' },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 8 },
  date: { color: '#aaa', marginBottom: 12 },
  explanation: { fontSize: 16, color: 'white' },
});

export default Detail;

