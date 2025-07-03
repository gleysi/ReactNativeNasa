import React, { Component } from 'react';
import { Text, View } from 'react-native';

// Define the props and state types
interface CounterProps {
  initialCount: number;
}

interface CounterState {
  count: number;
  prevInitialCount: number;
}

class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      // Initialize state with the initialCount prop
      count: props.initialCount,
      // Store the previous initialCount to detect changes
      prevInitialCount: props.initialCount,
    };
  }

  // This method is called when the component mounts
  // It sets the initial count from props
  static getDerivedStateFromProps(
    nextProps: CounterProps,
    prevState: CounterState
  ): Partial<CounterState> | null {
    if (nextProps.initialCount !== prevState.prevInitialCount) {
      return {
        count: nextProps.initialCount,
        prevInitialCount: nextProps.initialCount,
      };
    }
    return null;
  }

  // This method is used to determine if the component should update
  // It checks if the count in the state has changed
  // This is useful to prevent unnecessary re-renders
  // In this case, we only want to update if the count has changed
  shouldComponentUpdate(
    nextProps: CounterProps,
    nextState: CounterState
  ): boolean {
    return nextState.count !== this.state.count;
  }

  render() {
    return (
      <View>
        <Text>Count: {this.state.count}</Text>
      </View>
    );
  }
}

export default Counter;
