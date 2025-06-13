import React from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import styles from './styles';

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

export default Detail;

