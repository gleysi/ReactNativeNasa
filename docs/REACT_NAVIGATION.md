
- [React Navigation](#react-navigation)
  - [Navigating between screens](#navigating-between-screens)
  - [Nesting navigators](#nesting-navigators)
  - [React Navigation lifecycle events](#react-navigation-lifecycle-events)
  - [Navigation Prop Reference](#navigation-prop-reference)
    
# React Navigation

## Navigating between screens

When using React Navigation, you configure navigators in your app. Navigators handle the transition between screens in your app and provide UI such as header, tab bar etc.

In this example, RootStack is a navigator with 2 screens (Home and Profile), defined in the screens property in createNativeStackNavigator. Similarly, you can define as many screens as you like.

You can specify options such as the screen title for each screen in the options property of each screen.

```tsx
import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

Inside each screen component, you can use the useNavigation hook to get the navigation object, which has various methods to link to other screens. For example, you can use navigation.navigate to go to the Profile screen:
```tsx
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}

function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

## Nesting navigators

Nesting navigators means rendering a navigator inside a screen of another navigator, for example:

```tsx
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

In the above example, the Home component contains a tab navigator. The Home component is also used for the Home screen in your stack navigator inside the App component. So here, a tab navigator is nested inside a stack navigator:

- Stack.Navigator
- Home (Tab.Navigator)
    - Feed (Screen)
    - Messages (Screen)
- Profile (Screen)
- Settings (Screen)

## React Navigation lifecycle events

An important question in this context is: what happens with Home when we navigate away from it, or when we come back to it? How does a route find out that a user is leaving it or coming back to it?

React Navigation emits events to screen components that subscribe to them. We can listen to focus and blur events to know when a screen comes into focus or goes out of focus respectively.

- Example:
```tsx
function Profile({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
    });

    return unsubscribe;
  }, [navigation]);

  return <ProfileContent />;
}
```

See <a href="https://reactnavigation.org/docs/5.x/navigation-events">Navigation events</a> for more details on the available events and the API usage.

Instead of adding event listeners manually, we can use the `useFocusEffect` hook to perform side effects. It's like React's `useEffect` hook, but it ties into the navigation lifecycle.

- Example:
```tsx
import { useFocusEffect } from '@react-navigation/native';

function Profile() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return <ProfileContent />;
}
```

If you want to render different things based on if the screen is focused or not, you can use the `useIsFocused` hook which returns a boolean indicating whether the screen is focused.

## Navigation Prop Reference

Each screen component in your app is automatically provided with the **`navigation` prop**. The prop contains various convenience functions that dispatch navigation actions.

- navigation
    - navigate - go to the given screen, this will behave differently based on the navigator
    - goBack - go back to the previous screen, this will pop the current screen when used in a stack
    - reset - replace the navigation state of the navigator with the given state
    - setParams - merge new params onto the route's params
    - dispatch - send an action object to update the navigation state
    - setOptions - update the screen's options
    - isFocused - check whether the screen is focused
    - canGoBack - check whether it's possible to go back from the current screen
    - getState - get the navigation state of the navigator
    - getParent - get the navigation object of the parent screen, if any
    - addListener - subscribe to events for the screen
    - removeListener - unsubscribe from events for the screen

See <a href="https://reactnavigation.org/docs/5.x/navigation-prop">Navigation Prop</a> for more details
