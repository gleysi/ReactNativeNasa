import React from 'react';
import { View } from 'react-native';
import Counter from './Counter';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Counter initialCount={10} />
    </View>
  );
};

export default App;
