// import { configureStore } from '@reduxjs/toolkit';
// import apiSlice from './apiSlice'; // הנתיב תלוי במיקום של הקובץ אצלך
// // import authReducer from '../features/auth/authSlice';
// // import { authApi } from '../features/auth/authApi';
// // import { adminJobsApi } from '../features/admin/jobsAdmin/adminJobsApi';
// // import jobsSlice from '../features/jobs/jobsSlice';
// // import coursesSlice from '../features/courses/coursesSlice';
// // import courseApiSlice from '../features/courses/coursesApi';
// // import projectsSlice from '../features/admin/ProjectsAdmin/projectsSlice';

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     // auth: authReducer,
//     // [authApi.reducerPath]: authApi.reducer,
//     // [adminJobsApi.reducerPath]: adminJobsApi.reducer,
//     // [jobsSlice.name]: jobsSlice.reducer,
//     // [coursesSlice.name]: coursesSlice.reducer,
//     // projects: projectsSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       apiSlice.middleware,
//     //   authApi.middleware,
//     //   adminJobsApi.middleware
//     ),
// });

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// client-mobile/src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
