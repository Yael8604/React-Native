// App.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './src/app/store';
import { logout, setCredentials } from './src/features/auth/authSlice';
import { RootState } from './src/app/store';

// import HomePage from './src/features/home/HomePage';
import CoursesPage from './src/features/courses/CoursesPage';
// import ForumDetailsPage from './src/features/forum/components/ForumDetailsPage';
// import ForumPage from './src/features/forum/components/forumPage';
// import JobPage from './src/features/jobs/JobPage';
// import ProjectsAdmin from './src/features/admin/ProjectsAdmin/ProjectsAdmin';
// import ProjectsCreateForm from './src/features/admin/ProjectsAdmin/ProjectsCreateForm';
// import AdminPage from './src/features/admin/AdminPage';
// import JobsAdminPage from './src/features/admin/jobsAdmin/JobsAdminPage';
// import VideoReveal from './src/features/courses/components/fileActions';
// import CoursesAdmin from './src/features/admin/components/AdminCourses/CoursesAdmin';
// import CarouselAdmin from './src/features/admin/components/CarouselAdmin';
// import ProjectPage from './src/features/home/components/ProjectPage';
// import AboutPage from './src/features/about/AboutPage';
// import JobWebsite from './src/features/jobs/components/JobWebsite';
// import ForumSocket from './src/features/forum/forumSocket';
// import ForumMessageSocket from './src/features/forumMessage/forumMessageSocket';
// import UsersList from './src/features/users/components/UsersList';
// import NotificationForm from './src/features/notifications/components/NotificationForm';
// import ProfilePage from './src/features/users/components/ProfilePage';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id || 'guest_user';

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

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* אפשר להוסיף כאן Header עם לוגו וכפתור התנתקות */}
      <ScrollView style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Image source={require('./assets/logo.png')} style={{ height: 50, width: 120 }} />
          {isLoggedIn && (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ color: 'blue' }}>התנתק</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* <ForumSocket /> */}
      {/* <ForumMessageSocket /> */}

      <Stack.Navigator initialRouteName="Home">
        { //<Stack.Screen name="Home" component={HomePage} />
        // <Stack.Screen name="About" component={AboutPage} />
        // <Stack.Screen name="ForumPage" component={ForumPage} />
        // <Stack.Screen name="ForumDetails" component={ForumDetailsPage} />
        <Stack.Screen name="Courses" component={CoursesPage} />
        // <Stack.Screen name="CourseVideo" component={VideoReveal} />
        // <Stack.Screen name="Jobs" component={JobPage} />
        // <Stack.Screen name="ProjectDetails" component={ProjectPage} />
        // <Stack.Screen name="Profile" component={ProfilePage} />
        // {user?.role === 'manager' && (
        //   <>
        //     <Stack.Screen name="Admin" component={AdminPage} />
        //     <Stack.Screen name="JobsAdmin" component={JobsAdminPage} />
        //     <Stack.Screen name="AnalyticsAdmin" component={JobsAdminPage} />
        //     <Stack.Screen name="CoursesAdmin" component={CoursesAdmin} />
        //     <Stack.Screen name="CarouselsAdmin" component={CarouselAdmin} />
        //     <Stack.Screen name="ProjectsAdmin" component={ProjectsAdmin} />
        //     <Stack.Screen name="UsersAdmin" component={UsersList} />
        //     <Stack.Screen name="Notifications" component={NotificationForm} />
        //   </>
        // )} 
        }
      </Stack.Navigator>
    </>
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
