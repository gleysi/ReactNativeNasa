import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { PostImage as PostImageTypes, RootStackParams } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';

// Type for navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Home'>;

const PostImage: FC<PostImageTypes> = ({ title, url, date, explanation }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewPress = () => {
    if (title && date && url && explanation) {
      navigation.navigate('Detail', { title, date, url, explanation });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <Button title="View" onPress={handleViewPress}/>
      </View>
    </View>
  );
};

export default PostImage;
