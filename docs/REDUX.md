# Redux

<b> A JS library for predictable and maintainable global state management</b>

<a href="https://redux.js.org/tutorials/quick-start#usage-summary" target="blank">Redux Quick Start</a>

## React Redux

### It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

The process of subscribing to the store, checking for updated data, and triggering a re-render can be made more generic and reusable. A UI binding library like React Redux handles the store interaction logic, so you don't have to write that code yourself.

### It Implements Performance Optimizations For You

React is generally fast, but by default any updates to a component will cause React to re-render all of the components inside that part of the component tree. This does require work, and if the data for a given component hasn't changed, then re-rendering is likely some wasted effort because the requested UI output would be the same.

If performance is a concern, the best way to improve performance is to skip unnecessary re-renders, so that components only re-render when their data has actually changed. 

<b>React Redux implements many performance optimizations internally, so that your own component only re-renders when it actually needs to.</b>

In addition, by connecting multiple components in your React component tree, you can ensure that each connected component <b>only extracts the specific pieces of data from the store state that are needed by that component.</b> This means that your own component will need to <b>re-render less often</b>, because most of the time those specific pieces of data haven't changed.

## Redux Toolkit

The official, opinionated, batteries-included toolset for efficient Redux development

The Redux DevTools make it easy to trace <b>when, where, why, and how your application's state changed.</b>

Redux's architecture lets you log changes, use <b>"time-travel debugging",</b> and even send complete error reports to a server.


