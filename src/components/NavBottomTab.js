import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import About from '../screens/About';
import Top from './TopNav';
import MainHomePage from '../screens/HomeScreen/MainHomePage';
import SearchHotel from '../screens/HomeScreen/hotelmenu/SearchHotel';
import TopNav from './TopNav';
const Tab = createBottomTabNavigator();
export default NavBottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={MainHomePage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchHotel}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={TopNav}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MainHomePage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
