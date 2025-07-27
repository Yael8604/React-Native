import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // שינוי 1

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.100:3001/api",
    prepareHeaders: async (headers) => { // שינוי 2: הוספת async
      const token = await AsyncStorage.getItem("token"); // שינוי 3
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Job",
    "Resume",
    "Course",
    "Forum",
    "User",
    "AdminJob",
    "ForumMessage",
    "InfoCarousel",
    "ProjectCarousel",
    "LogoCarousel",
    "CourseVideo",
    "Comments",
    "forumView",
    "ScreenTime",
    "TipesCarousel",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;