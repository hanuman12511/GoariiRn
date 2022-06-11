import React from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//context api

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

import HomeScreen from '../../screensg/HomeScreen';
import ProductScreen from '../../screensg/ProductScreen';
import LoginScreen from '../../screensg/LoginScreen';
import OTPScreen from '../../screensg/OTPScreen';
import SignUpScreen from '../../screensg/SignUpScreen';
import ProfileScreen from '../../screensg/ProfileScreen';
import CartScreen from '../../screensg/CartScreen';
import WalletScreen from '../../screensg/WalletScreen';

const Stack = createNativeStackNavigator();

function AuthStackScreen(userData, userIntro, completeProfileStatus) {
  if (userData === 'true') {
    return (
      <>
        {/*   <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="productscreen" component={ProductScreen} />
          <Stack.Screen name="profilescreen" component={ProfileScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="wellet" component={WalletScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
        </Stack.Navigator> */}
      </>
    );
  } else {
    return (
      <>
        {/*   <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="productscreen" component={ProductScreen} />
          <Stack.Screen name="profilescreen" component={ProfileScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="wellet" component={WalletScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
        </Stack.Navigator> */}
      </>
    );
  }
}

export default StackNav = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case RESTORE_TOKEN:
          //  console.log('restor');
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
  // console.log('userData info ==0==', state);

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
    }, 3000);

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
        // console.log('userinfo(routes.js)', userInfo);
      } catch (e) {
        console.log('error in useEffect ', e);
      }
      dispatch({type: RESTORE_TOKEN, userData: userInfo});
    };
  });

  var userData = state.userToken;
  console.log('***********userData*******', userData);

  return (
    <AppContext.Provider value={authContext}>
      {AuthStackScreen(userData, state.userIntro, state.completeProfileStatus)}
    </AppContext.Provider>
  );
};
