// client-mobile/src/features/jobs/jobsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.100:3001/api/jobs', // שימי כאן את ה-IP של השרת שלך
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<any, void>({
      query: () => '/jobs',
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
