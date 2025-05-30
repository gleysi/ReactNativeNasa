import React, {FC} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PostImage as PostImageTypes} from '../../types';
import PostImage from '../PostImage';

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

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginVertical: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginBottom: 18,
  },
});
export default LastFiveDaysImages;
