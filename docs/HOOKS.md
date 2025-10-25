- [Hooks](#hooks-1)
    - [useCallback](#useCallback)
      - [Scaffold useApi.ts using useCallback hook](#scaffold-useapits-using-usecallback-hook)
    - [useMemo](#usememo)
    - [useReducer](#useReducer)
    - [useState](#usestate)
    - [useRef](#useref)
      - [Imperative Access to UI Elements (Refs)](#imperative-access-to-ui-elements-refs-)
      - [Common React Native Components with `useRef`](#common-react-native-components-with-useref)
    - [useEffect](#useeffect)
      - [Functional Component Lifecycle: `useEffect` in Depth 🔄](#functional-component-lifecycle-useeffect-in-depth-)
        - [1. The Syntax and Purpose](#1-the-syntax-and-purpose)
        - [2. The Three Lifecycle Scenarios](#2-the-three-lifecycle-scenarios)
        - [3. Common Interview Pitfall: Dependencies ⚠️](#3-common-interview-pitfall-dependencies-)
      - [Interview Simulation: Cleanup Challenge](#interview-simulation-cleanup-challenge)
    - [useContext](#usecontext)
- [When to Use a Custom Hook](#when-to-use-a-custom-hook)

# Hooks

## useCallback

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

### Scaffold useApi.ts using useCallback hook

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

## useMemo

<b>useMemo(calculateValue, dependencies)</b>

This hook is used to <b>memoize a value</b>. React will only re-calculate the memoized value when one of the dependencies has changed. Think of it as caching the result of an expensive calculation.

```tsx
const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);
```

<b>Parameters</b>
`calculateValue`: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On next renders, React will return the same value again if the `dependencie`s have not changed since the last render. Otherwise, it will call `calculateValue`, return its result, and store it so it can be reused later.

`dependencies`: The list of all reactive values referenced inside of the `calculateValue` code. 
The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the Object.is comparison.

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

## useReducer

The useReducer hook is often compared to a lighter version of Redux, designed for managing more <b>complex state logic</b> within a single component or for <b>managing multiple related state values</b>.

### Comparison: `useState` vs. `useReducer` in React

| Feature | `useState` | `useReducer` |
| :--- | :--- | :--- |
| **Complexity** | **Simple** state: independent values like a boolean, string, or number. | **Complex** state: objects/arrays where updates involve complex logic or multiple sub-values. |
| **Updates** | **Direct** update: `setCount(count + 1)`. | **Action Dispatch**: `dispatch({ type: 'INCREMENT' })`. |
| **Logic Location** | Update logic is spread across the component's *event handlers*. | Update logic is **centralized** in a single **Reducer** function (outside the component). |
| **Dependency** | The next state often **doesn't depend** heavily on the previous state. | The next state **explicitly depends** on the previous state (it receives `state` and returns `newState`). |

### What is `dispatch`?

In the context of `useReducer` (and Redux), `dispatch` is the key function used to initiate a state update.

### Key Characteristics of `dispatch`:

* **It is a Function:** It's the mechanism you call from your component's *event handlers* (`onPress`, `onChangeText`, etc.).
    * **Syntax:** `dispatch(actionObject)`

* **It Sends an Action:** The argument you pass to `dispatch` is the **Action Object**. This object is a **plain JavaScript object** that describes what just happened in the application.
    * **Example:** `{ type: 'INCREMENT' }` or `{ type: 'USER_LOGOUT' }`

* **It Triggers the Reducer:** When `dispatch` is called, React takes the current state and the action object, and immediately passes both to the **reducer** function you defined.

### Code Example: The Shopping Cart
Imagine managing an item's quantity in a cart.

```tsx
import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// 1. Initial State
const initialState = { count: 0 };

// 2. Reducer Function (The 'Logic Handler')
// It takes the current state and an action, and returns the new state.
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error(); // Always handle unknown actions
  }
}

const ShoppingCart = () => {
  // 3. useReducer Hook
  // It returns the current state and the 'dispatch' function.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Quantity: {state.count}</Text>
      
      <Button 
        title="Add to Cart (+)" 
        // 4. Dispatching the Action
        onPress={() => dispatch({ type: 'increment' })} 
      />
      <Button 
        title="Remove (-)" 
        onPress={() => dispatch({ type: 'decrement' })} 
        disabled={state.count <= 0}
      />
      <Button 
        title="Reset" 
        onPress={() => dispatch({ type: 'reset' })} 
        color="red"
      />
    </View>
  );
};

// ... styles ...
```
Interview Focus: The key takeaway for an interviewer is that useReducer centralizes state management, making complex updates predictable, testable, and easier to scale.

## useState

🔧 What is useState?

The useState hook is a built-in React hook that lets you add state (data that changes over time) to a functional component.

Think of it like a variable that your component watches — and when it changes, the component re-renders to reflect the new value.

```tsx
const [state, setState] = useState(initialValue);
```
- state: The current value
- setState: The function to update the value
- initialValue: The starting value



## useRef
<b>Provides mutable storage and does not trigger re-renders</b>, making it ideal for interacting with native elements, storing timer IDs, or holding previous state values.

1. <b>Accessing Native Elements (Like the DOM):</b> In React Native, this is used to access the underlying view or a component like a TextInput to call imperative methods on it (e.g., .focus(), .measure(), or controlling a ScrollView).

2. <b>Storing a Mutable Value:</b> It allows you to keep a value that persists across component re-renders, but <b>does not trigger a re-render when it changes</b>.

It is used for values that need to **persist between renders** but should **not affect the user interface** (such as timer identifiers, or a direct reference to a user interface element like a TextInput).

<b>Code Example: Focusing an Input</b>

```tsx
import React, { useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const UseRefExample = () => {
  // 1. Initialize the ref object
  const inputRef = useRef(null); 

  const handleFocus = () => {
    // 2. Access the current value (the TextInput element)
    // and call its native focus() method.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Example of storing a mutable value (e.g., a timer ID)
  const intervalIdRef = useRef(null); 
  // You would use this ref inside a useEffect to store and clear a timer
  // intervalIdRef.current = setInterval(...)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Focus me with the button!"
        // 3. Attach the ref to the element
        ref={inputRef} 
      />
      <Button 
        title="Focus Input" 
        onPress={handleFocus} 
      />
      <Text style={styles.note}>
        *Changing the ref value does NOT cause a re-render.
      </Text>
    </View>
  );
};
// ... styles ...
```

### Imperative Access to UI Elements (Refs) 📲

This is the use case you're familiar with. You use a **ref** when you need to **imperatively (directly)** trigger a function or read a property from a component, which isn't handled through typical React props and state.


### Common React Native Components with `useRef`:

* **`ScrollView` / `FlatList`**: To programmatically scroll to a specific position using methods like `.scrollTo()` or `.scrollToIndex()`.
* **`Animated.View` or Other `Animated` Components**: To access and control complex animations or native handles.
* **Custom View Components**: If you create a custom component and need the parent to call a specific function inside it (you achieve this by using **`useImperativeHandle`** inside the child component, along with **`useRef`** in the parent).

## useEffect

### Functional Component Lifecycle: `useEffect` in Depth 🔄

`useEffect` allows you to tell React that your component needs to do something **after the render**—whether that's fetching data, setting up a subscription, or manually changing the UI.

### 1. The Syntax and Purpose

The `useEffect` hook takes two primary arguments:

1.  **Callback Function (The Effect):** The function containing the **side effect logic** (e.g., calling an API, starting a timer).
2.  **Dependency Array (The Condition):** An array of values that the effect depends on. This is the key to **managing the lifecycle**.

```tsx
useEffect(() => {
  // 💡 This runs AFTER every render (if dependencies change).
  
  // 1. Setup the Side Effect (e.g., fetch data, add listener)
  console.log('Component rendered or dependencies changed.');

  // 2. Return the Cleanup Function
  return () => {
    // 🧹 This runs BEFORE the next effect runs and when the component unmounts.
    console.log('Cleaning up old effect (e.g., removing listener, clearing timer).');
  };
}, [dep1, dep2]); // The Dependency Array
```

### 2. The Three Lifecycle Scenarios

The content of the **dependency array** dictates when the effect runs, mimicking the different lifecycle methods from class components:

| Class Component Equivalent | Dependency Array Content | Behavior |
| :--- | :--- | :--- |
| **`componentDidMount`** | `[]` (Empty array) | Runs **only once** after the initial render. The effect will never run again, and the component is effectively "mounted." |
| **`componentDidUpdate`** | `[state, props]` (Contains values) | Runs after the initial render and **every time any value in the array changes**. This is the most common use case. |
| **None (Runs on Every Render)** | No Array (Omitted) | Runs after **every single render cycle**. Generally avoided as it can lead to infinite loops and performance issues. |
| **`componentWillUnmount`** | Return Function | The function **returned by the callback** runs when the component is about to be removed (unmounted). This is known as the **cleanup phase**. |

### 3. Common Interview Pitfall: Dependencies ⚠️

A common error, and a great interview question, is explaining the issue of **stale closures**.

#### Stale Closure Issue

If you omit a dependency (a state or prop value used inside the `useEffect` callback) from the dependency array, the function inside the effect will **"capture" the value of that state/prop** from the render it was created in. The function will then keep using that old (**"stale"**) value, even if the state has updated in newer renders.

#### How to Solve Stale Closures:

* **Include it:** Always include **every state and prop** used inside the effect in the dependency array.
* **Function Form for Setters:** If you are updating state based on its previous value (like `setCount(count + 1)`), use the **function form** (`setCount(prevCount => prevCount + 1)`). This way, you **don't need to include** the state variable (like `count`) in the dependency array.
* **`useRef`:** If you need to access a mutable value inside the effect **without triggering a re-render** when that value changes, use `useRef` (as we practiced).

### Interview Simulation: Cleanup Challenge
You are building a chat application in React Native. When the ``ChatScreen`` mounts, you need to subscribe to a network listener (an expensive operation). When the screen navigates away, you must unsubscribe to prevent memory leaks.

<b>How would you implement this logic using ``useEffect``? What would the dependency array look like?</b> (Assume the subscription function is called NetInfo.addEventListener(callback) and returns an unsubscribe function).

<b>Solution: Network Listener Cleanup</b>
The correct implementation uses an <b>empty dependency array (``[]``).</b>

```tsx
useEffect(() => {
  // SETUP: Subscribe to the network listener
  // NetInfo.addEventListener returns an unsubscribe function (often called `unsubscribe`)
  const unsubscribe = NetInfo.addEventListener(callback);

  // CLEANUP: Return the unsubscribe function
  return () => {
    // This runs only when the component UNMOUNTS
    unsubscribe(); 
  };
}, []); // <--- THE EMPTY ARRAY IS KEY
```

When an interviewer asks why you chose the empty array, your response should highlight the lifecycle management:

1. <b>Runs Only Once (Mounting):</b> Using ``[]`` tells React, "This effect has no external dependencies, so please run it <b>only after the initial render.</b>" This mimics the ``componentDidMount`` phase, which is exactly what we need for establishing a global connection or listener.

2. <b>Prevents Memory Leaks (Unmounting):</b> The ``return`` function ensures that when the ``ChatScreen`` component is destroyed (the user navigates away), the ``unsubscribe`` function is called. This is crucial because it removes the listener, preventing the component from holding onto memory and reacting to events when it no longer exists.

If you used no array at all, the listener would be added on every single re-render, creating thousands of unnecessary listeners and causing an immediate memory leak.

## useContext

The `useContext` hook is the Consumer element of the Context API. Its entire job is to provide any component, regardless of how deep it is in the component tree, with direct access to the `value` established by the closest matching `Context.Provider` above it.

### Syntax

```tsx
const contextData = useContext(MyContextObject);
```

### Key Characteristics and Function

* **Direct Access, No Props:** You pass the entire **Context Object** (the one created with `createContext`) to `useContext`. The hook then immediately returns the object contained in the Provider's `value` prop.
    * **Example:** If your provider passes `{ user: 'John', theme: 'dark' }`, the `contextData` variable will hold that entire object.

* **Automatic Re-render:** This is the most critical feature: If the `value` prop in the Provider changes (even if only one property inside the value object changes), **every component using that Context via `useContext` will automatically re-render**. This is how state updates propagate globally.

* **Dependency-Free:** Unlike `useEffect` or `useCallback`, the `useContext` hook **does not take a dependency array**. Its reliance is implicit: it depends only on the value of the Context Provider it's connected to.

### Example 

If the Provider is the Central Library that holds all the data, the `useContext` hook is your Global Library Card.

- Any component that has the card (`useContext(AuthContext)`) can walk right up to the library and check out the data (the `value` object) directly.

- The data is instantly available, and you didn't have to ask every neighbor to pass the book down the street (prop drilling).

```tsx
// AuthContext.js (The Context Object)
export const AuthContext = createContext(null);
// ... AuthProvider component sets the value { user, login, logout }
```

A component uses it like this:

```tsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; 

const LogoutButton = () => {
    // We only need the logout function from the Context value
    const { user, logout } = useContext(AuthContext); 
    
    // When 'logout' is called, it updates the state in the Provider.
    // This state change causes the Provider's 'value' to change, 
    // which in turn causes this component (and any other consumer) to re-render.
    
    if (!user) return null;

    return (
        <Button 
            title="Log Out User" 
            onPress={logout} 
        />
    );
};
```

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
