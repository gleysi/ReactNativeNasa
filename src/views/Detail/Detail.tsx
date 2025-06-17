import React, { useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParams, 'Detail'>;

const Detail: React.FC<Props> = ({ route }) => {
  const { title, url, date, explanation } = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <Image source={{ uri: url }} style={styles.image} onLoadEnd={() => setLoading(false)}/>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.explanation}>{explanation}</Text>
    </ScrollView>
  );
};

export default Detail;

