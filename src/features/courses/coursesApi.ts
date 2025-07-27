import apiSlice from "../../app/apiSlice";
import { Course, NewCourse } from "../../types/coursesTypes";

const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query<Course[], void>({
            query: () => "/courses",
            providesTags: ["Course"],
        }),
        getCourseByTitle: builder.query<Course, string>({
            query: (title) => `/courses/${title}`,
            providesTags: ["Course"],
        }),
        getCoursesBySubject: builder.query<Course[], string>({
            query: (subject) => `/courses/subject/${subject}`,
            providesTags: ["Course"],
        }),
        getCoursesByLecturer: builder.query<Course[], string>({
            query: (lecturer) => `/courses/lecturer/${lecturer}`,
            providesTags: ["Course"],
        }),
        generateCourseImage: builder.mutation<
            { publicUrl: string },
            { subject: string; description: string }
        >({
            query: (body) => ({
                url: "/courses/generate-image",
                method: "POST",
                body,
            }),
        }),

        createCourse: builder.mutation({
            query: (formData: FormData) => ({
                url: "/courses",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Course"],
        }),
        updateCourse: builder.mutation<Course, FormData>({
            query: (formData) => ({
                url: `/courses/${formData.get("id")}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Course"],
        }),
        deleteCourse: builder.mutation<void, string>({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Course"],
        }),
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetCourseByTitleQuery,
    useGetCoursesByLecturerQuery,
    useGetCoursesBySubjectQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGenerateCourseImageMutation,
} = courseApiSlice;

export default courseApiSlice;
