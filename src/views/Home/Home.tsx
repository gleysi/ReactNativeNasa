import { View, Text, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import TodaysImage from '../../components/TodaysImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';
import useCustomImageFilter from '../../hooks/useCustomImageFilter';
import { format, sub } from 'date-fns';
import styles from './styles';

const Home = () => {
  // Using custom hooks to fetch today's image and last five days' images
  const {
    images: todaysImage,
    loading: loadingToday,
    error: errorToday,
  } = useCustomImageFilter();

  const date = new Date();
  const today = format(date, 'yyyy-MM-dd');
  const fiveDaysAgo = format(sub(date, { days: 5 }), 'yyyy-MM-dd');
  const {
    images: last5DaysImages,
    loading: loadingLast5Days,
    error: errorLast5Days,
  } = useCustomImageFilter({
    start_date: fiveDaysAgo,
    end_date: today,
  });

  return (
    <View style={styles.container}>
      <Header />

      {loadingToday && <ActivityIndicator size="small" color="#0000ff" />}
      {errorToday && <Text style={styles.errorText}>{errorToday}</Text>}
      {!loadingToday && todaysImage && (
        <TodaysImage
          date={todaysImage.date}
          title={todaysImage.title}
          url={todaysImage.url}
          explanation={todaysImage.explanation}
        />
      )}

      {loadingLast5Days && <ActivityIndicator size="small" color="#0000ff" />}
      {errorLast5Days && <Text style={styles.errorText}>{errorLast5Days}</Text>}
      {!loadingLast5Days && (
        <LastFiveDaysImages postImages={last5DaysImages}/>
      )}
    </View>
  );
};

export default Home;
