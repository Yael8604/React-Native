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





