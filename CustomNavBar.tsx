import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './src/app/store';
import { logout } from './src/features/auth/authSlice';

// וודא שכל הנתיבים האפשריים מוגדרים כאן
type RootStackParamList = {
  Home: undefined;
  About: undefined;
  ForumPage: undefined;
  Courses: undefined;
  Jobs: undefined;
  Admin: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined; // הוסף את מסך הפרופיל
  // ... הוסף כל מסך אחר שמקושר בסרגל הניווט
};

const CustomNavBar = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Home');
  };

  return (
    // נשתמש ב-ImageBackground כדי לדמות את תמונת הרקע של הניווט
    // וודא שנתיב התמונה נכון!
    <ImageBackground source={require('./assets/images/nav.png')} style={styles.mainNav} resizeMode="cover">
      <View style={styles.navTopRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
          {/* וודא שנתיב הלוגו נכון */}
          <Image source={require('./assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        {/* במקום ProfileMenu, ניצור רכיב חלופי פשוט שידמה את ה-Avatar */}
        {isLoggedIn && (
           <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>פ</Text>
           </TouchableOpacity>
        )}
      </View>

      <View style={styles.navBottomRow}>
        {isLoggedIn ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.link}>דף הבית</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
              <Text style={styles.link}>אודות</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForumPage')}>
              <Text style={styles.link}>פורומים</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.link}>קורסים</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
              <Text style={styles.link}>משרות</Text>
            </TouchableOpacity>
            {user?.role === 'manager' && (
              <>
                <Text style={styles.separator}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                  <Text style={styles.link}>ניהול</Text>
                </TouchableOpacity>
              </>
            )}
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.link}>התנתק</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>התחברות</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.link}>דף הבית</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
              <Text style={styles.link}>אודות</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainNav: {
    width: '100%',
    // ההיידוי של התמונה כרקע, מכסים את השטח המוגדר
    height: 'auto', // או גובה קבוע אם ידוע
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // פדינג לסטטוס בר, ייתכן שיהיה צורך ב-SafeAreaView
    paddingBottom: 10,
    zIndex: 1000,
    // הוספת צבע רקע כ-fallback אם התמונה לא נטענת או כדי לדמות שקיפות
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
  },
  navTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 44, // כפי שהוגדר ב-CSS למסכים קטנים
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'transparent', // רקע שקוף לשורה העליונה
  },
  logoContainer: {
    position: 'absolute',
    left: 20,
    top: 3,
    zIndex: 1000,
  },
  logo: {
    height: 50,
    width: 150, // ייתכן שיהיה צורך להתאים
    resizeMode: 'contain',
  },
  profileAvatar: {
    backgroundColor: '#3c155c', // צבע מהגרדיאנט
    borderRadius: 50,
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // כדי למקם כמו בווב
    right: 20,
    top: 3,
    // צל ב-React Native מוגדר אחרת
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 5, // צל לאנדרואיד
    borderWidth: 0.1,
    borderColor: '#fff',
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // ללא font-family ב-RN אלא אם כן נטענים פונטים מותאמים אישית
  },
  navBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap', // לאפשר גלישת שורות במסכים קטנים
    width: '100%',
    paddingHorizontal: 10,
    borderTopWidth: StyleSheet.hairlineWidth, // גבול דק
    borderTopColor: 'rgba(255, 255, 255, 0.12)', // צבע #fff2
    backgroundColor: 'transparent', // רקע שקוף לשורה התחתונה
  },
  link: {
    color: '#fff',
    fontWeight: '500', // RN תומך ב-500, לא 450
    fontSize: 20, // 1.25rem = 20px בהנחה ש-1rem = 16px
    paddingVertical: 5,
    paddingHorizontal: 8,
    textDecorationLine: 'none', // אין קו תחתון כברירת מחדל
  },
  separator: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 2,
  },
});

export default CustomNavBar;