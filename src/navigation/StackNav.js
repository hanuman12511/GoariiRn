import React, {useEffect, useReducer, useMemo} from 'react';
import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerStack from './DrawerStack';

import Splash from '../screensg/SplashScreen';

import {
  TOKEN,
  SIGN_IN,
  SIGN_OUT,
  USER_DATA,
  ONLINE_STATUS,
  PROFILE_STATUS,
  RESTORE_TOKEN,
  USER_ROLE,
  COMPLETE_PROFILE,
  COMPLETE_PROFILE_STATUS,
  FIRST_TIME_USER,
} from 'context_api/constant';
import {AppContext} from 'context_api/context'; 

//* AsyncStorage
 import AsyncStorage from '@react-native-async-storage/async-storage'; 

// app screensg navigation
 import HomeScreen from '../screensg/HomeScreen';
import ProductScreen from '../screensg/ProductScreen';
import CartScreen from '../screensg/CartScreen';
import WalletScreen from '../screensg/WalletScreen';
import MyProfilsScreen from '../screensg/MyProfilsScreen';
import LoginScreen from '../screensg/LoginScreen';
import OTPScreen from '../screensg/OTPScreen';
import SignUpScreen from '../screensg/SignUpScreen';
import FAQQuestion from '../screensg/FAQQuestion';
import FAQAnsScreen from '../screensg/FAQAnsScreen';
import EditProfile from '../screensg/EditProfile';
import SplashScreen from '../screensg/SplashScreen';
import MyAddressScreen from '../screensg/MyAddressScreen';
import AddAddressScreen from '../screensg/AddAddressScreen';

import LoginDrawerStack from './LoginUserData'; 
import {NavigationContainer} from '@react-navigation/native'; 
 const Stack = createNativeStackNavigator(); 

function AuthStackScreen(userData, userIntro, completeProfileStatus) {
  if (userData === 'true') {
    return (
      <>
        <Stack.Navigator
          initialRouteName="logindrawerstack"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="logindrawerstack" component={LoginDrawerStack} />
          <Stack.Screen name="productscreen" component={ProductScreen} />
          <Stack.Screen name="wellet" component={WalletScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
          <Stack.Screen name="profilescreen" component={MyProfilsScreen} />
          <Stack.Screen name="editprofile" component={EditProfile} />
          <Stack.Screen name="myaddressscreen" component={MyAddressScreen} />
          <Stack.Screen name="addaddress" component={AddAddressScreen} />
        </Stack.Navigator>
      </>
    );
  } else {
    return (
      <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={DrawerStack} />
          <Stack.Screen name="productscreen" component={ProductScreen} />
          <Stack.Screen name="wellet" component={WalletScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="faqquestions" component={FAQQuestion} />
          <Stack.Screen name="faqansScreen" component={FAQAnsScreen} />
        </Stack.Navigator>
      </>
    );
  }
}

export default StackNav = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.userData.token,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
            isLoading: false,
          };

        case SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userIntro: action.userData.intro,
            userToken: action.userData.token,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
        case SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.intro,
            completeProfileStatus: false,
          };
        case COMPLETE_PROFILE:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
      }
    },

    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userIntro: null,
      completeProfileStatus: null,
    },
  );

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        let userInfo;

        try {
          userInfo = {
            token: await AsyncStorage.getItem(TOKEN),
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_IN, userData: userInfo});
      },

      signOut: async () => {
        let userInfo;
        try {
          userInfo = await AsyncStorage.getItem(FIRST_TIME_USER);
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_OUT, intro: userInfo});
      },

      completeProfile: async () => {
        let userInfo;
        try {
          userInfo = {
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: COMPLETE_PROFILE, userData: userInfo});
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      state.isLoading;
      bootstrapAsync();
    }, 1000);

    const bootstrapAsync = async () => {
      let userInfo;
      try {
        userInfo = {
          token: await AsyncStorage.getItem(TOKEN),
          intro: await AsyncStorage.getItem(FIRST_TIME_USER),
          completeProfileStatus: await AsyncStorage.getItem(
            COMPLETE_PROFILE_STATUS,
          ),
        };
      } catch (e) {
        console.log('error in useEffect ', e);
      }
      dispatch({type: RESTORE_TOKEN, userData: userInfo});
    };
  });

  var userData = state.userToken;

  if (state.isLoading) {
    return <Splash />;
  }
  return (
    <AppContext.Provider value={authContext}>
      <NavigationContainer>
        {AuthStackScreen(
          userData,
          state.userIntro,
          state.completeProfileStatus,
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};


