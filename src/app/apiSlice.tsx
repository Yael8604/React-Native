import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.100:3001/api/jobs", // שימי כאן את ה-IP של המחשב שמריץ את השרת
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
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
