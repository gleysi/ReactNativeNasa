import React, {FC} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PostImage as PostImageTypes} from '../../types';
import PostImage from '../PostImage';
import styles from './styles';

const LastFiveDaysImages: FC<{postImages ?: PostImageTypes[]}> = ({postImages}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}> Last 5 Days</Text>
        <ScrollView style={styles.content}>
          {
            // .map is used to iterate over the array of postImages
            // and render a PostImage component for each item
            // The key prop is used to give each PostImage a unique identifier
          postImages?.map(postImage => (
            <PostImage key={`post-image-${postImage.title}`} {...postImage}/>
          ))}
        </ScrollView>
    </View>
  );
};

export default LastFiveDaysImages;
