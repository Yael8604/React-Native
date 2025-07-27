import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'; // שינוי 1
import { User } from './authTypes';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

// שינוי 2: אתחול מצב אסינכרוני
const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      // שינוי 3: שמירה באמצעות AsyncStorage
      AsyncStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      // שינוי 4: הסרה באמצעות AsyncStorage
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem("currentUser");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;