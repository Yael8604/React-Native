import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './src/app/store';
import { logout, setCredentials } from './src/features/auth/authSlice';
import { RootState } from './src/app/store';

import CustomNavBar from './CustomNavBar'; // וודא שהנתיב נכון

// ייבוא רכיבי המסך שלך
// import HomePage from './src/features/home/HomePage';
 import CoursesPage from './src/features/courses/CoursesPage';
// import ForumPage from './src/features/forum/components/forumPage';
// import AboutPage from './src/features/about/AboutPage';
// import JobPage from './src/features/jobs/JobPage';
// import LoginPage from './src/features/auth/LoginPage';
// import SignUpPage from './src/features/auth/SignUpPage';
// import AdminPage from './src/features/admin/AdminPage'; // אם יש לך מסך אדמין
// import ForumDetailsPage from './src/features/forum/components/ForumDetailsPage';
// import VideoReveal from './src/features/courses/components/fileActions';
// import ProjectPage from './src/features/home/components/ProjectPage';
// import ProfilePage from './src/features/users/components/ProfilePage';
// import UsersList from './src/features/users/components/UsersList';
// import JobsAdminPage from './src/features/admin/jobsAdmin/JobsAdminPage';
// import AdminAnalyticsPage from './src/features/admin/components/AdminAnalyticsPage';
// import CoursesAdmin from './src/features/admin/components/AdminCourses/CoursesAdmin';
// import CarouselAdmin from './src/features/admin/components/CarouselAdmin';
// import ProjectsAdmin from './src/features/admin/ProjectsAdmin/ProjectsAdmin';
// import NotificationForm from './src/features/notifications/components/NotificationForm';


type RootStackParamList = {
  Home: undefined;
  Courses: undefined;
  ForumPage: undefined;
  About: undefined;
  Jobs: undefined;
  Login: undefined;
  SignUp: undefined;
  Admin: undefined;
  ForumDetails: { id: string }; // שימוש בפרמטר id
  CourseVideo: { title: string }; // שימוש בפרמטר title
  ProjectDetails: { id: string }; // שימוש בפרמטר id
  Profile: undefined;
  UsersAdmin: undefined;
  JobsAdmin: undefined;
  AnalyticsAdmin: undefined;
  CoursesAdmin: undefined;
  CarouselsAdmin: undefined;
  ProjectsAdmin: undefined;
  Notifications: undefined;

  // ... הוסף את שאר המסכים שלך כאן
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadInitialState = async () => {
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

  return (
    <View style={styles.container}>
      <CustomNavBar /> {/* כאן אנו מציגים את סרגל הניווט שלנו */}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*
          screenOptions={{ headerShown: false }}
          זה חשוב כדי למנוע מ-react-navigation להציג כותרת משלו,
          כי CustomNavBar כבר מטפל בזה.
        */}
        {/* <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="ForumPage" component={ForumPage} />
        <Stack.Screen name="ForumDetails" component={ForumDetailsPage} /> */}
        <Stack.Screen name="Courses" component={CoursesPage} />
        {/* <Stack.Screen name="CourseVideo" component={VideoReveal} />
        <Stack.Screen name="Jobs" component={JobPage} />
        <Stack.Screen name="ProjectDetails" component={ProjectPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} /> */}

        {/* {user?.role === 'manager' && (
          <>
            <Stack.Screen name="Admin" component={AdminPage} />
            <Stack.Screen name="JobsAdmin" component={JobsAdminPage} />
            <Stack.Screen name="AnalyticsAdmin" component={AdminAnalyticsPage} />
            <Stack.Screen name="CoursesAdmin" component={CoursesAdmin} />
            <Stack.Screen name="CarouselsAdmin" component={CarouselAdmin} />
            <Stack.Screen name="ProjectsAdmin" component={ProjectsAdmin} />
            <Stack.Screen name="UsersAdmin" component={UsersList} />
            <Stack.Screen name="Notifications" component={NotificationForm} />
          </>
        )} */}
      </Stack.Navigator>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppWrapper />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // חשוב כדי שה-View יתפוס את כל גובה המסך
  },
});