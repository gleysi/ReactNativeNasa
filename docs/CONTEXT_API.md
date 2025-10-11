
- [Context API: The Global State Solution](#context-api-the-global-state-solution)
  - [1. The Problem: Prop Drilling](#1-the-problem-prop-drilling)
  - [2. The Context API Solution](#2-the-context-api-solution)
  - [3. Implementation Example: Managing User Authentication](#3-implementation-example-managing-user-authentication)
    - [Step 1: Create the Context and the Provider](#step-1-create-the-context-and-the-provider)
    - [Step 2: Wrap the Application](#step-2-wrap-the-application)
    - [Step 3: Consume the Context (Deep Component)](#step-3-consume-the-context-deep-component)
  - [The Most Important Weakness of the Context API for an Interview](#the-most-important-weakness-of-the-context-api-for-an-interview)
    - [How to Mitigate this in an Interview:](#how-to-mitigate-this-in-an-interview)


# Context API: The Global State Solution

The Context API is a built-in React feature designed to share data (state or functions) that can be considered "global" for a tree of components, without having to pass props down manually through every level (prop drilling).

## 1. The Problem: Prop Drilling

Imagine a deep component structure: `App` → `Screen` → `Container` → `Button`. If the `App` component holds the user's theme (light/dark) and the `Button` needs it, you must pass the `theme` prop through `Screen` and `Container`, even though they don't use it. This is **prop drilling**.

## 2. The Context API Solution

The Context API bypasses prop drilling by providing a "**tunnel**" through the component tree. It involves three key steps/elements:

| Element | Description | Interview Terminology |
| :--- | :--- | :--- |
| **`createContext`** | Creates the **Context Object** (the "tunnel"). It holds the data and the methods to update it. | Context Object |
| **Provider** | A component that wraps the part of the component tree that needs access to the data. It defines the current value of the context. | Context Provider |
| **`useContext`** | A hook used by a component deep in the tree (the **Consumer**) to directly access the data defined by the Provider. | Context Consumer |

## 3. Implementation Example: Managing User Authentication

We will create a simple `AuthContext` to share the `user` object and the `login/logout` functions globally.

### Step 1: Create the Context and the Provider

We often combine the Context object creation and the Provider component into one file for convenience and structure.

```tsx
import React, { createContext, useState, useMemo } from 'react';

// 1. Create the Context object
// The default value (null) is used when a component consumes context 
// without being wrapped by a Provider.
export const AuthContext = createContext(null); 

// 2. The Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Memoize the value to prevent unnecessary re-renders of consuming components
  // when the AuthProvider re-renders for other reasons. (Crucial for performance!)
  const contextValue = useMemo(() => {
    
    const login = (username) => {
      // Simulate API call and set user data
      setUser({ id: 1, name: username, token: 'fake-jwt' });
    };
  
    const logout = () => {
      setUser(null);
    };

    return { user, login, logout };
  }, [user]); // Re-create 'contextValue' only when 'user' changes

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Step 2: Wrap the Application
The `AuthProvider` must wrap the components that need access to the data (usually the whole app).

```tsx
// In App.js or your Root Component
import { AuthProvider } from './AuthContext';
import Navigation from './Navigation';

const AppRoot = () => (
  <AuthProvider>
    {/* All components inside Navigation can now access the AuthContext value */}
    <Navigation /> 
  </AuthProvider>
);
```

### Step 3: Consume the Context (Deep Component)
Any component within the `AuthProvider's` children can now easily access the data using the `useContext` hook.

```tsx
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext'; // Import the context object

const Header = () => {
  // 3. Consume the Context
  const { user, logout } = useContext(AuthContext); 

  return (
    <View style={styles.header}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.name}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text style={styles.text}>Please Log In</Text>
      )}
    </View>
  );
};
```

## The Most Important Weakness of the Context API for an Interview

The Context API is great for infrequently updating data (like the current user, theme, or language). However, if the value passed to the **Provider changes, every single component that consumes that context will re-render**, even if they only used a small part of the updated value.


### How to Mitigate this in an Interview:

| Solution | Mechanism |
| :--- | :--- |
| **Solution 1 (The `useMemo` trick)** | Use `useMemo` on the `value` prop passed to the Provider to ensure the object is only recreated (triggering re-renders) when the dependencies (e.g., `user` state, `login` function) truly change. |
| **Solution 2 (Multiple Contexts)** | **Split your state** into smaller, focused contexts (e.g., `AuthContext` and `ThemeContext`) so that an update to one doesn't trigger a re-render in the consumers of the other. |
| **Solution 3 (Custom Hook Selector - Advanced)** | Create a custom hook that only returns the **specific piece of data** a component needs, and use `useCallback`/`useMemo` internally to further optimize rendering. This is similar to how the `useSelector` hook works in Redux. |
