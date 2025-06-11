
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Routes from './routes/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {

  return (
    <SafeAreaProvider style={styles.container}>
      <Routes />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(7, 26, 93, 255)',
  },
});

export default App;
