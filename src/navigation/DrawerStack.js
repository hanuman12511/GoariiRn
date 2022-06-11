import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import CustDrawer from '../components/CustDrawer';


import HomeScreen from '../screensg/HomeScreen';
import Logout from './Logout';
import ConfidentialPolicy from '../screensg/ConfidentialPolicy';
import MyOrderScreen from '../screensg/MyOrderScreen';
import ContactScreen from '../screensg/ContactScreen';
import CartScreen from '../screensg/CartScreen';
import GeneralQuestion from '../screensg/GeneralQuestion';
import MyProfilsScreen from '../screensg/MyProfilsScreen';
import NotificationScreen from '../screensg/NotificationScreen';
import OfferScreen from '../screensg/OfferScreen';
import RefundRules from '../screensg/RefundRules';
import SendToFriendScreen from '../screensg/SendToFriendScreen';
import TermsCondition from '../screensg/TermsCondition';
import WalletScreen from '../screensg/WalletScreen';
const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustDrawer {...props} />}
      screenOptions={{drawerStyle: {width: '100%'}, headerShown: false}}>
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'मुख्य पृष्ठ',
          /* drawerIcon: ({focused, size}) => (
            <Image
              source={ic_home_black}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ), */
        }}
      />
      <Drawer.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          title: 'नोटिफिकेशन',
        }}
      />
      <Drawer.Screen
        name="offer"
        component={OfferScreen}
        options={{
          title: 'ऑफर्स',
        }}
      />
      <Drawer.Screen
        name="sendtofriend"
        component={SendToFriendScreen}
        options={{
          title: 'दोस्तों को भेजे',
        }}
      />
      <Drawer.Screen
        name="generalquestion"
        component={GeneralQuestion}
        options={{
          title: 'सामान्य उत्तर',
        }}
      />
      <Drawer.Screen
        name="contact"
        component={ContactScreen}
        options={{
          title: 'सम्पर्क करे',
        }}
      />
      <Drawer.Screen
        name="confidentialpolicy"
        component={ConfidentialPolicy}
        options={{
          title: 'गोपनीयता पालिसी',
        }}
      />
      <Drawer.Screen
        name="termsandconditions"
        component={TermsCondition}
        options={{
          title: 'नियम एवं शर्तें ',
        }}
      />
      <Drawer.Screen
        name="refundrules"
        component={RefundRules}
        options={{
          title: 'रद्दीकरण/धनवापसी नीति',
        }}
      />
    </Drawer.Navigator>
  );
};
