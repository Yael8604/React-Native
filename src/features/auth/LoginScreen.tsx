// // src/features/auth/LoginScreen.tsx
// import React from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useLoginMutation } from './authApi';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from './authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import GoogleLoginButton from './GoogleLoginButton';

// const loginSchema = z.object({
//   userName: z.string().min(3, 'שם משתמש קצר מדי'),
//   password: z.string().min(6, 'סיסמה חייבת להיות באורך של לפחות 6 תווים'),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginScreen = () => {
//   const {
//     handleSubmit,
//     register,
//     setValue,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       const response = await login(data).unwrap();
//       const { user, token } = response.data;

//       dispatch(setCredentials({ user, token }));
//       await AsyncStorage.setItem('token', token);

//       navigation.navigate('Home' as never);
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert('שגיאה', err?.data?.message || 'שגיאה בהתחברות');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>התחברות</Text>

//       <TextInput
//         placeholder="שם משתמש"
//         style={styles.input}
//         onChangeText={(text) => setValue('userName', text)}
//         autoCapitalize="none"
//       />
//       {errors.userName && <Text style={styles.error}>{errors.userName.message}</Text>}

//       <TextInput
//         placeholder="סיסמה"
//         secureTextEntry
//         style={styles.input}
//         onChangeText={(text) => setValue('password', text)}
//       />
//       {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

//       <Button title={isLoading ? 'טוען...' : 'התחברי'} onPress={handleSubmit(onSubmit)} />

//       <Text style={styles.or}>או התחברי עם:</Text>

//       <GoogleLoginButton />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//     fontSize: 12,
//   },
//   or: {
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });
