// App.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/app/store';
import { logout, setCredentials } from './src/features/auth/authSlice';

// אפשר להגדיר טיפוס לרכיב, אבל ברוב המקרים React.FC מספיק
const AppWrapper: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInitialState = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem('token');
        const currentUserString = await AsyncStorage.getItem('currentUser');

        if (token && currentUserString) {
          const currentUser = JSON.parse(currentUserString);
          dispatch(setCredentials({ user: currentUser, token }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.warn('Failed to load initial state:', err);
        dispatch(logout());
      }
    };

    loadInitialState();
  }, [dispatch]);

  return null;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
      <View>
        <Text>vcgduwelkcv</Text>
      </View>
    </Provider>
  );
};

export default App;



// //מבינה פלוס
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import HomeScreen from './screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import PostScreen from './screens/PostScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <ReduxProvider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <PaperProvider>
//           <NavigationContainer>
//             <Stack.Navigator initialRouteName="Login">
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Register" component={RegisterScreen} />
//               <Stack.Screen name="Home" component={HomeScreen} />
//               <Stack.Screen name="Profile" component={ProfileScreen} />
//               <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//               <Stack.Screen name="Post" component={PostScreen} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </PaperProvider>
//       </PersistGate>
//     </ReduxProvider>
//   );
// };

// export default App;
