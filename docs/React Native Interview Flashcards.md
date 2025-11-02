## ⚛️ React Native Interview Flashcards

### 1. Memoization Trinity: Component Optimization

**Question:** What is the purpose of `React.memo` and why is `useCallback` essential for a memoized child component?

**Answer:**

* **`React.memo` Purpose:** It's a HOC used to prevent a functional component from **re-rendering** if its **props** (via *shallow comparison*) have not changed.
* **`useCallback` Necessity:** It is essential because functions are objects, and they are recreated on every parent render. If a component uses a function as a prop, that function must have a **Stable Identity** (same memory reference) using `useCallback`; otherwise, `React.memo` will fail and re-render the child every time.

---

### 2. Context API Optimization

**Question:** Why is the `useMemo` hook crucial when defining the `value` prop for a `Context.Provider`?

**Answer:**

* The **Context API** triggers a **re-render in all consuming components** whenever the `value` object changes its reference.
* **`useMemo`** is crucial because it **memoizes the value object itself**. This ensures the object is only recreated when the underlying data inside it truly changes (as defined by `useMemo`'s dependency array), preventing massive, unnecessary re-renders across the component tree.

---

### 3. Redux Optimization: The Selector Flow (FOCUS REVIEW)

**Question:** What are the distinct roles of `useSelector` and `createSelector` in a Redux application's performance strategy?

**Answer:**

| Feature | Role (What it is) | Function (What it optimizes) |
| :--- | :--- | :--- |
| **`useSelector`** (The Hook) | The **Reader Hook** used **inside** a component. | Subscribes the component to the Store and performs a **shallow comparison** on the extracted value to decide if the component should re-render. |
| **`createSelector`** (Reselect) | The **Optimization Function** used **outside** components. | **Memoizes expensive calculations** or complex data derivations. It only re-runs the computation if the input state (its dependencies) changes, preventing redundant work. |

---

### 4. State Management Logic

**Question:** When should you choose the `useReducer` hook over the simpler `useState` hook?

**Answer:**

You should choose `useReducer` when:
1.  Dealing with **complex state logic** where state transitions depend heavily on the **previous state**.
2.  Managing state with **multiple, highly related sub-values**.
3.  You want to **centralize the state update logic** (the **Reducer** function) outside the component, which makes the logic more predictable and easily testable.

---

### 5. Imperative Component Access

**Question:** What are the two primary uses of the `useRef` hook, and why doesn't it cause a component to re-render?

**Answer:**

1.  **Imperative Access (Refs):** Accessing native UI elements to call methods directly (e.g., calling `.focus()` on a `TextInput` or `.scrollTo()` on a `ScrollView`).
2.  **Mutable Storage:** Storing any value (e.g., a Timer ID, previous prop value) that needs to **persist across re-renders** but **MUST NOT trigger one** when updated.

It doesn't cause a re-render because it returns a **plain mutable JavaScript object** (`{ current: value }`); **React does not track changes** to its `.current` property.

---

### 6. Asynchronous Error Handling

**Question:** In an API call using `try`/`catch`/`finally`, what is the guaranteed role of the `finally` block in relation to a loading indicator?

**Answer:**

The `finally` block is guaranteed to execute **after** the `try` block finishes **OR** after the `catch` block handles an error.

Its guaranteed role is for **Cleanup**: it ensures that the **loading state** (`setIsLoading(false)`) is **always reset**, preventing the application from getting stuck with a perpetual loading spinner in case of success, network failure, or server failure.

---

### 7. Core Vocabulary

| Term | Definition |
| :--- | :--- |
| **Prop Drilling** | The **anti-pattern** of passing data (props) down through **multiple nested components** that do not need the data themselves, solely to reach a deep component that does. Solved by the Context API or Redux. |
| **Stable Identity** | A concept referring to a non-primitive value (function, object, array) maintaining the **exact same reference in memory** across component re-renders. Essential for performance tools like `React.memo` to work correctly. |
