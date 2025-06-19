import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TextInput,
  Switch,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PostImage as PostImageTypes, RootStackParams } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type for navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Search'>;

const SearchByDate = () => {
  const [images, setImages] = useState<PostImageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('image'); // or 'video'
  const [searchTerm, setSearchTerm] = useState('');

  // State for date pickers
  // These states will hold the selected start and end dates for filtering images
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleViewPress = (item: PostImageTypes) => {
    navigation.navigate('Detail', { title: item.title, date: item.date, url: item.url, explanation: item.explanation });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?start_date=${formatDate(
          startDate
        )}&end_date=${formatDate(endDate)}&api_key=qxKpG7LHNnLu74o7nhraSLmlPcHXW3JTOKANCHVY`
      );
      const data = await res.json();
      setImages(Array.isArray(data) ? data : [data]);
      setLoading(false);
    };

    fetchData();
  }, [endDate, startDate]);

  // The useMemo hook is used to memoize expensive calculations so they don't run on every render unnecessarily.
  const filteredImages = useMemo(() => {
    return images
      .filter(img => img.media_type === selectedType)
      .filter(img =>
        img.title && img.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [images, selectedType, searchTerm]);

  return (
    <View style={styles.container}>

      {/* Date pickers for selecting start and end dates */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) {setStartDate(date);}
            }}
          />
        )}

        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) {setEndDate(date);}
            }}
          />
        )}
      </View>


      {/* Search input for filtering images by title */}
      <TextInput
        style={styles.input}
        placeholder="Search title..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Switch to toggle between image and video types */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {selectedType === 'image' ? 'Image' : 'Video'}
        </Text>
        <Switch
          value={selectedType === 'video'}
          onValueChange={() =>
            setSelectedType(prev => (prev === 'image' ? 'video' : 'image'))
          }
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#007AFF' }}
        />
      </View>

      {loading ? (
        // Show a loading indicator while fetching data
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader}/>
      ) : (
        // FlatList to display the filtered images
        <FlatList
          data={filteredImages}
          renderItem={({ item }) => (
            <Text key={item.title} onPress={() => handleViewPress(item)} style={styles.itemText}>
              {`${item.date}: ${item.title}`}
            </Text>
          )}
        />
      )}
    </View>
  );
};
export default SearchByDate;

