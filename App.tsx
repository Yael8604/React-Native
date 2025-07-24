// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import store from './src/app/store';
import JobsScreen from './src/features/jobs/JobsScreen';

export default function App() {
  return (
    <Provider store={store}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ברוכה הבאה לאפליקציה!</Text>
      </View> */}
      <JobsScreen/>
    </Provider>
  );
}
