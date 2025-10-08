

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
