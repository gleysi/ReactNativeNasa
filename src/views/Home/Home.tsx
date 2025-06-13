import { View } from 'react-native';
import Header from '../../components/Header';
import TodaysImage from '../../components/TodaysImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';
import useTodaysImage from '../../hooks/useTodaysImage';
import useLastFiveDaysImages from '../../hooks/useLastFiveDaysImages';
import styles from './styles';

const Home = () => {
  const todaysImage = useTodaysImage();
  const last5DaysImages = useLastFiveDaysImages();

  return (
    <View style={styles.container}>
      <Header />
      {todaysImage && (
        <TodaysImage
          date={todaysImage.date}
          title={todaysImage.title}
          url={todaysImage.url}
          explanation={todaysImage.explanation}
        />
      )}
      <LastFiveDaysImages postImages={last5DaysImages} />
    </View>
  );
};

export default Home;
