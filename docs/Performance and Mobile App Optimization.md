# Performance and Mobile App Optimization

- [Performance and Mobile App Optimization](#performance-and-mobile-app-optimization)
  - [Render Optimization](#render-optimization)
  - [Debugging and Error Handling](#debugging-and-error-handling)
    - [Opening the Dev Menu](#opening-the-dev-menu)
    - [Opening DevTools](#opening-devtools)
    - [LogBox](#logbox)
    - [Performance Monitor](#performance-monitor)

# Performance and Mobile App Optimization

| Main Topic | Actionable Sub-topics |
| :--- | :--- |
| **1. Render Optimization** 🚀 | **Advanced use of `memo`** and the crucial link with **`useCallback`/`useMemo`** to prevent unnecessary re-renders. (Current Focus) |
| **2. Debugging and Error Handling** 🐞 | Best practices for debugging, using the **React Native Debugger**, and handling errors (e.g., **error boundaries**). |
| **3. Asynchronous Data Handling** ☁️ | **Difference between Fetch/Axios** and managing **loading, error**, and using **Splash Screens**. |

## Render Optimization

### Situation Challenge: List Optimization

You have a parent component, `HomeScreen`, which contains a large `FlatList` displaying many `ProductItem` components. The `HomeScreen` also has an unrelated `clickCount` state that causes it to re-render frequently.

#### Your challenge:

  <b> 1. How do you apply `React.mem`o to the `ProductItem` component?</b>

  <b> 2. How would you define the `handlePress` function in the parent `HomeScreen` component to ensure that the `ProductItem` components <b>DO NOT re-render</b> when the unrelated `clickCount` state changes?</b>

<b>1. ProductItem.js: Using React.memo (Component Memoization)</b>

```tsx
// ProductItem.js

import React from 'react';
import { Text } from 'react-native';

const ProductItem = ({ product, onSelect }) => {
    // This console log helps prove the component is being rendered.
    console.log(`Rendering ProductItem for: ${product.name}`); 
    
    // The component just uses the props passed to it.
    return (
        <Text onPress={() => onSelect(product.id)}>
            {product.name}
        </Text>
    );
};

// 1. Solution: Export the component wrapped in React.memo
// This tells React: "Only re-render if the 'product' or 'onSelect' props change."
export default React.memo(ProductItem);
```

<b> 2. HomeScreen.js: Using useCallback (Function Memoization)</b>

```tsx
// HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
// import ProductItem from './ProductItem'; // Assumed import
// const PRODUCT_DATA = [...]; // Assumed data list

const HomeScreen = () => {
    const [clickCount, setClickCount] = useState(0); 
    
    // 2. Solution: Use useCallback to memoize the function passed to the child items.
    // The handleItemSelect function DOES NOT need to change when clickCount changes,
    // so its identity remains stable, preventing unnecessary ProductItem re-renders.
    const handleItemSelect = useCallback((itemId) => {
        console.log(`Item selected with ID: ${itemId}`);
        // This is a separate action from the clickCount
    }, []); // Empty dependency array: ensures a stable function identity

    // Unrelated counter update logic (your original intent)
    const handleCounterClick = () => {
        setClickCount(c => c + 1);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* This component re-renders the HomeScreen, but NOT the FlatList items */}
            <Text onPress={handleCounterClick} style={{ padding: 20 }}>
                Unrelated Clicks: {clickCount} (Triggers Parent Render)
            </Text>
            
            <FlatList
                data={PRODUCT_DATA} // Use your actual data list here
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    // Pass the memoized function to the memoized child
                    <ProductItem 
                        product={item} 
                        onSelect={handleItemSelect} 
                    />
                )}
            />
        </View>
    );
}
```

"I used `React.memo` on `ProductItem` to stop unnecessary re-renders. This works because React will only check if its props have changed via a shallow comparison. Since the `product` object and the function `onSelect` are the props, I must ensure they have a <b>stable identity</b>."

"To guarantee this stable identity for the `onSelect` function, I define it in the parent using `useCallback`. Because its dependency array is empty (`[]`), the function reference remains the same object across every re-render of `HomeScreen` (even when `clickCount` changes), satisfying `React.memo` and preventing the entire list from re-rendering."


## Debugging and Error Handling

### Opening the Dev Menu
React Native provides an in-app developer menu providing access to debugging features. You can access the Dev Menu by shaking your device or via keyboard shortcuts:

- iOS Simulator: `Ctrl` + `Cmd ⌘` + `Z` (or Device > Shake)
- Android emulators: `Cmd ⌘` + `M` (macOS) or `Ctrl` + `M` (Windows and Linux)

<img src="https://github.com/gleysi/ReactNativeNasa/blob/main/src/assets/debug_app.jpg?raw=true"/>

### Opening DevTools

<a href="https://reactnative.dev/docs/react-native-devtools">React Native DevTools</a> is our built-in debugger for React Native. It allows you to inspect and understand how your JavaScript code is running, similar to a web browser.

To open DevTools, either:

- Select "Open DevTools" in the Dev Menu.
- Press `j` from the CLI (`npx react-native start`).

On first launch, DevTools will open to a welcome panel, along with an open console drawer where you can view logs and interact with the JavaScript runtime. From the top of the window, you can navigate to other panels, including the integrated React Components Inspector and Profiler.

<img src="https://github.com/gleysi/ReactNativeNasa/blob/main/src/assets/debug_devtools.jpg?raw=true"/>

### LogBox
LogBox is an in-app tool that displays when warnings or errors are logged by your app.

<img src="https://github.com/gleysi/ReactNativeNasa/blob/main/src/assets/logbox.jpg?raw=true"/>

### Performance Monitor
On Android and iOS, an in-app performance overlay can be toggled during development by selecting "Perf Monitor" in the Dev Menu. Learn more about this feature <a href="https://reactnative.dev/docs/performance">here</a>.

<img src="https://github.com/gleysi/ReactNativeNasa/blob/main/src/assets/performance_monitor.jpg?raw=true"/>
