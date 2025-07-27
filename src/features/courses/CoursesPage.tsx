import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useGetAllCoursesQuery } from './coursesApi';
import { Course } from '../../types/coursesTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAddScreenAnalyticsMutation } from '../admin/analyticsApi';

const CoursesPage = () => {
const { data: allCourses, isLoading, isError, error } = useGetAllCoursesQuery();
  useEffect(() => {
  console.log('allCourses:', allCourses);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('error:', error);
}, [allCourses, isLoading, isError, error]);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [status, setStatus] = useState<'ALL' | 'SEARCH'>('ALL');

  const [addAnalyticsMutation] = useAddScreenAnalyticsMutation();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const enterTimeRef = useRef(Date.now());

  useEffect(() => {
    enterTimeRef.current = Date.now();
    return () => {
      const duration = Date.now() - enterTimeRef.current;
      if (userId && duration > 1000) {
        addAnalyticsMutation({
          user_id: userId,
          path: 'CoursesPage',
          duration,
        });
      }
    };
  }, [addAnalyticsMutation, userId]);

  const handleSearch = () => {
    const words = query.toLowerCase().split(' ');
    const filtered = allCourses?.filter(course =>
      words.some(word =>
        course.title.toLowerCase().includes(word) ||
        course.description?.toLowerCase().includes(word) ||
        course.subject.toLowerCase().includes(word)
      )
    );
    setResults(filtered ?? []);
    setStatus('SEARCH');
  };

  const coursesToShow = status === 'ALL' ? allCourses : results;

  if (isLoading) return <ActivityIndicator animating={true} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        ספריית קורסים והדרכות
      </Text>

      <TextInput
        label="חיפוש קורס"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.search}
        mode="outlined"
      />
      <Button onPress={handleSearch} mode="contained" style={styles.button}>
        חיפוש
      </Button>

      {(!coursesToShow || coursesToShow.length === 0) ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>לא נמצאו קורסים</Text>
      ) : (
        coursesToShow.map(course => (
          <View key={course.id} style={styles.card}>
            <Text variant="titleMedium">{course.title}</Text>
            <Text>{course.subject} / {course.lecturer}</Text>
            <Text>{course.description}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    direction: 'rtl',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  search: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
  },
});

export default CoursesPage;
