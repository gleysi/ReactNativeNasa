import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

// Props interface
interface DataFetcherProps {
  url?: string; // optional, defaults to NASA URL
}

// State interface
interface DataFetcherState {
  data: any;
}

class DataFetcher extends Component<DataFetcherProps, DataFetcherState> {
  intervalId: NodeJS.Timeout | undefined;

  constructor(props: DataFetcherProps) {
    super(props);
    this.state = { data: null };
  }

  // this component fetches data from a given URL and updates the state every 5 seconds
  componentDidMount() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 5000);
  }

  // this component updates the data when the URL prop changes
  componentDidUpdate(prevProps: DataFetcherProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  // this component clears the interval when it is unmounted
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchData = () => {
    const url = this.props.url || 'https://api.nasa.gov/planetary/apod?api_key=qxKpG7LHNnLu74o7nhraSLmlPcHXW3JTOKANCHVY';

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.error('Fetch error:', error));
  };

  render() {
    const { data } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {data ? (
          <Text style={styles.text}>{JSON.stringify(data, null, 2)}</Text>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default DataFetcher;
