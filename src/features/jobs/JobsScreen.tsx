// client-mobile/src/screens/JobsScreen.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGetJobsQuery } from './jobsApi';


const JobsScreen = () => {
  const { data, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <Text>טוען...</Text>;
  if (error) return <Text>שגיאה בחיבור לשרת</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>רשימת משרות:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default JobsScreen;
