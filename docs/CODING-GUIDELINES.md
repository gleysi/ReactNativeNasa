- [Coding Guidelines](#coding-guidelines)
  - [React Native Project Folder And File Structure](#react-native-project-folder-and-file-structure)
    - [Basic Folder Structure :](#basic-folder-structure-)
    - [Folder With File Structure :](#folder-with-file-structure-)
    - [api/](#api)
    - [assets/](#assets)
    - [components/](#components)
    - [constants/](#constants)
    - [hooks/](#hooks)
    - [navigation/](#navigation)
    - [redux/](#redux)
    - [screens/](#screens)
    - [styles/](#styles)
    - [utility/](#utility)
  - [What is a "Render" in React?](#what-is-a-render-in-react)
  - [When to Use a Custom Hook](#when-to-use-a-custom-hook)
  - [Hooks](#hooks-1)
    - [When to use useCallback](#when-to-use-usecallback)
      - [Scaffold useApi.ts using useCallback hook](#scaffold-useapits-using-usecallback-hook)
    - [useMemo](#usememo)
    - [useState](#usestate)
    - [useEffect](#useeffect)

# Coding Guidelines

## React Native Project Folder And File Structure

### Basic Folder Structure :

```
├── src
│   ├── api
│   ├── assets
│   │  ├── fonts
│   │  ├── images
│   ├── components
│   │  ├── common
│   │  ├── presentation
│   ├── constants
│   ├── hooks
│   ├── navigation
│   ├── redux
│   │  ├── actions
│   │  ├── constants
│   │  ├── reducers
│   ├── screens
│   │  ├── homeScreen
│   │  ├── aboutScreen
│   ├── styles
│   ├── utility
```

### Folder With File Structure :

```
├── src
│   ├── api
│   │  ├── ApiCalls.js
│   │  ├── EndUrls.js
│   │  ├── index.js
│   ├── assets
│   │  ├── fonts
│   │  │  ├── font-name1.ttf
│   │  │  ├── font-name2.ttf
│   │  ├── images
│   │  │  ├── icon1.png
│   │  │  ├── icon2.png
│   ├── components
│   │  ├── common
│   │  │  ├── customButtonRN
│   │  │  │  ├── index.js
│   │  │  │  ├── styles.js
│   │  │  ├── customTextRN
│   │  │  │  ├── index.js
│   │  │  │  ├── styles.js
│   │  ├── presentation
│   │  │  ├── buttonRN
│   │  │  │  ├── index.js
│   │  │  │  ├── styles.js
│   │  │  ├── textRN
│   │  │  │  ├── index.js
│   │  │  │  ├── styles.js
│   ├── constants
│   │  │  ├── Enums.js
│   │  │  ├── Fonts.js
│   │  │  ├── Images.js
│   │  │  ├── ScreenNames.js
│   │  │  ├── StorageKeys.js
│   │  │  ├── Strings.js
│   │  │  ├── Colors.js
│   ├── hooks
│   │  │  ├── index.js
│   ├── navigation
│   │  │  ├── AppNavigator.js
│   │  │  ├── AuthNavigator.js
│   │  │  ├── TabNavigator.js
│   ├── redux
│   │  ├── actions
│   │  │  ├── Action1.js
│   │  │  ├── Action2.js
│   │  ├── constants
│   │  │  ├── Constants1.js
│   │  │  ├── Constants1.js
│   │  ├── reducers
│   │  │  ├── Reducer1.js
│   │  │  ├── Reducer2.js
│   │  ├── store.js
│   ├── screens
│   │  ├── homeScreen
│   │  │  ├── index.js
│   │  │  ├── styles.js
│   │  ├── aboutScreen
│   │  │  ├── index.js
│   │  │  ├── styles.js
│   ├── styles
│   │  ├── GlobalStyle.js
│   ├── utility
│   │  ├── index.js
```

### api/

This folder contains logic related to external API communications.

### assets/

This folder will store all the assets that we are using in react-native. You can add static files like fonts and images to it. Also, you can add more assets like videos in this folder according to your project requirements.

- **fonts/**
- **images/**

### components/

In this folder, we create all the React components that will be part of our app and any custom component that we create during the app’s development. We can group components by features or places they will be used and components that will be used throughout our app, like buttons or texts.

- **common/**
- **presentation/**

### constants/

This folder contains all the string related file.

### hooks/

If you have custom hooks defined in your project you can put it over here that can be shared across your entire project.

### navigation/

Your project base navigation goes here. You can create a stack navigator in it and export it to your application.

### redux/

This folder holds all the redux files if you are using react-redux for managing state. Inside redux folder you have actions, reducers, store which can easily manage your redux files.

- **actions/**
- **constants/**
- **reducers/**

### screens/

If you have multiple screens like auth screens: login, register and profile screens, product screens it can be saved here.

### styles/

If you have global styles defined in your project you can put it over here like colors, font styles like things.

### utility/

All the utils/helpers files go here that storing reusable methods and logic like validations, progress bar, date pickers, and according to your app requirements.

## What is a "Render" in React?

A render happens when a React component runs its function body again to update the UI.

🔁 A render happens when:
- State changes (e.g., setSearch('bob'))
- Props change (e.g., parent sends new data)
- Context changes
- Parent component re-renders

✅ When a parent component re-renders and passes new props to a child:
➡️ The child component will also re-render — meaning:

- The child’s function body runs again
- All hook calls (useState, useEffect, useMemo, etc.) re-run (though React keeps internal state consistent)
- All expressions and calculations inside the child function are recalculated — unless memoized (e.g. with useMemo, useCallback, or React.memo)

🧠 How to optimize this?
- Use useMemo to cache expensive values
- Use useCallback to memoize functions
- Use React.memo(MyChild) to prevent re-renders unless props actually change

🚨 But keep in mind:
React re-renders are generally very fast. Don’t optimize too early — only use useMemo, useCallback, etc., when:

- The component is slow or laggy
- You are working with large lists, complex calculations, or unstable function references passed to child components

## When to Use a Custom Hook

If you fetch similar data in multiple components (e.g., articles, users, etc.), or if your logic is complex (loading, error handling, retries), custom hooks are highly recommended.

```tsx
// hooks/useArticles.ts
import { useEffect, useState } from 'react';

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('https://api.example.com/articles');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};

export default useArticles;
```

Use it in your component 
```tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import useArticles from '../../hooks/useArticles';

const Home = () => {
  const { articles, loading, error } = useArticles();

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {articles.map(article => (
        <Text key={article.id}>{article.title}</Text>
      ))}
    </View>
  );
};
```

## Hooks

### When to use useCallback

The useCallback hook <b>memoizes (store the result or identity of a function) a function</b> definition — 
it ensures that the function doesn’t get re-created on every render unless its dependencies change.

Use useCallback when:

- You want to avoid re-creating a function passed to a child (e.g., onPress handlers)
- You want to call the fetch manually (e.g., on button click)

```tsx
const getArticles = useCallback(async () => {
  const res = await fetch('...');
  const data = await res.json();
  setArticles(data);
}, []);
```

- Code Example (Caching a Function)
In this scenario, we pass a function to a child component that has been optimized with React.memo

```tsx
import React, { useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Child Component optimized with React.memo
// It will only re-render if its props change (shallow comparison)
const ButtonComponent = memo(({ onPress, label }) => {
  console.log(`--- Rendering ${label} Button ---`);
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light'); // A state that causes re-renders

  // WITHOUT useCallback: 'handleIncrement' would be a NEW function object on every render,
  // forcing ButtonComponent to re-render, even if 'count' wasn't a dependency.

  // 1. We use useCallback to memoize the function 'handleIncrement'.
  // 2. This function object ONLY changes if 'count' changes.
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependencies array: The function never changes its identity

  // This function changes every time 'theme' changes
  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UseCallback Example</Text>
      <Text style={styles.countText}>Count: {count}</Text>
      <Text style={styles.themeText}>Current Theme: {theme}</Text>

      {/* ButtonComponent receives the memoized function */}
      <ButtonComponent onPress={handleIncrement} label="Increment Count" />

      {/* This button triggers a re-render of the parent component */}
      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={styles.buttonText}>Toggle Theme (Parent Re-render)</Text>
      </TouchableOpacity>
    </View>
  );
};
// ... styles ...
```

- Key Takeaway:
When you <b>tap the "Toggle Theme" button</b> (changing the theme state), the <b>UseCallbackExample component re-renders</b>. However, the console.log inside <b>ButtonComponent will not fire</b> because the onPress prop (the handleIncrement function) is the same exact function object reference, thanks to useCallback.

#### Scaffold useApi.ts using useCallback hook

Scaffold a useApi generic hook that handles loading, error, and data states to reduce duplication across custom hooks.

- ✅ Loading state
- ✅ Error state
- ✅ Data state
- ✅ Optional params (e.g., urlParams)
- ✅ Re-fetch function

- hooks/useApi.ts
A reusable hook that you can use for any GET endpoint:

```tsx
import { useEffect, useState, useCallback } from 'react';
import fetchApi from '../utils/fetch';

const useApi = <T>(urlParams: string = '', autoFetch: boolean = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  // useCallback memoizes (store the result or identity of a function) a function definition — 
  // it ensures that the function doesn’t get re-created on every render unless its dependencies change.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApi(urlParams);
      setData(response);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [urlParams]);

  // useEffect is used to call fetchData when the component mounts or when urlParams changes
  // If autoFetch is true, it will automatically fetch data on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);
  // Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return { data, loading, error, refetch: fetchData };
  // You expose fetchData outside the hook as refetch to let your component call it when needed
};

export default useApi;
```

- Use It in a Specific Hook
For example, in useLastFiveDaysImages.ts:

```tsx
import { PostImage } from '../types';
import { format, sub } from 'date-fns';
import useApi from './useApi';

const useLastFiveDaysImages = () => {
  const date = new Date();
  const today = format(date, 'yyyy-MM-dd');
  const fiveDaysAgo = format(sub(date, { days: 5 }), 'yyyy-MM-dd');
  const queryParams = `&start_date=${fiveDaysAgo}&end_date=${today}`;

  const { data, loading, error, refetch } = useApi<PostImage[]>(queryParams);
  return {
    images: data || [],
    loading,
    error,
    refetch,
  };

};

export default useLastFiveDaysImages;
```



### useMemo

This hook is used to <b>memoize a value</b>. React will only re-calculate the memoized value when one of the dependencies has changed. Think of it as caching the result of an expensive calculation.

```tsx
const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);
```

- 🔍 What useMemo Does Here
  It only recomputes the filteredUsers array when the search or users array changes.
Prevents unnecessary filtering on every keystroke if inputs haven’t changed.

- 🧠 Without useMemo?
You could just put the filtering inline, but it would run on every render. With large datasets, this could hurt performance.

- Example Analogy:
Imagine you have a complex recipe (a function) that takes 10 minutes to prepare (calculate a value). If you use useMemo, you only have to prepare it once. If the ingredients (dependencies) haven't changed, you just pull the dish from the fridge (the cached value) instead of making it again.

- Code Example (Caching a Value)
In this example, we have a complex operation (filtering a large list) that should only run if the list itself or the filter criteria change.

```tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const data = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: i % 3 === 0 ? 'A' : 'B',
})); // Imagine a list of 5000 items

// The expensive calculation function
const filterExpensiveList = (list, filter) => {
  console.log('--- Running expensive filter calculation ---');
  return list.filter(item => item.category === filter);
};

const UseMemoExample = () => {
  const [filter, setFilter] = useState('A');
  const [count, setCount] = useState(0); // State that triggers re-renders

  // 1. We use useMemo to cache the result (the filtered list).
  // 2. This function ONLY runs when 'data' or 'filter' changes.
  const filteredList = useMemo(() => {
    return filterExpensiveList(data, filter);
  }, [data, filter]); // Dependencies array

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UseMemo Example</Text>

      {/* Input to change the filter (changes 'filteredList') */}
      <TextInput
        style={styles.input}
        placeholder="Enter A or B to filter"
        onChangeText={setFilter}
        value={filter}
      />

      {/* Button to change 'count' (triggers re-render but NOT 'filteredList' update) */}
      <Text style={styles.countText} onPress={() => setCount(c => c + 1)}>
        Count: {count} (Tap to re-render)
      </Text>

      <Text style={styles.resultsText}>
        Filtered Items: {filteredList.length}
      </Text>

      {/* A FlatList to display the filtered results */}
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.itemText}>{item.name}</Text>}
      />
    </View>
  );
};
// ... styles ...
```

- Key Takeaway:
If you tap the "Count" button, the component re-renders, but the console.log inside filterExpensiveList will not fire because the dependencies (data and filter) haven't changed.

### useState

🔧 What is useState?

The useState hook is a built-in React hook that lets you add state (data that changes over time) to a functional component.

Think of it like a variable that your component watches — and when it changes, the component re-renders to reflect the new value.

```tsx
const [state, setState] = useState(initialValue);
```
- state: The current value
- setState: The function to update the value
- initialValue: The starting value

### useEffect

🔄 What is useEffect?

useEffect is a React hook that lets you run side effects in a functional component.

In React, a side effect is anything that affects something outside the component or needs to happen after rendering.

Examples of side effects:

- Fetching data from an API
- Subscribing to a service (e.g., WebSocket)
- Setting up event listeners
- Updating the document title
- Animations or timers

```tsx
useEffect(() => {
  // Code to run after component renders
}, [dependencies]);
```
- The function runs after the component renders
- The dependencies array tells React when to re-run the effect

🔁 When Does It Run?

| Dependency Array | Effect Runs When? |
|----------|----------|
| [] (empty)    | Only once — when the component mounts   |
| [someValue]    | When someValue changes   |
| No array | On every render
