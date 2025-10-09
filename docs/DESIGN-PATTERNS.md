- [Design Patterns](#design-patterns)
  - [1. The HOC (Higher Order Component) pattern](#1-the-hoc-higher-order-component-pattern)
  - [2. Compound Components](#2-compound-components)
  - [3. Render Props](#3-render-props)
  - [4. Hooks Pattern](#4-hooks-pattern)

# Design Patterns

## 1. The HOC (Higher Order Component) pattern

Within our application, we often want to use the same logic in multiple components. This logic can include applying a certain styling to components, requiring authorization, or adding a global state.

One way of being able to reuse the same logic in multiple components, is by using the higher order component pattern. This pattern allows us to reuse component logic throughout our application.

<b>A Higher Order Component (HOC) is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.</b>

### Example 1
Say that we always wanted to add a certain styling to multiple components in our application. Instead of creating a style object locally each time, we can simply create a HOC that adds the style objects to the component that we pass to it

```tsx
import React from 'react';

// HOC
function decoratedComponent(WrappedComponent) {
  return props => {
    const style = { padding: '5px', margin: '2px' };
    return <WrappedComponent style={style} {...props} />; 
    }; 
}
 
const Button = ({ style }) => <button style={{ ...style, color: 'yellow' }}>This is a button.</button>;
const Text = ({ style }) => <p style={style}>This is text.</p>;
    
const DecoratedButton = decoratedComponent(Button);
const DecoratedText = decoratedComponent(Text);
    
function App() {
    return (
      <>
        <DecoratedButton />
        <DecoratedText />
     </>
    );
}       

export default App;
```
In the previous code example, we’ve modified the Button and Text components to produce DecoratedButton and DecoratedText, respectively. Now both components inherit the style added by the decoratedComponent HOC. Since the Button component already has a prop named style, the HOC will override it and append the new prop.

### Example 2
```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// ----------------------------------------------------------------------
// 1. THE HOC (Higher-Order Component) - Logic Injection
// ----------------------------------------------------------------------
// Note: This HOC is now a functional component wrapper, which is common practice.
const withUserData = (WrappedComponent) => {
  // The inner component returned by the HOC
  const UserDataWrapper = (props) => {
    // Shared logic or state (the data we want to inject)
    const injectedName = "John Doe";

    // The HOC renders the original component, injecting the 'name' prop
    return (
      <WrappedComponent
        name={injectedName} // <-- INJECTED PROP
        {...props} // Pass through all original props (e.g., description)
      />
    );
  };

  // Optional: Set a display name for easier debugging in dev tools
  UserDataWrapper.displayName = `withUserData(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return UserDataWrapper;
};

// ----------------------------------------------------------------------
// 2. THE BASE COMPONENT - UI Presentation
// ----------------------------------------------------------------------
const AvatarComponent = (props) => {
  return (
    <View style={styles.container}>
      {/* The name prop comes from the HOC */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{props.name}</Text>
      </View>

      {/* The description prop comes from the parent App component */}
      <View style={styles.details}>
        <Text style={styles.descriptionText}>I am a {props.description}.</Text>
      </View>
    </View>
  );
};
// Optional: Good practice for naming
AvatarComponent.displayName = "AvatarComponent";

// ----------------------------------------------------------------------
// 3. USAGE - Creating the Enhanced Component
// ----------------------------------------------------------------------
const EnhancedAvatar = withUserData(AvatarComponent);

// ----------------------------------------------------------------------
// 4. THE APP - Renders the Enhanced Component
// ----------------------------------------------------------------------
const ReactNativeApp = () => {
  return (
    <View style={styles.appContainer}>
      <EnhancedAvatar description="Frontend Engineer" />
    </View>
  );
};

export default ReactNativeApp;

```

<b>Pros</b>
- Helps maintain reusable functionality in a single place.
- Keeps the code clean and implements separation of concerns by consolidating all logic into a single piece.
- Reduces the possibility of unexpected bugs across the app by avoiding code duplication.
<b>Cons</b>
- Sometimes leads to props name conflicts, making debugging and scaling an app more challenging, especially when composing a component with many HOCs that share identical prop names.

## 2. Compound Components

The Compound Components Pattern is a React design pattern for managing parent components that are made up of child components.

The principle behind this pattern is to break down the parent component into smaller components and then manage the interactions between these smaller components with either props, context or other react data management techniques.

This pattern comes in handy when there is a need to create reusable, versatile components made up of smaller components. It enables developers to create sophisticated UI components that can be readily customized and extended while maintaining a clear and simple code structure.

### Example 1
```tsx
import React, { createContext, useState } from "react";

const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = function ToggleButton(props) {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle} {...props} />;
};

function App() {
  return (
    <Toggle>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button>Toggle</Toggle.Button>
    </Toggle>
  );
}
```
## 3. Render Props
The Render Props pattern involves a component that includes a prop (usually called render, or sometimes children if it's a function) whose value is a function that tells the component what to render.

The Render Props pattern is a technique in React that allows the sharing of code between components through a special prop that indicates a function. This pattern delegates the responsibility of rendering a certain part of the component to the function provided as a prop, thus allowing for greater reuse and flexibility in component composition.

### How it Works
- The parent component (the one holding the shared logic) renders nothing itself.
- It executes the function provided through the render prop.
- It passes its internal state/logic as arguments to that function, allowing the consuming component to decide how to use the data.

```tsx
// Render Props Component (The Logic Provider)
const DataLoader = ({ render }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Logic to fetch data...
  }, []);

  // Executes the 'render' prop, passing its internal state as arguments
  return render({ data, error, isLoading: data.length === 0 });
};

// Usage: The component consuming the data
const PostComponent = () => (
  <DataLoader 
    // The prop 'render' is a function that receives the provider's state
    render={({ data, error, isLoading }) => {
      if (isLoading) return <Text>Loading posts...</Text>;
      if (error) return <Text>Error: {error}</Text>;
      
      return <FlatList data={data} renderItem={({ item }) => <Text>{item.title}</Text>} />;
    }} 
  />
);
```
### When to use

- When you need to share rendering logic between multiple components.
- To create highly customizable components that can adapt to different use cases.
- When you want to separate presentation logic from business logic in components.

### When not to use

- In cases where rendering logic is specific to a single component and will not be reused.
- When the Render Props pattern results in unnecessary complexity and makes the code harder to understand.

## 4. Hooks pattern

The React Hooks API, introduced in React 16.8, has fundamentally transformed how we approach React component design. 

Hooks were developed to address common concerns encountered by React developers. 

They revolutionized the way we write React components by allowing functional components to access features like state, lifecycle methods, context, and refs, which were previously exclusive to class components.

A JavaScript function whose name starts with use (e.g., useAuth, useLocation). It uses built-in hooks (useState, useEffect, etc.) to encapsulate stateful logic and return data/functions.

<a href="HOOKS.md#2-the-three-lifecycle-scenarios">HOOKS.md</a>
